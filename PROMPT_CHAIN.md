# Smart Expense Tracker — Prompt Chain for Claude Code

Assignment: Prompting for Development (Somya Barolia). Practice the 7 ingredients, task decomposition, prompt chaining, iterative prompting, code explanation, testing and code review.

## How to use

1. Open a terminal in this folder (`Documents\Smart Expense Tracker`) and start `claude`.
2. Paste **one prompt at a time**, in order. Read the answer and review each file change before approving it.
3. Only move to the next prompt once the current step works and you understand it.
4. Copy each prompt you actually send into `prompt-log.md` (Prompt 12 creates it). Your **initial prompt + follow-ups** are part of the submission.

| # | Prompt | Technique | Template |
|---|---|---|---|
| 1 | Plan only | 7 ingredients + task decomposition | 01 Code generation |
| 2 | index.html | Prompt chaining | 01 |
| 3 | style.css | Prompt chaining | 01 |
| 4 | script.js | Prompt chaining | 01 |
| 5 | Explain the code | Code explanation | 02 |
| 6 | Test cases | Testing | 05 |
| 7 | Debug (only if a test fails) | Debugging | 03 |
| 8 | Empty-state improvement | Iterative prompting | — |
| 9 | Code review | Code review | 09 |
| 10 | Apply one review fix | Iterative prompting | — |
| 11 | README | Documentation | 08 |
| 12 | Submission pack | — | — |

---

## Prompt 1 — Initial structured prompt (plan only)

```
Role: You are a senior front-end developer and a patient mentor who explains code clearly.

Context: I'm a DevOps student practicing AI-assisted development. I need a simple Smart Expense Tracker web page for a class assignment. It must run by opening index.html in a browser, with no backend, database, login or deployment. It's fine if data resets on refresh. We are working in the current folder, which is empty.

Task: Plan the app. The user can add an expense with a name, amount and category (Food, Travel, Shopping, Other), see a list of all expenses, see the total spent, and delete any expense. Break the work into small numbered steps. Do NOT create or edit any files yet — we will build index.html, style.css and script.js one at a time in later prompts.

Constraints: HTML, CSS and vanilla JavaScript only — no frameworks, libraries or build tools. Exactly three files: index.html, style.css, script.js. Clear variable names and short comments. Validate input: if the name is empty show "Please enter an expense name."; if the amount is zero, negative or not a number show "Amount must be greater than zero." — and do not add the expense in either case. If anything in this request is unclear or missing, ask me before planning.

Examples: Adding "Lunch", 12.50, Food shows a row "Lunch | Food | $12.50" and the total becomes $12.50. Adding "" with 20 shows "Please enter an expense name." Adding "Taxi" with -5 shows "Amount must be greater than zero."

Output format: A numbered list of steps, one sentence each, then stop and wait for my next prompt.

Success criteria: Adding, listing, deleting and totaling all work; the total is always accurate to two decimals; invalid inputs are blocked with a clear message; the code is simple enough that I can explain every line.
```

## Prompt 2 — HTML

```
Good plan. Step 1: create index.html only. Include a form with inputs for name (id "expense-name"), amount (id "expense-amount", type number, step 0.01) and a category select (id "expense-category") with Food, Travel, Shopping, Other; a submit button; an empty message paragraph (id "message"); a total line with a span (id "total-amount") showing $0.00; and a table with a header row of four columns (Name, Category, Amount, Action) whose tbody has id "expense-list". Put novalidate on the form (id "expense-form") so JavaScript shows our own messages. Link style.css in the head and script.js at the end of the body. Do not create any other files. Then explain the HTML in plain English.
```

## Prompt 3 — CSS (light liquid glass)

```
The HTML looks right. Step 2: create style.css only, without changing index.html. Use a light, simple liquid glass look: a soft pastel gradient background, one frosted white card (semi-transparent background, backdrop-filter blur, thin white border, soft shadow), lightly frosted inputs, pill-shaped glass buttons, a red error message that is hidden when empty (.message:empty), a bold total and a simple table. Style the delete buttons with "#expense-list button" so script.js needs no extra classes. Keep it short — do not overcomplicate. Then explain how the glass effect works.
```

## Prompt 4 — JavaScript

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

## Prompt 5 — Explain the code (template 02)

```
Role: Act as a programming instructor.
Context: I'm a beginner in JavaScript. The code is in script.js.
Task: Explain these parts line by line: event.preventDefault(), Number() and trim(), how the amount is checked for "not a number", how deleteExpense removes one expense, and why the total is added up in cents.
Constraints: Use simple language, define any term you use, and do not change any files.
Output format: Each concept as a short heading, a 2–3 sentence explanation and a tiny example.
Success criteria: I can explain each part to my instructor in my own words.
```
*(Replace the list with any lines you don't understand.)*

## Prompt 6 — Test cases (template 05)

```
Role: Act as a QA engineer.
Context: The app is index.html + style.css + script.js in this folder; I will test it manually in the browser.
Task: Create TESTING.md with a manual test table covering positive, negative and boundary cases.
Constraints: Include at least: a valid add (Lunch, 12.50, Food); empty name; a name of only spaces; amount -5; amount 0; empty amount; 0.10 + 0.20 total accuracy; deleting one of several rows; deleting the last row (total back to $0.00); a name containing <b>html</b>. Do not change the app files. Do not claim the tests passed — leave a "Result" column empty for me.
Output format: Markdown table: #, Steps, Input, Expected result, Result.
Success criteria: Every requirement in the assignment is covered by at least one test.
```
*Now run every test yourself, fill in the Result column, and take screenshots.*

## Prompt 7 — Debug (template 03, only if a test fails)

```
Role: Act as a debugging specialist.
Context: Expected: [what should happen]. Actual: [what happened]. Steps to reproduce: [steps]. Browser console error (if any): [paste exactly].
Task: Find the root cause before proposing a fix.
Constraints: Separate confirmed findings from guesses; make the smallest change possible; don't change unrelated behavior.
Output format: Root cause, evidence, the fix, and how I can re-test it.
Success criteria: The failing test passes and all other tests still pass.
```

## Prompt 8 — Iterative improvement: empty state

```
I tested the app. One issue: when there are no expenses, the table shows only its header and looks broken. Update renderExpenses in script.js so that when the array is empty it shows a single row spanning all 4 columns with the text "No expenses yet. Add your first one above." Don't change the HTML. Keep the change small and explain exactly what you changed and why.
```
*Re-run tests 1, 9 and the delete-last test. This is a strong candidate for your "one improvement" note.*

## Prompt 9 — Code review (template 09)

```
Role: Act as a senior code reviewer.
Context: Requirements are in PROMPT_CHAIN.md (Prompt 1). Code: index.html, style.css, script.js.
Task: Review correctness, readability, accessibility and basic security for a beginner-level project.
Constraints: Give evidence (file and line) for each finding; prioritize real bugs over style preferences; do not edit any files yet.
Output format: Findings by severity (high / medium / low), then ONE simple improvement you recommend most, with the reason.
Success criteria: Findings are specific and actionable; the recommended improvement is something I can understand and explain.
```

## Prompt 10 — Apply one review improvement

```
Apply only the improvement you recommended: [paste it]. Change as little as possible, show me the diff, explain why it helps, and tell me which tests from TESTING.md to re-run.
```
*Apply it only if you understand why it is useful (assignment step 7).*

## Prompt 11 — README (template 08)

```
Role: Act as a technical writer.
Task: Create README.md for this project: what it does, how to run it (open index.html), features, input validation rules, file structure, and how I used AI (prompt chaining, iterative prompting, testing, code review).
Constraints: Don't invent features or commands; keep it short; Markdown.
```

## Prompt 12 — Submission pack

```
Create prompt-log.md with headings for: Initial structured prompt, Follow-up prompts (one subsection each, in order), and Improvement note. Leave the prompt text sections for me to paste in. Under Improvement note, add a 4-line template: what I noticed, the feedback I gave, what changed, how I verified it. Then list everything I need to submit, using the Submission checklist at the end of PROMPT_CHAIN.md.
```

---

## Submission checklist

- [ ] `index.html`, `style.css`, `script.js` (or a GitHub link — push it yourself)
- [ ] `prompt-log.md`: initial structured prompt + the follow-up prompts you sent
- [ ] Improvement note (e.g. the empty-state change from Prompt 8, or the review fix from Prompt 10)
- [ ] Screenshots: working app + test results (valid add, each error message, delete, accurate total)

> Don't just copy AI code — understand it, run it, and check it meets the requirements. AI is an accelerator, not a replacement for engineering judgment.
