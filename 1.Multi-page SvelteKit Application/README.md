# Multi-page SvelteKit Application

This demo showcases a multi‑page SvelteKit app with routing, layout, and basic page components. It serves as a starting point for building more complex SvelteKit projects.

## Features
- Multiple pages using SvelteKit file‑system routing
- Shared layout component with navigation links
- Simple example components demonstrating reactivity and styling

## Getting Started

```bash
cd "1.Multi-page SvelteKit Application"
# Install dependencies (npm is default; use pnpm if pnpm‑lock.yaml exists)
npm install
npm run dev
```

Open the app at `http://localhost:5173` (or the displayed port). Navigate between the example pages using the menu.

## Development

- Add new routes by creating `.svelte` files under `src/routes`.
- Edit the shared layout in `src/routes/+layout.svelte`.

## Contributing

Feel free to extend the demo with additional pages, components, or styling.


Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@1.1.1 create --template minimal --types jsdoc --install npm ./
```

## Adding features

Add features to your project with `sv add`:

```sh
npx sv add
```

For example, to add Tailwind CSS:

```sh
npx sv add tailwindcss
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
