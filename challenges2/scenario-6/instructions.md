# Scenario 6: RxJS Menu Search

## Context

Users want to search menu items.

The search should be responsive and efficient.

Reactive streams are commonly used for search inputs because they support operations like **debouncing and cancellation of requests**. ([codemag.com][1])

---

# Tasks

Implement menu search using RxJS.

---

## Requirements

Search should:

* debounce input by **300ms**
* ignore duplicate queries
* cancel previous searches

---

## UI Requirements

* Highlight matching text
* Show "No results found" state
* Clear results when input is empty

---

# Acceptance Criteria

* [ ] Search debounces input
* [ ] Results update reactively
* [ ] No duplicate searches occur
* [ ] Empty state UI implemented

[1]: https://www.codemag.com/Article/2509051/Angular-Signals-The-End-of-RxJS-Boilerplate?utm_source=chatgpt.com "Angular Signals: The End of RxJS Boilerplate?"
