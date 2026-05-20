# Operator Onboarding | redBus

Landing page for bus operators and travel agents, based on the [Figma design](https://www.figma.com/design/).

## Stack

- **Node.js** + **Express** – server and routing
- **EJS** – templates
- **Webpack** – bundling (JS + CSS)

## Setup

```bash
npm install
npm start
```

`npm start` runs the Webpack build then starts the server, so the JS/CSS bundle in `public/dist/` is created automatically (no need to run `npm run build` separately). Image assets can go in `public/images/`; the app works without them.

Server runs at **http://localhost:3000**.

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm start`    | Build assets + run Express     |
| `npm run dev`  | Run with nodemon (auto-reload) |
| `npm run build`| Build Webpack bundle           |
| `npm run watch`| Webpack watch (rebuild on change) |

For local development: run `npm run watch` in one terminal and `npm run dev` in another so both assets and server reload on change.

## Project structure

```
├── server.js           # Express app and routes
├── webpack.config.js   # Webpack config
├── views/              # EJS templates
│   ├── index.ejs       # Operator Onboarding page
│   └── partials/
│       └── header.ejs
├── src/
│   ├── js/main.js      # Entry; imports CSS and FAQ logic
│   └── css/main.css    # Styles
└── public/
    ├── dist/           # Webpack output (gitignored, created on build)
    └── images/         # Optional image assets (e.g. from Figma export)
```

## Routes

- `GET /` – Operator Onboarding landing page
