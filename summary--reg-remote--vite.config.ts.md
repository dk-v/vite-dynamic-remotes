bytes:554
- Defines a Vite config with `react()` and `@originjs/vite-plugin-federation`.
- Federation name is `reg` and `remoteEntry.js` is emitted.
- Exposes `./RegularApp` from `./src/App` and shares `react` plus `react-dom`.
- Dev server port is `4202`; build target is `esnext` with CSS splitting and minify disabled.