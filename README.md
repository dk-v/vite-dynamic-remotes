# vite-dynamic-remotes

A small Vite + React workspace that demonstrates runtime-loaded module federation remotes.

## Apps

- `shell` — host application on port `4200`
- `dyn-remote` — dynamic remote on port `4201`
- `reg-remote` — regular remote on port `4202`
- `test-remote` — test remote on port `4203`

## How it works

The shell fetches remote definitions from `http://localhost:7276/api/config` and loads each remote entry at runtime. Each remote exposes a single React component through Vite Module Federation.

## Start order

1. Start the config API that serves `/api/config`.
2. Start the remotes.
3. Start the shell.

See the README in each package directory for the local scripts and remote-specific details.
