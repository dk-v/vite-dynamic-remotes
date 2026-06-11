bytes:554
- Defines a Vite config with `react()` and `@originjs/vite-plugin-federation`.
- Federation name is `dyn` and `remoteEntry.js` is emitted.
- Exposes `./DynamicApp` from `./src/App` and shares `react` plus `react-dom`.
- Dev server port is `4201`; build target is `esnext` with CSS splitting and minify disabled.