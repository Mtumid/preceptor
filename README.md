# Le Précepteur

A French vocabulary learning app that teaches register: the full range from argot to literary French, not just a single neutral form.

## What makes it different

Most language apps teach one word per concept. Real French has five or more, each carrying social meaning. Le Précepteur teaches you to hear and produce the right register for each situation.

## Running locally

```
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Project structure

```
src/
  components/         React components
    modes/            One file per exercise mode
  content/            JSON data files (concepts, expressions, etymologies)
  store/              Zustand state (useStore.js)
  utils/              buildSession.js, registerConfig.js, contextRegisterMap.js
  App.jsx             Root component, reads screen from store
  main.jsx            Entry point
```

## Exercise modes

| Mode | What it tests |
|---|---|
| Recognise the register | Identify which register a French expression belongs to |
| Produce in register | Choose the correct French expression for a given register |
| Translate across registers | Find the equivalent of an expression at a different register |
| Spot the mismatch | Judge whether a French expression fits a described social context |

## Adding content

Open `src/content/expressions.json`. Each entry needs:

- `id` (unique string, e.g. `expr_025`)
- `concept_id` (links to a concept in `concepts.json`)
- `text` (the French expression)
- `register` (one of: argotique, familier, familier_oral, courant, soutenu, littéraire)
- `frequency` (1 to 5)
- `example` (a short sentence using the expression)
- `notes` (one or two lines of explanation, shown after answering)

To add etymology, add an entry to `etymologies.json` with the matching `expression_id`.

## Tech stack

Vite, React, Tailwind CSS v4, Zustand. No backend, no database, no authentication.
State resets on page reload. This is intentional for the MVP.
