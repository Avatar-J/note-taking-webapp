# NoteTakingWebapp

A feature-rich note-taking web application built with [Angular CLI](https://github.com/angular/angular-cli) version 19.2.14. It allows users to create, manage, and archive notes with powerful search, theming, accessibility, and responsive layout support.

---

## 🚀 Features

### 📌 Note Management

- Define a `Note` interface/type with fields:

  - `id`: Unique identifier
  - `title`: Title of the note (required)
  - `content`: Main body of the note (required)
  - `tags`: List of tags (e.g., `['work', 'personal']`)
  - `isArchived`: Boolean flag to indicate archived notes
  - `createdAt`: Timestamp when the note was created

- Core operations handled by a Notes Service or State Layer:
  - `Create` new notes
  - `Read` all or specific notes
  - `Update` existing notes
  - `Delete` notes
  - `Archive/Unarchive` notes
  - `Search` notes by title, content, or tags

---

### 🧭 Routing Configuration

- `/notes` → Main Notes Dashboard
- `/archived` → Archived Notes View
- `/notes/:id` → View/Edit Individual Note
- `/create` → New Note Creation Form
- Optional: Protect routes with authentication (Bonus)

---

### 🗂 Notes Dashboard Component

- Responsive grid/list of all **active notes**
- Search bar to filter notes by **title**, **content**, or **tag**
- Tag-based filtering
- Archive/unarchive toggle for each note

---

### 📋 Note Details & Editor

- View, edit, and delete individual notes
- Form validation (e.g., title and content are required)
- Display validation errors clearly
- Keyboard accessibility:
  - Navigate using keyboard only
  - Focus outlines for interactive elements

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
