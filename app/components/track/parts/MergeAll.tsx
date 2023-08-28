import { useObservableCallback } from "observable-hooks";
import type { ForwardedRef, RefObject } from "react";
import {
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { Observable } from "rxjs";
import {
  defer,
  delayWhen,
  filter,
  finalize,
  map,
  mergeAll,
  mergeMap,
  pipe,
  tap,
  throwError,
} from "rxjs";
import { BuildTail } from "~/components/Build";
import { Factory } from "~/components/elements/Factory";
import { initialize } from "~/observables/initialize";
import { when } from "~/observables/when";
import { useStore } from "~/store";
import type { Ball, Boxed, OperatorBuilder, Status, Value } from "~/types";
import { assertBoxedObservable, unbox } from "~/utils";
import { Tunnel } from "../../elements/Tunnel";
import type { Part, TrackPart } from "../parts";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of incoming balls and balls being produced.

  Values that are emitted within the same frame are delayed
  to make them appear one after the other. Though, we do preserve the order
  in which producers emit.
*/

type Props = {
  track: TrackPart<Part.MergeAll>;
};

export const MergeAll = forwardRef(function MergeAll(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const { displayText, concurrent = Infinity } = track.props ?? {};
  const removeBall = useStore((state) => state.removeBall);
  const updateBall = useStore((state) => state.updateBall);
  const [onEnter, enter$] = useObservableCallback<Ball>();
  const [onBeforeEnter, beforeEnter$] = useObservableCallback<Ball>();
  const [isClosed, setIsClosed] = useState(true);

  type Item = {
    id: number;
    boxedObservable: Boxed<Observable<Boxed<Value>>>;
    status: Status;
  };

  // Keep track of the active producers which are currently emitting balls.
  // Reuse slots when running in concurrent mode.
  const [items, setItems] = useState<(Item | null)[]>([]);

  // Add a new producer or reuse an existing one.
  const register = useCallback((item: Item) => {
    setItems((items) => {
      // check if we can reuse an existing slot
      const index = items.findIndex((item) => item === null);
      if (index >= 0) {
        const newItems = [...items];
        newItems[index] = item;
        return newItems;
      } else {
        return [...items, item];
      }
    });
  }, []);

  // Change status of a producer to active
  const update = useCallback(
    (id: number, transform: (item: Item) => Item | null) => {
      setItems((items) =>
        items.map((item) => (item?.id === id ? transform(item) : item))
      );
    },
    []
  );

  // Remove a producer
  const unregister = useCallback(
    (id: number) => {
      update(id, () => null);
    },
    [update]
  );

  /* Builder */

  const tail = useRef<OperatorBuilder>(null!);
  const factories = useRef<RefObject<OperatorBuilder>[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      operator() {
        return pipe(
          assertBoxedObservable(),
          map(unbox),
          mergeAll(),
          tail.current.operator()
        );
      },
      build() {
        return pipe(
          assertBoxedObservable(),
          delayWhen(({ ballId }) =>
            beforeEnter$.pipe(filter(({ id }) => id === ballId))
          ),
          tap(({ ballId }) =>
            updateBall(ballId!, (ball) => ({ ...ball, ghost: true }))
          ),
          mergeMap((boxedObservable, itemId) => {
            const { ballId, value: source$ } = boxedObservable;

            return defer(() => {
              // Create a new reference pointing to the new producer chain on next render
              factories.current[itemId] = createRef<OperatorBuilder>();
              register({ id: itemId, boxedObservable, status: "waiting" });
              updateBall(ballId!, (ball) => ({ ...ball, ghost: false }));
              setIsClosed(false);

              return when(
                enter$.pipe(filter((ball) => ball.id === ballId!)),
                ({ id }) => {
                  removeBall(id);
                  setIsClosed(true);

                  // Reference will now point to the new producer chain,
                  // because at least one render has happened.
                  const factory = factories.current[itemId];
                  const factoryOperator = factory.current?.build();

                  if (!factoryOperator) {
                    return throwError(
                      () => new Error(`Factory operator is not defined.`)
                    );
                  }

                  // Show producer now it becomes active
                  return source$.pipe(
                    initialize(() =>
                      update(itemId, (item) => ({ ...item, status: "active" }))
                    ),
                    factoryOperator,
                    finalize(() => unregister(itemId))
                  );
                }
              );
            });
          }, concurrent),
          tail.current.build()
        );
      },
    }),
    [
      enter$,
      beforeEnter$,
      removeBall,
      updateBall,
      register,
      unregister,
      update,
      concurrent,
    ]
  );

  return (
    <group>
      <Tunnel
        onBallDetection={onEnter}
        onBeforeEnter={onBeforeEnter}
        displayText={displayText ?? "mergeAll"}
        entryClosed={isClosed}
        exitClosed
      />
      {items.map((item, index) => (
        <group
          key={index}
          position={[0, 2 + index * 2, 0]}
          visible={item?.status === "active"}
        >
          <Factory
            ref={item ? factories.current[item.id] : undefined}
            displayText={item?.boxedObservable.label}
            hidePlumbob
          />
        </group>
      ))}
      <group position={[2, 0, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
