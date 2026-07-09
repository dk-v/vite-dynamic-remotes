# Project architecture

This repository is a Vite + React module federation demo composed of one host (`shell`) and three remotes (`dyn-remote`, `reg-remote`, `test-remote`).

## High-level flow

1. The host starts on `http://localhost:4200`.
2. The host fetches remote configuration from `http://localhost:7276/api/config`.
3. Each config entry points to a remote `remoteEntry.js` and an exposed component path.
4. The host registers remotes at runtime and lazy-loads each exposed component.
5. Every remote renders independently but shares `react` and `react-dom` with the host.

## Repository structure

- `shell/`: host app that discovers and renders remote components dynamically.
- `dyn-remote/`: remote named `dyn`, exposes `./DynamicApp` on port `4201`.
- `reg-remote/`: remote named `reg`, exposes `./RegularApp` on port `4202`.
- `test-remote/`: remote named `test`, exposes `./TestApp` on port `4203`.

## Runtime contract

The config API is expected to return items with this shape:

```ts
{
  name: string;
  url: string;
  component: string;
}
```

- `name`: federation remote name used by the host.
- `url`: URL of the remote's `remoteEntry.js`.
- `component`: exposed module path (for example `./DynamicApp`).

## Wiki

This markdown document is intended to be included in the project wiki as the architecture page.
