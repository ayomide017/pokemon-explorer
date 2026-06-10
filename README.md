# Pokémon Explorer

A React application that lets you browse and explore Pokémon using the [PokéAPI](https://pokeapi.co).

## Live Demo

> Deploy to Netlify and update this link.

## Features

- **Pokémon List Page** — browse the first 20 Pokémon with sprites, types, and IDs
- **Load More** — paginate through the full Pokédex 20 at a time
- **Detail Page** — view official artwork, height, weight, types, abilities, and base stats
- **Prev / Next navigation** — step between Pokémon on the detail page
- **Loading states** — animated Pokéball spinner during API requests
- **Error states** — informative error messages with retry capability
- **404 page** — graceful handling of unknown routes

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | React 18 |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Build Tool | Vite |
| Deployment | Netlify |

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.jsx
│   ├── PokemonCard.jsx
│   ├── TypeBadge.jsx
│   ├── StatBar.jsx
│   ├── Loader.jsx
│   └── ErrorMessage.jsx
├── pages/              # Route-level page components
│   ├── PokemonListPage.jsx
│   ├── PokemonDetailPage.jsx
│   └── NotFoundPage.jsx
├── services/           # API layer (reusable, centralised)
│   └── pokemonService.js
├── hooks/              # Custom React hooks
│   ├── usePokemonList.js
│   └── usePokemonDetail.js
├── routes/             # Route configuration
│   └── AppRoutes.jsx
└── utils/              # Pure helper functions
    └── typeColors.js
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Design Decisions

### Why Axios over Fetch?

Axios was chosen for:
- Automatic JSON parsing — no manual `.json()` call
- A response interceptor that normalises all errors in one place (`pokemonService.js`)
- Better timeout support out of the box
- Slightly cleaner request/cancel API

### API Layer

All API calls live in `src/services/pokemonService.js`. Pages and hooks never call `axios` directly — they import named functions (`getPokemonList`, `getPokemonDetail`, `getPokemonBatch`). This makes it trivial to swap the underlying HTTP client or add auth headers in one place.

### Custom Hooks

`usePokemonList` and `usePokemonDetail` encapsulate all state management (loading, error, data, pagination). Pages are kept declarative — they render based on what the hook returns.

### Error Handling

The Axios interceptor in `pokemonService.js` catches:
- `404` → "Pokémon not found"
- Other server errors → status code message
- Network failures → connection error message

Hooks expose an `error` string; components render `<ErrorMessage>` and a retry button.

### Routing

React Router v6 `<Routes>` / `<Route>` handles three routes:
- `/` — list page
- `/pokemon/:id` — detail page (id can be numeric or name)
- `*` — 404 fallback

The `netlify.toml` redirects all paths to `index.html` so client-side routing works on Netlify.

## Deployment (Netlify)

1. Push to GitHub
2. Connect repo on [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. The `netlify.toml` handles SPA routing automatically
