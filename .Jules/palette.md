## 2024-03-04 - Static Site Accessibility and Intra-page Navigation
**Learning:** Single-page static sites need explicit CSS for smooth scrolling (`scroll-behavior: smooth`) to give spatial context during internal anchor link navigation. Additionally, they often lack a build tool to inject accessibility polyfills, making manual `:focus-visible` styles critical for keyboard users navigating through anchor links.
**Action:** When working on purely static single-page sites, explicitly check for and add `scroll-behavior: smooth` to the HTML root and custom `:focus-visible` styles to interactive elements like `<a>` tags.

## 2026-03-04 - Semantic Contact Links
**Learning:** Making phone numbers into interactive links with the `tel:` protocol is highly valuable for mobile users, turning static text into actionable, click-to-call items. Including an `aria-label` further clarifies the intent for screen readers (e.g., "Call [number]" instead of just reading the number).
**Action:** Always wrap phone numbers in an anchor tag with a `tel:` href and an appropriate `aria-label` when displaying contact information.

## 2024-05-18 - Keyboard Navigation and Skip Links
**Learning:** For static sites, keyboard users and screen reader users can get easily fatigued tabbing through navigation links before reaching the main content. This is especially true on one-page resumes where the navigation is present at the top of the page.
**Action:** Always add a visually hidden "Skip to main content" link as the first focusable element on the page for single-page static sites. Ensure it becomes visible on focus to provide a clear indicator.
## 2024-05-18 - ARIA Tablists and Dynamic Shared Inputs
**Learning:** When building custom tab interfaces where the interactive area (inputs/outputs) is shared across multiple tabs, dynamic `aria-label`s are necessary to provide context. The `role="tablist"`, `role="tab"`, and `role="tabpanel"` pattern creates a predictable structure for screen readers, but the shared inputs require specific labels (e.g., "Base64 input" vs "JSON input") that update when the active tab changes.
**Action:** When creating custom tab components with shared input/output fields, always use the ARIA tablist pattern and ensure that the shared interactive elements receive dynamically updated `aria-label`s based on the currently active tab context.
