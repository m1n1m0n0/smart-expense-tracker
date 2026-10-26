# Prompt Log — Smart Expense Tracker

Prompts sent to Claude Code, in order. Prompt 7 (debugging) was not needed because no test failed.

## Initial structured prompt

Uses all 7 ingredients (role, context, task, constraints, examples, output format, success criteria) and asks for a plan only (task decomposition).

```
Role: You are a senior front-end developer and a patient mentor who explains code clearly.

Context: I'm a DevOps student practicing AI-assisted development. I need a simple Smart Expense Tracker web page for a class assignment. It must run by opening index.html in a browser, with no backend, database, login or deployment. It's fine if data resets on refresh. We are working in the current folder, which is empty.

Task: Plan the app. The user can add an expense with a name, amount and category (Food, Travel, Shopping, Other), see a list of all expenses, see the total spent, and delete any expense. Break the work into small numbered steps. Do NOT create or edit any files yet — we will build index.html, style.css and script.js one at a time in later prompts.

Constraints: HTML, CSS and vanilla JavaScript only — no frameworks, libraries or build tools. Exactly three files: index.html, style.css, script.js. Clear variable names and short comments. Validate input: if the name is empty show "Please enter an expense name."; if the amount is zero, negative or not a number show "Amount must be greater than zero." — and do not add the expense in either case. If anything in this request is unclear or missing, ask me before planning.

Examples: Adding "Lunch", 12.50, Food shows a row "Lunch | Food | $12.50" and the total becomes $12.50. Adding "" with 20 shows "Please enter an expense name." Adding "Taxi" with -5 shows "Amount must be greater than zero."

Output format: A numbered list of steps, one sentence each, then stop and wait for my next prompt.

Success criteria: Adding, listing, deleting and totaling all work; the total is always accurate to two decimals; invalid inputs are blocked with a clear message; the code is simple enough that I can explain every line.
```

## Follow-up prompts

### 1. Create index.html (prompt chaining)

```
Good plan. Step 1: create index.html only. Include a form with inputs for name (id "expense-name"), amount (id "expense-amount", type number, step 0.01) and a category select (id "expense-category") with Food, Travel, Shopping, Other; a submit button; an empty message paragraph (id "message"); a total line with a span (id "total-amount") showing $0.00; and a table with a header row of four columns (Name, Category, Amount, Action) whose tbody has id "expense-list". Put novalidate on the form (id "expense-form") so JavaScript shows our own messages. Link style.css in the head and script.js at the end of the body. Do not create any other files. Then explain the HTML in plain English.
```

### 2. Create style.css (prompt chaining)

```
The HTML looks right. Step 2: create style.css only, without changing index.html. Use a light, simple liquid glass look: a soft pastel gradient background, one frosted white card (semi-transparent background, backdrop-filter blur, thin white border, soft shadow), lightly frosted inputs, pill-shaped glass buttons, a red error message that is hidden when empty (.message:empty), a bold total and a simple table. Style the delete buttons with "#expense-list button" so script.js needs no extra classes. Keep it short — do not overcomplicate. Then explain how the glass effect works.
```

### 3. Create script.js (prompt chaining)

```
Great, the HTML and CSS are done. Step 3: create script.js. Use the exact element IDs from index.html and don't change the HTML or CSS.
The script should:
- Keep expenses in an array of objects with id, name, amount and category
- On form submit, prevent the page reload, trim the name, convert the amount to a number and validate it
- Show "Please enter an expense name." if the name is empty, and "Amount must be greater than zero." if the amount is zero, negative or not a number, without adding anything
- Clear the message and the form after a valid add
- Re-render the list and the total after every add or delete, with the total formatted to two decimals (add up in whole cents so 0.10 + 0.20 shows $0.30)
- Give each row a Delete button that removes only that expense
- Use textContent, not innerHTML, for anything the user typed
Use vanilla JavaScript only, with small named functions like addExpense, deleteExpense, renderExpenses and updateTotal, and a short comment above each. After the code, explain in plain English how adding and deleting flow through these functions.
```

### 4. Explain the code (code explanation)

```
Role: Act as a programming instructor.
Context: I'm a beginner in JavaScript. The code is in script.js.
Task: Explain these parts line by line: event.preventDefault(), Number() and trim(), how the amount is checked for "not a number", how deleteExpense removes one expense, and why the total is added up in cents.
Constraints: Use simple language, define any term you use, and do not change any files.
Output format: Each concept as a short heading, a 2–3 sentence explanation and a tiny example.
Success criteria: I can explain each part to my instructor in my own words.
```

### 5. Create the test plan (testing)

```
Role: Act as a QA engineer.
Context: The app is index.html + style.css + script.js in this folder; I will test it manually in the browser.
Task: Create TESTING.md with a manual test table covering positive, negative and boundary cases.
Constraints: Include at least: a valid add (Lunch, 12.50, Food); empty name; a name of only spaces; amount -5; amount 0; empty amount; 0.10 + 0.20 total accuracy; deleting one of several rows; deleting the last row (total back to $0.00); a name containing <b>html</b>. Do not change the app files. Do not claim the tests passed — leave a "Result" column empty for me.
Output format: Markdown table: #, Steps, Input, Expected result, Result.
Success criteria: Every requirement in the assignment is covered by at least one test.
```

### 6. Empty-state improvement (iterative prompting)

```
I tested the app. One issue: when there are no expenses, the table shows only its header and looks broken. Update renderExpenses in script.js so that when the array is empty it shows a single row spanning all 4 columns with the text "No expenses yet. Add your first one above." Don't change the HTML. Keep the change small and explain exactly what you changed and why.
```

### 7. Code review

```
Role: Act as a senior code reviewer.
Context: Requirements are in PROMPT_CHAIN.md (Prompt 1). Code: index.html, style.css, script.js.
Task: Review correctness, readability, accessibility and basic security for a beginner-level project.
Constraints: Give evidence (file and line) for each finding; prioritize real bugs over style preferences; do not edit any files yet.
Output format: Findings by severity (high / medium / low), then ONE simple improvement you recommend most, with the reason.
Success criteria: Findings are specific and actionable; the recommended improvement is something I can understand and explain.
```

### 8. Apply the review fix (iterative prompting)

```
Apply only the improvement you recommended: validate the amount in whole cents (const cents = Math.round(amount * 100); reject if !Number.isFinite(cents) || cents <= 0), so amounts like 0.001 are no longer added as $0.00 and 1e308 can no longer make the total "$Infinity". Change as little as possible, show me the diff, explain why it helps, and tell me which tests from TESTING.md to re-run.
```

### 9. README (documentation)

```
Role: Act as a technical writer.
Task: Create README.md for this project: what it does, how to run it (open index.html), features, input validation rules, file structure, and how I used AI (prompt chaining, iterative prompting, testing, code review).
Constraints: Don't invent features or commands; keep it short; Markdown.
```

### 10. Submission pack

```
Create prompt-log.md with headings for: Initial structured prompt, Follow-up prompts (one subsection each, in order), and Improvement note. Leave the prompt text sections for me to paste in. Under Improvement note, add a 4-line template: what I noticed, the feedback I gave, what changed, how I verified it. Then list everything I need to submit, using the Submission checklist at the end of PROMPT_CHAIN.md.
```

## Improvement note

While reviewing the code, I noticed that an amount like 0.001 was added as a $0.00 expense with no error message, and that entering 1e308 made the total show "$Infinity"; I confirmed both in the browser. I asked the AI to apply only its recommended fix, checking the amount in whole cents, with the smallest possible change, and to tell me which tests to re-run. In script.js, the amount is now converted to cents with Math.round(amount * 100) and rejected if the result is not a finite number or not greater than zero, so validation uses exactly the same value that the app displays and adds to the total. To check it, I added two tests (0.001 and 1e308), which now show "Amount must be greater than zero." and add nothing, and I re-ran the whole test plan: all 18 tests pass, including the 0.01 boundary.
