# User Management CRUD

A simple SvelteKit demo that implements basic Create, Read, Update, and Delete (CRUD) operations for managing a list of users. The data is stored locally in memory for demonstration purposes.

## Features
- List users with pagination
- Add new users via a form
- Edit existing user details
- Delete users with confirmation
- Demonstrates form handling and state management in SvelteKit

## Getting Started

```bash
cd "2.User Management CRUD"
# Install dependencies (npm is default; use pnpm if a pnpm-lock.yaml exists)
npm install
npm run dev
```

Visit `http://localhost:5173` to see the user management interface.

## Development

- Modify the mock data in `src/lib/mockData.js`.
- Add real API integration by replacing the local store with fetch calls.
- Extend the UI with additional user fields and validation.

## Contributing

Feel free to enhance this demo with persistent storage, authentication, or more advanced UI features.


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
pnpm dlx sv@1.1.1 create --template minimal --types jsdoc --install pnpm ./
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
