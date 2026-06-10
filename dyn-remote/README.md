# Dynamic remote

`dyn-remote` is a federated React remote exposed to the shell host. It runs on port `4201` and publishes `./DynamicApp` from `src/App.tsx`.

## What it renders

The remote currently exports a single counter button:

- Clicking the button increments the count locally in the remote
- The shell loads this remote entry dynamically at runtime

## Module Federation config

- Remote name: `dyn`
- Exposed module: `./DynamicApp`
- Remote entry: `http://localhost:4201/assets/remoteEntry.js`

## Development

```bash
pnpm install
pnpm dev
```

Other useful scripts:

- `pnpm build` — type-check and build the remote
- `pnpm lint` — run ESLint
- `pnpm preview` — preview the production build on port `4201`

## Notes

- This package shares `react` and `react-dom` with the host.
- Keep the exposed module name stable unless the shell config is updated as well.
