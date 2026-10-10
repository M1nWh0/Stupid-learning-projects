# Real HTTP API Consumption

## 1. Project Overview

Build a small Product Management application using SvelteKit that retrieves and modifies data through an HTTP API.

The application must communicate with an actual API rather than relying exclusively on a local JavaScript array. You may use a suitable public API or build a small mock backend.

The objective is to understand how a frontend communicates with a server, how HTTP requests and responses work, and how to handle failures.

## 2. Project Requirements

### 2.1 Display Products — GET

Create a Products page that retrieves products from an API and displays them.

Each product should show:

* Product name

* Description

* Price

* An action to view or edit the product

* An action to delete the product

The page must display an appropriate loading indicator while retrieving data, an error message if the request fails, and an empty state if no products are available.

### 2.2 Create Product — POST

Provide a form for creating a product with the following fields:

* Name

* Description

* Price

When the form is submitted:

* Send the product data to the API.

* Handle the response from the server.

* Display success or error feedback.

* Update the interface to reflect the result.

Prevent invalid submissions, such as missing required fields or a negative price.

### 2.3 Update Product — PATCH

Allow users to edit an existing product.

The form should be populated with the product's current information.

When submitted:

* Send only the fields intended to be updated, using `PATCH`.

* Handle successful and unsuccessful responses.

* Reflect the updated product in the interface.

### 2.4 Delete Product — DELETE

Allow users to delete a product through an API request.

Requirements:

* Ask for confirmation before deleting.

* Send a `DELETE` request to the appropriate endpoint.

* Update the interface after a successful deletion.

* Display an appropriate message if deletion fails.

### 2.5 API Configuration

Use a consistent base URL and appropriate endpoints.

For example:

```
GET     /products
GET     /products/:id
POST    /products
PATCH   /products/:id
DELETE  /products/:id
```

These are example endpoint paths, not a requirement to implement a particular API structure. Adapt them to the API you choose.

If you use a public API, verify that it supports the required operations. Some public APIs simulate writes without permanently saving changes.

## 3. HTTP Response Handling

Your application must account for the following responses and failures.

| Response                    | Expected behavior                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------- |
| `200 OK`                    | Process a successful response containing the expected data, when applicable.       |
| `201 Created`               | Handle successful resource creation.                                               |
| `400 Bad Request`           | Display useful validation or request feedback.                                     |
| `404 Not Found`             | Handle a missing product or endpoint.                                              |
| `500 Internal Server Error` | Inform the user that the server encountered a problem.                             |
| Network failure             | Handle cases where the server cannot be reached or no usable response is received. |

You do not need to force a real API to produce every response. If your chosen API cannot reliably reproduce these cases, simulate them through a mock backend or controlled test scenarios.

Important: `fetch()` does not automatically reject its promise for HTTP error responses such as `404` or `500`. Your application must distinguish between a completed HTTP request and a successful HTTP response.

## 4. User Interface Requirements

Create a clean, moderately refined interface suitable for a small product-management tool.

Include:

* A clear page title and product list.

* A visible action for adding products.

* A form for creating and editing products.

* Clear loading, empty, success, and error states.

* Confirmation before deletion.

* Consistent buttons, form fields, and spacing.

* A responsive layout that remains usable on mobile screens.

The design should support the functionality without becoming the main focus of the project.

## 5. Technical Constraints

* Use SvelteKit and Svelte 5.

* Use JavaScript or TypeScript.

* Use `fetch()` to communicate with the API.

* Use the HTTP methods required by the operations.

* Handle request failures and HTTP error responses.

* Keep API communication and UI responsibilities reasonably organized.

* Do not add a database unless your chosen mock backend requires one.

You may look up syntax and API documentation as needed. The application architecture and the request-response lifecycle should be understandable without following a tutorial step by step.

## What This Project Focuses On

### 1. HTTP fundamentals

Understand the relationship between a request and its response:

```
Frontend
   │
   │ HTTP request
   ▼
Server / API
   │
   │ HTTP response
   ▼
Frontend
   │
   ▼
Update the UI
```

You should understand the purpose of methods, URLs, headers, request bodies, status codes, and response bodies.

### 2. Fetch and asynchronous operations

Practice sending requests, awaiting responses, parsing JSON, and handling failures.

You should know the difference between:

* A network failure.

* An HTTP error response.

* An invalid or unexpected response body.

* A successful request whose result still needs to be reflected in the UI.

### 3. API integration

Learn how frontend code consumes an API instead of treating a local array as the source of truth.

You should understand how the frontend sends data, how the server responds, and how the interface should react to that response.

### 4. State synchronization

After creating, editing, or deleting a product, the displayed data must reflect the operation's outcome.

Consider whether you should update local state, retrieve the data again, or use another strategy. The right choice depends on the API and the application.

### 5. Browser DevTools

This is a central part of the test.

Open DevTools → Network and inspect requests generated by your application.

For each CRUD operation, you should be able to identify:

* Request URL: Where was the request sent?

* Request method: Was it `GET`, `POST`, `PATCH`, or `DELETE`?

* Status code: What did the server return?

* Request payload: What data did the browser send?

* Response: What did the server return?

* Timing: How long did the request take?

* Initiator: Which code or action triggered the request?

You should be able to answer:

> What request did the browser actually send, and what evidence tells me whether it succeeded?

### 6. Frontend and backend boundaries

The frontend is responsible for collecting input, sending requests, presenting results, and communicating errors to the user.

The API is responsible for processing requests and returning responses. In a real application, the server also enforces validation and authorization; frontend validation alone is not sufficient.

The central objective: By completing this project, you should be able to integrate an HTTP API into a SvelteKit application, understand the request-response lifecycle, and investigate failures using browser DevTools.
