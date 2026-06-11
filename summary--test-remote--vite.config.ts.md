bytes:552
- Defines a Vite config with `react()` and `@originjs/vite-plugin-federation`.
- Federation name is `test` and `remoteEntry.js` is emitted.
- Exposes `./TestApp` from `./src/App` and shares `react` plus `react-dom`.
- Dev server port is `4203`; build target is `esnext` with CSS splitting and minify disabled.