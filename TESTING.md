# Smart Expense Tracker — Manual Test Plan

Open `index.html` in a browser. Start each test from a fresh page (refresh) unless the steps say otherwise.
Fill in the **Result** column yourself (Pass / Fail + note) and take screenshots.

**Run log:** Oct 26, 2026, Chromium, automated run (Playwright typing into the fields and clicking the buttons): 18 of 18 passed, no JavaScript errors. Re-run them yourself by hand before submitting.

| # | Steps | Input | Expected result | Result |
|---|---|---|---|---|
| 1 | Enter name, amount, category; click **Add expense** | Lunch, 12.50, Food | Row "Lunch \| Food \| $12.50" appears; total shows $12.50; message hidden; form cleared | Pass: row "Lunch \| Food \| $12.50", total $12.50, form cleared |
| 2 | Leave name empty, enter amount; click Add | "", 20 | Message "Please enter an expense name."; no row added; total unchanged | Pass: message shown, no row, total $0.00 |
| 3 | Enter only spaces as name; click Add | "   ", 20 | Message "Please enter an expense name."; no row added | Pass: message shown, no row |
| 4 | Enter a negative amount; click Add | Taxi, -5 | Message "Amount must be greater than zero."; no row added | Pass: message shown, no row |
| 5 | Enter zero; click Add | Taxi, 0 | Message "Amount must be greater than zero."; no row added | Pass: message shown, no row |
| 6 | Leave amount empty; click Add | Taxi, "" | Message "Amount must be greater than zero."; no row added | Pass: message shown, no row |
| 7 | Add two expenses | A, 0.10, Other then B, 0.20, Other | Total shows exactly $0.30 (not $0.30000000000000004) | Pass: total $0.30 |
| 8 | After an error, add a valid expense | test 2, then Lunch, 12.50 | Error message disappears; row added | Pass: error cleared, row added |
| 9 | Add three expenses, delete the middle one | A 1.00, B 2.00, C 3.00; delete B | Only B removed; rows A and C remain; total $4.00 | Pass: A and C remain, total $4.00 |
| 10 | Add one expense, then delete it | Lunch, 12.50; Delete | Table shows "No expenses yet. Add your first one above."; total back to $0.00 | Pass: empty-state row shown, total $0.00 |
| 11 | Enter HTML in the name | `<b>html</b>`, 5, Other | Row shows the literal text `<b>html</b>` (not bold); no HTML is rendered | Pass: shown as literal text, nothing bold |
| 12 | Boundary: smallest positive amount | Coin, 0.01, Other | Row "$0.01"; total $0.01 | Pass: row $0.01, total $0.01 |
| 13 | Large amount | Rent, 2500, Other | Row "$2500.00"; total updates correctly | Pass: row $2500.00, total $2500.00 |
| 14 | Each category | one expense per Food, Travel, Shopping, Other | Each row shows the selected category | Pass: Food, Travel, Shopping, Other shown |
| 15 | Refresh the page | (after adding rows) | List and total reset to empty / $0.00 (expected: no saving) | Pass: empty list, total $0.00 after refresh |
| 16 | Open the page fresh | (none) | Table shows one row "No expenses yet. Add your first one above." spanning all columns; total $0.00 | Pass: empty-state row across 4 columns, total $0.00 |
| 17 | Amount that rounds to zero cents (review fix) | Tiny, 0.001 | Message "Amount must be greater than zero."; no row added | Pass: message shown, no row |
| 18 | Absurdly large amount (review fix) | Huge, 1e308 | Message "Amount must be greater than zero."; no row added; total stays $0.00 (never "$Infinity") | Pass: message shown, total stays $0.00 |

Coverage: add (1, 12–14), list (1, 9, 14), total accuracy (7, 9, 10, 18), delete (9, 10), validation (2–6, 8, 17, 18), safe output (11), data reset (15), empty state (10, 16).
