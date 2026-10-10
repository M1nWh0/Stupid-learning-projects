git remote add origin https://github.com/M1nWh0/Stupid-learning-projects.git# AGENTS.md

This workspace contains three separate SvelteKit applications, each in its own numbered folder:

- `1.Multi-page SvelteKit Application`
- `2.User Management CRUD`
- `3.HTTP API Consumption`

Treat each folder as an isolated project. Do not assume shared state, shared components, or shared package dependencies across those apps.

## Working conventions

- Start from the relevant project directory before making edits.
- Prefer the local package manager already used by that project: `npm` for the default SvelteKit setup and `pnpm` for projects that already include `pnpm-lock.yaml`.
- Keep changes scoped to the active project unless the task explicitly requires cross-project work.
- Follow the existing SvelteKit layout:
  - `src/routes` for pages and route logic
  - `src/lib` for reusable code, mock data, and local utilities
  - `static` for static assets
  - `vite.config.js` and project config for framework setup

## Common project commands

Run these from the target project folder:

```bash
npm install
# or
pnpm install

npm run dev
# or
pnpm dev

npm run build
# or
pnpm build

npm run check
# or
pnpm check

npm run preview
# or
pnpm preview
```

All three apps use SvelteKit + Vite, and share the same validation flow via `svelte-kit sync` and `svelte-check`.

## Validation expectations

- Run the local `check` script after code changes when the task affects Svelte components, routes, or shared logic.
- Prefer the smallest validation command that matches the change.
- If a UI change is made, verify the behavior in the local app when possible.

## Documentation guidance

- Read the project-local README or documentation before implementing feature work.
- Keep documentation concise and project-specific; avoid inventing new architecture patterns unless the task explicitly calls for them.
- Prefer editing existing components and route files over introducing new large abstractions.

## Do not

- Do not copy code between the three app folders.
- Do not change dependency versions or framework setup without a clear requirement.
- Do not add broad cross-project conventions that are not already established in the current app.
