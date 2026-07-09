# Test remote

`test-remote` is a federated React remote that the shell can load alongside the dynamic and regular remotes. It runs on port `4203` and publishes `./TestApp` from `src/App.tsx`.

## What it renders

The remote currently exports a single counter button:

- Clicking the button increments the count locally in the remote
- The shell loads this remote entry dynamically at runtime

## Module Federation config

- Remote name: `test`
- Exposed module: `./TestApp`
- Remote entry: `http://localhost:4203/assets/remoteEntry.js`

## Development

```bash
pnpm install
pnpm dev
```

Other useful scripts:

- `pnpm build` — type-check and build the remote
- `pnpm lint` — run ESLint
- `pnpm preview` — preview the production build on port `4203`

## Notes

- This package shares `react` and `react-dom` with the host.
- Keep the exposed module name stable unless the shell config is updated as well.
