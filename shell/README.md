# Shell host

The `shell` app is the host for the federated remotes in this repository. It starts on port `4200` and loads remote definitions from `http://localhost:7276/api/config` at runtime.

## What it does

- Fetches a list of remotes from the config API
- Registers each remote with Vite Module Federation
- Loads the exposed component from every remote and renders them in the shell

## Runtime contract

Each config item returned by the API must provide:

- `name`: the federation remote name
- `url`: the remote entry URL
- `component`: the exposed module path

Example shape:

```ts
[
  {
    name: "dyn",
    url: "http://localhost:4201/assets/remoteEntry.js",
    component: "./DynamicApp",
  },
]
```

## Development

```bash
pnpm install
pnpm dev
```

Other useful scripts:

- `pnpm build` — type-check and build the app
- `pnpm lint` — run ESLint
- `pnpm preview` — preview the production build

## Notes

- The shell expects the config API to be available before remote components can load.
- The federation placeholder in `vite.config.ts` is replaced at runtime by the fetched remote definitions.
