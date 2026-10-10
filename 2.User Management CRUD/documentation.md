# User Management CRUD

## Project Documentation

### 1. Project Overview

Build a small **User Management** interface that allows an administrator to manage a collection of users.

The application should support the complete CRUD workflow:

```text
Users
 ├── View all users
 ├── View a single user
 ├── Create a user
 ├── Edit a user
 └── Delete a user
```

There is **no backend** for this test. The application should work entirely with mock/in-memory data.

The goal is to make the interface behave like a real application even though persistence is simulated.

---

## 2. User List

Create a main **Users** page displaying the available users.

Each user should show information such as:

```text
Name
Email
Role
Status
```

For example:

```text
Users                                      [+ Add User]

┌─────────────────────────────────────────────────────┐
│ Alice Martin   alice@example.com   Admin    Active │
│ Bob Smith      bob@example.com     Editor   Active │
│ Charlie Brown  charlie@example.com Viewer   Away   │
└─────────────────────────────────────────────────────┘
```

Each user should provide actions to:

* View
* Edit
* Delete

Include an appropriate **empty state** when there are no users.

Example:

```text
No users found.

There are currently no users to display.

[ Create User ]
```

---

## 3. View User

Selecting a user should display a dedicated user-detail view.

For example:

```text
User Details

Alice Martin
alice@example.com

Role       Admin
Status     Active

[ Edit User ]   [ Delete User ]
```

Provide a way to return to the user list.

---

## 4. Create User

Provide a form for creating a new user.

The form should contain at least:

* Name
* Email
* Role
* Status

Example:

```text
Create User

Name
[________________]

Email
[________________]

Role
[ Admin ▼ ]

Status
[ Active ▼ ]

[ Cancel ]    [ Create User ]
```

When submitted, the new user should appear in the mock user collection.

You should handle basic form validation, such as required fields and a valid email format.

---

## 5. Edit User

The edit form should reuse the same general structure as the create form.

When editing a user:

* Existing values should populate the form.
* The user should be able to modify them.
* Saving should update the mock data.
* Returning to the list should show the updated information.

Avoid creating an entirely separate form implementation if the create and edit forms fundamentally represent the same concept.

---

## 6. Delete User

Deleting a user should **not happen immediately** after clicking the delete action.

Display a confirmation step such as:

```text
Delete User?

Are you sure you want to delete
"Alice Martin"?

This action cannot be undone.

[ Cancel ]    [ Delete ]
```

After confirmation, remove the user from the mock collection.

The list should update accordingly.

---

## 7. Application States

The interface should account for more than the successful/default state.

### Loading state

Simulate a short loading period when appropriate.

For example:

```text
Loading users...
```

A simple skeleton or loading indicator is sufficient.

You do **not** need a real asynchronous backend.

---

### Error state

The application should have a way to represent an operation failing.

For example:

```text
Something went wrong.

We couldn't save this user.

[ Try Again ]
```

You may simulate errors rather than connecting to a real service.

The important part is that the UI knows how to represent failure.

---

### Empty state

The users page must handle:

```text
users.length === 0
```

gracefully.

Do not leave the user with an empty page.

---

## 8. UI Requirements

The interface should be **slightly refined beyond minimal UI**.

Aim for something that looks like a small, believable admin interface:

* clear page hierarchy
* consistent spacing
* readable typography
* visually distinct buttons/actions
* cards, panels, or a simple table/list
* clear form labels
* visible validation/error messages
* sensible hover/focus states
* confirmation dialog/modal
* usable mobile layout

You do **not** need to spend significant time on visual design.

The UI exists to make the application behavior clear.

---

## 9. Reusable Components

Identify UI pieces that genuinely benefit from reuse.

Possible examples:

```text
UserCard / UserRow
UserForm
Button
Modal
Input
StatusBadge
```

These are examples, not mandatory component names.

Do not turn every `<div>` into a component.

The goal is to practice recognizing:

> **What has its own responsibility and is reused or independently meaningful?**

---

## 10. Mock Data

Start with a small collection of users.

For example:

```js
[
    {
        id: 1,
        name: "Alice Martin",
        email: "alice@example.com",
        role: "Admin",
        status: "Active"
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        role: "Editor",
        status: "Active"
    },
    {
        id: 3,
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "Viewer",
        status: "Away"
    }
]
```

The exact users and fields are up to you.

The important part is that **create, update, and delete actually modify the application state during the session**.

Persistence across page refreshes is not required.

---

# What This Project Focuses On

This test moves beyond simply displaying data.

### 1. State management

You need to manage changing application state:

```text
initial users
      ↓
create
      ↓
updated users
      ↓
edit
      ↓
updated users
      ↓
delete
      ↓
updated users
```

The important question is:

> **Where does this state belong, and which components need access to it?**

---

### 2. Forms and bindings

You will practice:

* form structure
* input bindings
* controlled form state
* validation
* submission
* resetting/populating forms
* handling create vs edit

---

### 3. Events and component communication

Actions such as:

```text
UserRow
   ↓
Edit clicked
   ↓
parent/application state
   ↓
edit form
```

will force you to think about how components communicate and where state changes should happen.

---

### 4. Reusable component design

Create and edit are intentionally similar.

This gives you a practical reason to consider:

> **What should be shared, and what should remain separate?**

You are practicing component composition rather than simply learning component syntax.

---

### 5. UI state

A real interface is not only:

```text
success
```

It also has:

```text
loading
error
empty
confirming
editing
submitting
```

This test is designed to make you model those states explicitly.

---

### 6. CRUD thinking

You should understand the conceptual mapping:

| Operation  | UI action           |
| ---------- | ------------------- |
| **Create** | Create User         |
| **Read**   | User list / details |
| **Update** | Edit User           |
| **Delete** | Delete User         |

The mock data is standing in for what will eventually become API/database operations.

---

## What This Test Is Teaching You

By the end, you should be comfortable building a frontend feature that behaves like a real CRUD application **before a backend exists**.

More importantly, you should start developing the mental model:

```text
UI
 ↓
user interaction
 ↓
event
 ↓
state change
 ↓
UI updates
```

Later, when you add a backend, the architecture becomes closer to:

```text
UI
 ↓
event
 ↓
API request
 ↓
server
 ↓
database
 ↓
response
 ↓
state/UI update
```

The backend will change **where the data comes from**, but the frontend problems of forms, state, loading, errors, confirmation, and component responsibility still exist.

That is the main purpose of this test.
