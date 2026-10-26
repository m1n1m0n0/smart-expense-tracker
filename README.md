# Smart Expense Tracker

A simple one-page web app to track expenses: add an expense with a name, amount and category, see all expenses in a table, see the total spent, and delete any expense. Built with plain HTML, CSS and JavaScript as a Prompting for Development assignment.

## How to run

Open `index.html` in any modern browser. No install, server or build step is needed. Data is kept in memory only, so it resets when you refresh the page.

## Features

- Add an expense: name, amount and category (Food, Travel, Shopping, Other)
- Table of all expenses with a Delete button on each row
- Total spent, always shown with two decimals and added up in whole cents (0.10 + 0.20 = $0.30)
- Friendly empty state: "No expenses yet. Add your first one above."
- Light "liquid glass" design: frosted card on a pastel gradient

## Input validation

| Input | Result |
|---|---|
| Empty name, or only spaces | "Please enter an expense name." and nothing is added |
| Amount empty, zero, negative, not a number, rounding to $0.00 (e.g. 0.001), or too large to total | "Amount must be greater than zero." and nothing is added |

Typed text is displayed with `textContent`, so a name like `<b>html</b>` shows as plain text and is never treated as HTML.

## File structure

```
index.html    page structure: form, message, total, expenses table
style.css     liquid glass styling
script.js     add, validate, render, delete and total logic
TESTING.md    manual test plan (positive, negative and boundary cases)
README.md     this file
prompt-log.md the prompts used to build the app, and the improvement note
```

## How I used AI

- **Structured initial prompt:** one prompt with all 7 ingredients (role, context, task, constraints, examples, output format, success criteria), asking for a plan only.
- **Task decomposition and prompt chaining:** built one file per prompt (HTML, then CSS, then JavaScript), reviewing each before moving on.
- **Code explanation:** asked for a beginner-level explanation of the key lines.
- **Testing:** generated a manual test plan and ran every test in the browser.
- **Iterative prompting:** added an empty-state row after noticing the empty table looked broken.
- **Code review:** an AI review found that amounts like 0.001 were added as $0.00 and 1e308 made the total "$Infinity"; I applied the recommended fix (validate in whole cents) and re-ran the tests.
