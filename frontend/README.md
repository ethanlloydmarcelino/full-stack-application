# Expense Tracker Frontend

This is the React frontend for my Grade 12 expense tracker project. I built it for practice and for my college portfolio as I prepare to apply for a Bachelor of Science in Computer Science.

I wrote the application code myself through hands-on practice without AI help. I used AI to help edit this README.

## What the app does

- Adds expenses with a description, amount, date, and category.
- Lets users edit expenses and delete them after confirmation.
- Filters expenses by category and start/end dates.
- Shows the total for the expenses currently on screen.
- Displays a pie chart by category and a bar chart by date.
- Saves expenses in the browser so they stay after a refresh.
- Shows short messages when an expense is added, updated, or deleted.

The categories are Bills, Food, and Fun. The page uses a dark theme and adjusts its layout for different screen sizes.

## Tools I used

- React and JavaScript for the interface and app logic.
- Vite for running and building the frontend.
- Tailwind CSS for styling.
- Chart.js and react-chartjs-2 for the charts.
- localStorage for saving expenses in the browser.
- ESLint for checking the code.

## How to run it

You need Node.js and npm that support the Vite version in `package.json`. From the main project folder, run:

```powershell
cd frontend
npm install
npm run dev
```

Open the local address printed in the terminal. You do not need to start the Python server or PostgreSQL to use this version of the dashboard.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates the production files in `dist/` |
| `npm run preview` | Previews the app after building it |
| `npm run lint` | Checks JavaScript and JSX with ESLint |

## Where the code is

| File | What it contains |
| --- | --- |
| `src/main.jsx` | Starts the React app with StrictMode |
| `src/App.jsx` | State, expense functions, filters, totals, chart data, and edit window |
| `src/components/Header.jsx` | The app title |
| `src/components/ExpenseForm.jsx` | The form for adding expenses |
| `src/components/Filters.jsx` | Category and date filters |
| `src/components/ExpensesTable.jsx` | The expense table and edit/delete buttons |
| `src/components/ChartsSection.jsx` | The pie and bar charts |
| `src/data/dummyData.js` | Four sample expenses |
| `src/index.css` | Imports Tailwind CSS |
| `vite.config.js` | Sets up the React and Tailwind plugins |
| `eslint.config.js` | Sets up the code checks |

## How it works

`App.jsx` keeps track of the expense list, form inputs, filters, the expense being edited, and notification messages. It passes the values and functions to the other components through props.

When someone adds an expense, the app checks that the description, amount, and date are filled in. It converts the amount to a number with `parseFloat`, creates an ID with `Date.now()`, and puts the new expense at the start of the list. Editing uses `map` to replace the matching record. Deleting uses `filter` to remove it. These functions create a new array instead of changing the existing one.

The filters check the category and dates. Dates use `YYYY-MM-DD`, so the code can compare them as strings. Expenses on the start or end date are included.

The table, total, and charts all use the filtered list. I use `reduce` to calculate the total and add up spending for each category and date. The bar chart currently keeps the dates in the order they appear in the data rather than sorting them.

### Saving expenses

When the app starts, it checks the `expenses` key in `localStorage`. If there is saved data, it reads the JSON. Otherwise, it starts with the sample expenses. A `useEffect` saves the list as JSON whenever it changes.

The saved data belongs to that browser and site address. It does not sync to other devices or to PostgreSQL.

### Example expense

```js
{
  id: 1,
  date: '2026-05-01',
  description: 'Rent',
  category: 'Bills',
  amount: 856
}
```

## Backend and database

I use PostgreSQL for the backend database. In this version of the repository, the React dashboard still uses `localStorage` and does not call the Python server. The Python folder contains a separate request/response example, and the database connection code and table setup are not included yet.

See the [main README](../README.md) for the server example and the overall project structure.

## What I want to improve

I want to connect the dashboard to the Python backend and PostgreSQL, improve form validation, sort the chart dates, and add tests. I also need to handle invalid JSON in browser storage and improve keyboard support for the edit window.

The edit form's Cancel button needs `type="button"` so it cannot submit the form. Amounts currently use JavaScript floating-point numbers, which is another area to improve when connecting the database.
