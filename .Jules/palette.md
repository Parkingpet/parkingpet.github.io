## 2024-03-04 - Static Site Accessibility and Intra-page Navigation
**Learning:** Single-page static sites need explicit CSS for smooth scrolling (`scroll-behavior: smooth`) to give spatial context during internal anchor link navigation. Additionally, they often lack a build tool to inject accessibility polyfills, making manual `:focus-visible` styles critical for keyboard users navigating through anchor links.
**Action:** When working on purely static single-page sites, explicitly check for and add `scroll-behavior: smooth` to the HTML root and custom `:focus-visible` styles to interactive elements like `<a>` tags.

## 2026-03-04 - Semantic Contact Links
**Learning:** Making phone numbers into interactive links with the `tel:` protocol is highly valuable for mobile users, turning static text into actionable, click-to-call items. Including an `aria-label` further clarifies the intent for screen readers (e.g., "Call [number]" instead of just reading the number).
**Action:** Always wrap phone numbers in an anchor tag with a `tel:` href and an appropriate `aria-label` when displaying contact information.
