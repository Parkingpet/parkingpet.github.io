## 2024-03-13 - [Skip to Main Content Link Target]
**Learning:** Found an existing `.skip-link` in `App.jsx` pointing to `href="#summary"`, but the element with `id="summary"` does not exist in the codebase, rendering the skip link non-functional for keyboard users.
**Action:** Always verify that `#id` targets for internal navigation links (especially skip links) actually exist on the page to ensure functional accessibility.
