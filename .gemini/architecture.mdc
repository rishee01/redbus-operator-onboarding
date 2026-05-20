---
alwaysApply: true
---
# MVC Architecture Rules

This document defines the **MVC (Model–View–Controller)** architecture and technology stack for the application.

---

## Technology Stack

| Layer        | Technology | Purpose                          |
|-------------|------------|-----------------------------------|
| **Runtime** | Node.js    | Server runtime                    |
| **Routing** | Express    | HTTP routing, middleware, APIs   |
| **Templating** | EJS     | Server-side HTML views (SSR)      |
| **UI (client)** | React  | Client-side views and interactivity |
| **Bundling** | Webpack   | Build, bundle, code-split client assets |

## MVC Mapping

### Model (Data & business data layer)

**Responsibility**: Data structures, persistence, and access to external data. No HTTP or UI.

| Component | Location | Role |
|-----------|----------|------|
| **Models** | `server/models/*.model.ts` | MongoDB schemas, document definitions, CRUD helpers |
| **Services** | `server/services/*.service.ts` | External API calls (CAPI, YB, etc.), data transformation |
| **Interfaces/Types** | `server/interfaces/*.ts`, `client/uiLayer/**/interfaces/*.ts` | Data contracts, DTOs |
| **HTTP client** | `server/http/` | Centralized HTTP executor (used by services only) |

**Rules**:

- Models and services must **not** import Express (`req`/`res`) or any view code.
- All external data access goes through **services**; controllers never call HTTP/DB directly.
- Use **HttpExecutor** (or equivalent) in services; no raw Axios/fetch in controllers.
- Keep services stateless and testable.

---

### View (Presentation layer)

**Responsibility**: Rendering output. Server-side = EJS; client-side = React.

| Component | Location | Role |
|-----------|----------|------|
| **EJS templates** | `server/views/` or `views/` | SSR layout and pages; inject `__PRELOADED_STATE__`, `__INITIAL_PROPS__`, script/style tags |
| **React components** | `client/uiLayer/[market]/components/[feature]/` | Feature UI; consume props and Redux/RTK Query |
| **Styles** | `client/uiLayer/styles/[market]/` | SCSS modules; scoped per feature |
| **Webpack entries** | `client/src/[market]/[feature].tsx` | Entry points that mount React and hydrate with SSR data |

**Rules**:

- **EJS**: Only presentation and variable interpolation; no business logic. Controllers pass a single view model (e.g. `viewData`).
- **React**: Components render from props and state; data fetching via **RTK Query** (or defined API layer), not ad-hoc fetch in components.
- Use **SCSS modules**; avoid global CSS. Class names: kebab-case in styles, camelCase when imported.
- **Webpack**: One entry per feature (or per page where it makes sense). Use code-splitting and named chunks for lazy-loaded components; never lazy-load LCP elements.

---

### Controller (Request handling & orchestration)

**Responsibility**: Handle HTTP (Express), validate input, call Model layer, and choose View or API response.

| Component | Location | Role |
|-----------|----------|------|
| **Controllers** | `server/controllers/*.controller.ts` | Request handlers: call services, render EJS or send JSON |
| **Routes** | `server/routes/allRoutes/*.route.ts` | Express route definitions; wire URLs to controller methods |
| **Middlewares** | `server/middlewares/*.ts` | Auth, APM, logging, body parsing (used by routing) |

**Rules**:

- Controllers **orchestrate only**: validate input → call services (Model) → pass data to View (EJS or JSON).
- **Extend BaseController** (or equivalent) for shared behaviour (layout config, error handling, Sentry).
- **Routes** only map HTTP method + path to controller methods and middlewares; no business logic in route files.
- **Page routes**: Controller gets data from services → `res.render('view-name', viewData)`.
- **API routes**: Controller gets data from services → `res.json(...)`.
- Every route must use **APM/labelling middleware** (e.g. `setAPMLabels`) for monitoring.
- Use **try/catch** in controller methods; central error handler or `_handleError` for consistent responses.

---

## Request Flow (MVC)

```
HTTP Request
    → Express (routing)
    → Middlewares (auth, APM, etc.)
    → Controller
        → validate input
        → call Service (Model)
        → Service uses HttpExecutor / Model (DB)
        → Controller receives data
    → Controller chooses:
        - Page: res.render('ejs-view', viewData)  → View (EJS)
        - API:  res.json(data)                     → JSON response
```
