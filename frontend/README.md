# Expense Tracker — Frontend

A Grade 12 computer science portfolio project built with React, JavaScript, Tailwind CSS, and Chart.js. The dashboard turns expense records into an interactive view of spending and demonstrates component design, state management, data processing, and browser persistence.

## Authorship

I created the application code through hands-on programming without AI help. This project is part of my college application portfolio for a Bachelor of Science in Computer Science. AI assisted with this README update; the authorship statement refers to the application code.

## Features

- Add expenses with a description, amount, date, and category: Bills, Food, or Fun.
- Edit records in a modal and delete them after confirmation.
- Filter by category and inclusive start/end dates, or reset all filters.
- Display the total for the filtered expenses.
- Visualize spending by category in a pie chart and by date in a bar chart.
- Save records in browser `localStorage` across page reloads.
- Show temporary notifications after creating, updating, or deleting records.
- Use a responsive dark interface and horizontally scrollable table.

## Run locally

Install Node.js and npm compatible with the Vite dependency in `package.json`. From the repository root:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite. The current dashboard runs independently of Python and PostgreSQL.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Generate a production build in `dist/` |
| `npm run preview` | Preview the production build after building |
| `npm run lint` | Check JavaScript and JSX with ESLint |

## Source organization

| File | Responsibility |
| --- | --- |
| `src/main.jsx` | Mount App inside React StrictMode |
| `src/App.jsx` | Shared state, CRUD handlers, filters, totals, chart datasets, and edit modal |
| `src/components/Header.jsx` | Application header |
| `src/components/ExpenseForm.jsx` | Controlled add-expense form |
| `src/components/Filters.jsx` | Category and date controls |
| `src/components/ExpensesTable.jsx` | Records, edit/delete actions, and empty state |
| `src/components/ChartsSection.jsx` | Pie and bar chart presentation |
| `src/data/dummyData.js` | Four initial sample expenses |
| `src/index.css` | Tailwind CSS import |
| `vite.config.js` | React and Tailwind Vite plugins |
| `eslint.config.js` | JavaScript and React lint rules |

## Application logic

`App.jsx` owns expenses, form values, filters, the selected expense, and notification text. Child components receive data and callbacks through props, keeping the forms, table, and charts coordinated around the same state.

A lazy `useState` initializer reads JSON from the `expenses` key in `localStorage`, falling back to sample records when no saved value exists. A `useEffect` saves the list whenever expenses change.

Creating an expense checks that description, amount, and date are present, converts the amount with `parseFloat`, assigns a `Date.now()` ID, and prepends the record. Editing uses `map` to replace a matching record; deletion uses `filter` to remove it. Each operation produces a new array rather than mutating existing state.

Filtering checks category equality and compares dates in `YYYY-MM-DD` format, including both boundary dates. The filtered array supplies the table, total, and charts. `reduce` computes the total and groups amounts by category or date. Chart dates follow the grouped data's insertion order; they are not explicitly sorted.

An expense has this shape:

```js
{
  id: 1,
  date: '2026-05-01',
  description: 'Rent',
  category: 'Bills',
  amount: 856
}
```

## Backend and database relationship

PostgreSQL is the project's backend database, as identified by the author. The React code currently uses browser storage and does not call the Python backend. The checked-in Python server is a separate HTTP demonstration; PostgreSQL connection code and schema are not included. See the [root README](../README.md) for the overall architecture.

## Skills and next steps

The frontend demonstrates controlled forms, React hooks, component composition, immutable state updates, array algorithms, JSON serialization, and chart integration. One derived dataset keeps multiple views consistent, connecting programming concepts to observable behavior.

Current limits include basic validation, floating-point amounts, no recovery for malformed saved JSON, and storage specific to a browser and origin. The edit modal's Cancel button lacks an explicit `type="button"`, so it can also submit the form.

Further work includes connecting expense operations to a Python API backed by PostgreSQL, strengthening validation, sorting chart dates, improving modal keyboard accessibility, and testing expense behavior. These are proposed improvements, not completed features.
