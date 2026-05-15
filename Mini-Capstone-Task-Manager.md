# PF 102: Finals Capstone Project — Task Manager

**Course:** PF 102: Event-Driven Programming  
**Project Type:** Individual Capstone  
**Timeline:** 1 week (Finals Week)  
**Defense:** Final Finals Week — Demo + Code Walkthrough + Checklist Sign-Off  
**Submission:** Separate files (`index.html`, `style.css`, `script.js`)

---

## Project Overview

Build a fully functional **Task Manager** application using HTML, CSS, and JavaScript that demonstrates mastery of all event-driven programming concepts covered throughout the course. The project will be evaluated during the final defense using a feature-by-feature checklist combined with a live demo and code walkthrough.

Students will be checked off one-by-one on each feature they successfully implemented. The more features completed, the higher the score.

---

## Submission Requirements

### File Structure
```
task-manager/
├── index.html    (main HTML file)
├── style.css     (all styles)
└── script.js     (all JavaScript logic)
```

### Rules
- No external frameworks or libraries (no React, Vue, jQuery, etc.)
- Must use vanilla JavaScript only
- Must work when opened directly in a browser (no build tools required)
- Must be fully functional without a local server (except for API calls)
- Code must be written by the student — no AI-generated submissions allowed

---

## Feature List & Point Values

Features are organized by difficulty tier. Students must complete all **Tier 1** features as the minimum passing requirement. Higher tiers earn progressively more points.

### Tier 1: Core Features (Minimum Passing — 40 pts)
*These features cover Weeks 1-4 fundamentals.*

| #   | Feature                                                                                | Points | Week |
| --- | -------------------------------------------------------------------------------------- | ------ | ---- |
| 1   | **Add Task** — Input field + button creates a new task displayed on the page           | 5      | 4    |
| 2   | **Delete Task** — Each task has a delete button that removes it from the DOM           | 5      | 4    |
| 3   | **Complete Task** — Click task to toggle completed state (strikethrough/visual change) | 5      | 3    |
| 4   | **Task List Rendering** — Tasks rendered from a JavaScript array/state                 | 5      | 4    |
| 5   | **Event Listeners** — Proper use of `addEventListener` for all interactions            | 5      | 2    |
| 6   | **Event Object Usage** — Access event details (e.g., `event.target`) in handlers       | 5      | 2    |
| 7   | **preventDefault()** — Prevent form default submission behavior                        | 5      | 3    |
| 8   | **DOM Selection** — Use `getElementById`, `querySelector`, or `querySelectorAll`       | 5      | 4    |

### Tier 2: Intermediate Features (60 pts)
*These features cover Weeks 3-5 patterns.*

| # | Feature | Points | Week |
|---|---------|--------|------|
| 9  | **Task Editing** — Double-click or click-to-edit task text inline | 10 | 4 |
| 10 | **Task Categories** — Assign categories (Work, Personal, etc.) with color labels | 5 | 4 |
| 11 | **Filter by Category** — Dropdown or buttons to filter tasks by category | 5 | 4 |
| 12 | **Search/Filter** — Live search that filters tasks by text (no debounce required) | 5 | 4 |
| 13 | **Debounced Search** — Search input uses debounce pattern (300ms delay) | 10 | 5 |
| 14 | **Task Counter** — Display total, completed, and pending task counts | 5 | 3 |
| 15 | **Notifications** — Auto-dismissing notification on task add/delete/complete | 10 | 5 |
| 16 | **Loading State** — Show loading indicator during async operations | 10 | 5 |

### Tier 3: Advanced Features (50 pts)
*These features cover Weeks 5-6 async patterns.*

| # | Feature | Points | Week |
|---|---------|--------|------|
| 17 | **Countdown Timer** — Each task can have a countdown timer (setInterval) | 10 | 5 |
| 18 | **Start/Pause/Reset Timer** — Timer controls with clearInterval management | 10 | 5 |
| 19 | **Fetch Categories from API** — Fetch category/tag data from a public API using fetch() | 10 | 6 |
| 20 | **async/await Pattern** — All async operations use async/await (not .then chains) | 10 | 6 |
| 21 | **try/catch Error Handling** — Proper error handling with user-friendly messages | 10 | 6 |

### Tier 4: Stretch Goals (20 pts bonus)
*Extra credit features for students who go above and beyond.*

| #   | Feature                                                                                         | Points |
| --- | ----------------------------------------------------------------------------------------------- | ------ |
| 22  | **Dark Mode Toggle** — Toggle between light and dark themes with class toggling                 | 5      |
| 23  | **localStorage Persistence** — Tasks survive page refresh using localStorage wrapped in Promise | 5      |
| 24  | **Task Priority Levels** — High/Medium/Low priority with visual indicators                      | 5      |
| 25  | **Export Tasks as JSON** — Download button exports tasks as a JSON file                         | 5      |

---

## Grading Breakdown

| Tier | Points | Grade Equivalent |
|------|--------|-----------------|
| Tier 1 only (all 8 features) | 40/150 | 75% (Passing) |
| Tier 1 + partial Tier 2 | 41-70/150 | 76-80% |
| Tier 1 + Tier 2 (all features) | 100/150 | 85% |
| Tier 1 + Tier 2 + partial Tier 3 | 101-125/150 | 86-90% |
| Tier 1 + Tier 2 + Tier 3 (all features) | 150/150 | 95% |
| All tiers + stretch goals | 151-170/150 | 100% (with bonus) |

---

## Defense Format

### Part 1: Demo (5-7 minutes)
Student demonstrates all implemented features live:
- Show the app running in the browser
- Walk through each feature that was implemented
- Prove it works in real-time

### Part 2: Code Walkthrough (3-5 minutes)
Student explains key parts of their code:
- How they structured their JavaScript
- How state management works
- How async operations are handled
- How event listeners are set up

### Part 3: Checklist Sign-Off
Instructor goes through the feature checklist one by one:
- For each feature the student claims to have implemented, the instructor verifies it works
- Instructor signs off on each working feature
- Final score is calculated based on signed-off features

---

## Suggested Timeline (Finals Week)

| Day | Focus |
|-----|-------|
| Day 1 | Project setup, HTML structure, basic CSS, add/delete/complete features (Tier 1) |
| Day 2 | Finish Tier 1, start Tier 2 — categories, filtering, task counter |
| Day 3 | Debounced search, notifications, loading states (Tier 2) |
| Day 4 | Countdown timers, fetch API, async/await, error handling (Tier 3) |
| Day 5 | Stretch goals, polish, bug fixing, prepare for defense |

---

## Evaluation Rubric

### Code Quality (included in defense)

| Criteria | Description |
|----------|-------------|
| **Event Handling** | Proper use of addEventListener, event delegation, event objects |
| **State Management** | Data-driven UI, state updates trigger re-renders |
| **Async Patterns** | Correct use of async/await, Promises, fetch API |
| **DOM Manipulation** | Clean, efficient DOM updates without unnecessary re-renders |
| **Error Handling** | Graceful handling of errors with user feedback |
| **Code Organization** | Logical structure, readable variable/function names, no spaghetti code |

### During Defense — Instructor Questions to Ask

1. _"Show me how your event loop concept applies to this app."_
2. _"Explain how your state changes when a task is completed."_
3. _"Walk me through your debounce implementation."_
4. _"What happens if the API call fails? Show me the error handling."_
5. _"Why did you use async/await instead of .then()?"_
6. _"Show me where you prevent default behavior and explain why."_
7. _"How does event delegation work in your app?"_

---

## Starter Resources Provided to Students

- Week 1-6 Lecture Notes
- Week 1-6 Laboratory Exercises
- Midterm Problems (for reference on coding patterns)
- Pre-Final Lab code (User Dashboard with Fetch API)
- jsonplaceholder.typicode.com API documentation

---

## Academic Integrity

- All code must be written by the student
- Students may reference lecture notes and lab exercises
- No copying from classmates or external sources
- AI-generated code will result in a failing grade
- Plagiarism will be subject to academic sanctions

---

## Defense Schedule

**Final Finals Week** — Individual check-off sessions will be scheduled. Each student gets 10-15 minutes for demo, walkthrough, and checklist sign-off.
