# Implementation Plan

## Goal
Build a small SvelteKit Product Management app that uses real HTTP requests to a backend API for reading, creating, updating, and deleting product records.

## Approach
Use SvelteKit server routes as the mock API so the browser still makes real fetch requests and the app remains self-contained. Keep UI logic and API logic separated so the request-response lifecycle stays understandable.

## Workstream 1: Project setup
- Initialize SvelteKit in the workspace.
- Confirm the project runs with the default development server.
- Keep the app focused on the assignment requirements rather than adding unnecessary libraries.

## Workstream 2: API contract and data model
- Define a product object shape: id, name, description, price.
- Add routes for GET, POST, PATCH, and DELETE operations.
- Handle success and error responses: 200, 201, 400, 404, 500, network failure.

## Workstream 3: Data access layer
- Create a central helper for fetch requests.
- Use standards: method, headers, JSON payload handling, HTTP status checking.
- Throw errors for non-OK responses so the UI can show a useful message.

## Workstream 4: Product list UI
- Build a page that fetches products on load.
- Show loading, empty, and error states.
- Display product cards with name, description, price, edit, and delete actions.

## Workstream 5: Create and edit flows
- Add a product form with name, description, and price fields.
- Validate values before submission.
- Reuse one form for create and edit modes.
- Submit POST for create and PATCH for update.

## Workstream 6: Delete workflow
- Ask for confirmation before deletion.
- Send DELETE to the correct endpoint.
- Refresh the UI after successful deletion.

## Workstream 7: UX and responsiveness
- Keep layout clean and readable.
- Use buttons, spacing, and states that clearly communicate success or failure.
- Ensure the UI remains usable on smaller screens.

## Workstream 8: Verification
- Run the app and inspect requests in the browser Network tab.
- Confirm each product operation uses the correct URL, method, payload, and status code.
- Validate error handling scenarios and ensure the interface reacts appropriately.

## Key files
- src/routes/+page.svelte
- src/lib/api/products.js
- src/lib/data/products.js
- src/routes/api/products/+server.js
- src/routes/api/products/[id]/+server.js
