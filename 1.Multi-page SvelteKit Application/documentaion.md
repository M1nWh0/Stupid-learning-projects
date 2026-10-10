1. Application concept

Build a small Admin Dashboard called:

Control Panel

It represents an application where an administrator can navigate between different sections.

The application contains:

/
├── dashboard
├── users
│   └── [id]
└── settings

The / route should act as a simple landing/welcome page that links to the dashboard.

2. Required routes

You must implement exactly these routes:

/
 /dashboard
 /users
 /users/[id]
 /settings
/

A simple welcome page.

It should contain:

application name
short description
button/link to /dashboard

Example content:

Control Panel

Manage your application from one place.

[ Go to Dashboard ]

No need for anything complicated.

/dashboard

Create a dashboard overview.

It should contain at least:

Dashboard

Welcome back.

[ Users ] [ Active Users ] [ System Status ]

The values can be hardcoded.

For example:

Users
128

Active Users
96

System Status
Operational

The important part is layout and routing, not data.

/users

Display a list of users.

Use a small hardcoded dataset.

For example:

users = [
    { id: 1, name: "Alice", role: "Admin" },
    { id: 2, name: "Bob", role: "Editor" },
    { id: 3, name: "Charlie", role: "Viewer" }
]

Display something like:

Users

Alice       Admin      View
Bob         Editor     View
Charlie     Viewer     View

Each user must have a link to:

/users/[id]

So:

Alice → /users/1
Bob → /users/2
Charlie → /users/3
/users/[id]

This is the dynamic route.

It should read the user's ID from the URL and display the corresponding user.

For example:

User Details

ID: 2
Name: Bob
Role: Editor

[ Back to Users ]

If you navigate manually to:

/users/3

you should see Charlie.

You do not need a database.

You do not need an API.

You do not need authentication.

A hardcoded array is enough.

/settings

Create a simple settings page.

For example:

Settings

Account
    Name: Minou

Preferences
    Theme: System
    Language: English

You don't need to make the settings functional.

3. Shared navigation

Every page except / should share the same application navigation.

For example:

┌───────────────────────────────────────────────┐
│ Control Panel                                 │
│                                               │
│ Dashboard   Users   Settings                  │
├───────────────────────────────────────────────┤
│                                               │
│                  PAGE CONTENT                 │
│                                               │
└───────────────────────────────────────────────┘

The navigation should not be duplicated manually in every page.

You should determine the appropriate SvelteKit layout structure yourself.

4. Active navigation state

The current section should be visually distinguishable.

For example:

Dashboard   Users   Settings
^^^^^^^^^

when you're on:

/dashboard

and:

Dashboard   Users   Settings
              ^^^^^

when you're on:

/users

The active state should also make sense for the dynamic route.

When visiting:

/users/42

the Users navigation item should still appear active.

You need to decide how to determine the active route.

5. Responsive layout

The application must remain usable on a narrow screen.

Desktop:

┌──────────────────────────────────────────┐
│ Control Panel                            │
│ Dashboard | Users | Settings             │
├──────────────────────────────────────────┤
│                                          │
│        Dashboard content                 │
│                                          │
└──────────────────────────────────────────┘

Mobile:

┌──────────────────┐
│ Control Panel    │
│                  │
│ Dashboard        │
│ Users            │
│ Settings         │
├──────────────────┤
│                  │
│ Page content     │
│                  │
└──────────────────┘

The exact design is up to you.

You are testing whether you can make a reasonable responsive layout, not whether you can produce a beautiful UI.

6. Architecture requirements

These are important.

Your application should demonstrate that you understand:

Routing

Routes should be represented through SvelteKit's filesystem routing.

Do not build a single page and manually switch content based on the URL.

Layouts

Shared application UI should live at an appropriate layout level.

Do not copy this into five pages:

<nav>
    ...
</nav>
Dynamic routing

/users/[id] must actually be a dynamic route.

Do not create:

/users/1
/users/2
/users/3
Data ownership

The user list should have a sensible owner.

You should be able to explain:

Why does this data live here rather than inside the navigation or the root layout?

Component responsibility

You may create components where useful.

For example:

components/
    Navigation
    StatCard
    UserRow

But do not create components merely because you can.

This is part of the test.

A reasonable solution with fewer components is better than a fragmented application with 25 tiny components.

7. Technical constraints

Use:

SvelteKit
Svelte 5
JavaScript or TypeScript
CSS of your choice

You may use:

standard CSS
CSS modules if you prefer
Tailwind if already configured

Do not add:

database
external API
authentication library
state-management library
UI component library

The test is specifically about SvelteKit routing/layout fundamentals.