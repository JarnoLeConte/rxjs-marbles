# RxJS Marbles 3D

Reactive programming in RxJS visualized with 3D marbles.

⚠️ **NOTE**:

🚧 WORK IN PROGRESS / PERSONAL PROJECT 🚧

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

## Models

Export models from Blender as follow:

- General: format gltf embedded
- Include: **selected** objects
- Transform: +Y up
- Geometry: Apply modifiers, UVs, Normals, Vertex Colors, Export Materials
- Animation: OFF

Run gltfjsx helper to generate JSX:

```sh
npx gltfjsx ./model.gltf --transform --keepnames --keepmeshes --types
```

Drag `object-transformed.glb` to public models folder.
Copy `Object.tsx`` to project, and edit to rename exports, and adjust loading paths.
