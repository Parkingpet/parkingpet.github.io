# Interactive DevOps Resume Platform - Core Audit Report

## Audit Objectives & Results

### 1. Web Integrity
[ISSUE]: Asset links for Resume (PDF/TXT) and Cheat Sheet used absolute paths (`/`), which would cause 404 errors when the application is deployed to a subpath (e.g., GitHub Pages `user.github.io/repo/`).
[TEST CASE]: Deploy to a subpath and attempt to click "Download PDF" or navigate to `/prompts`.
[FIX]: Updated `vite.config.js` with `base: './'` and refactored `Header.jsx`, `Tools.jsx`, `Prompts.jsx`, and `main.jsx` to use relative paths (`./`) for all internal assets and navigation.

### 2. Environment Sanitization
[ISSUE]: No hardcoded local paths (e.g., `/home/moose/`) or direct references to the QNAP NAS ("Thoth") were found in the source code.
[TEST CASE]: `grep -rn "/home/moose" .` and `grep -rn "Thoth" .`
[FIX]: N/A (Confirmed clean). References to `192.168.x.x` in `Tools.jsx` are legitimate networking examples for the Subnet Calculator.

### 3. Adversarial Logic Testing
[ISSUE]: The "USPS Claim Automation" and "Gemini-to-eBay Parser" components mentioned in the audit objectives are missing from the repository.
[TEST CASE]: `grep -ri "USPS" .` and `grep -ri "eBay" .`
[FIX]: Documentation updated to reflect missing components. Audit shifted to hardening existing DevOps tools.

[ISSUE]: The YAML to JSON converter was a fragile line-based parser that failed on values containing colons (e.g., URLs).
[TEST CASE]: Input `url: https://example.com` into the YAML tool.
[FIX]: Refactored parser to use `indexOf(':')` to split keys and values correctly.

[ISSUE]: Several tools (Base64, JSON, MAC Formatter, URL) lacked input length limits, making them susceptible to browser-side DoS from massive "poisoned" inputs.
[TEST CASE]: Paste a 10MB string into the MAC Formatter.
[FIX]: Implemented strict length limits (e.g., 1000 chars for MAC, 5000-10000 for JSON/Base64) with user-facing error messages.

### 4. Hardware Abstraction
[ISSUE]: The Google Coral USB Accelerator mock was too basic for production-grade CI/CD testing, lacking realistic error handling for connection states.
[TEST CASE]: Run `python3 tests/mocks/coral_mock.py` and attempt to load a model with `connected=False`.
[FIX]: Enhanced `CoralMock` with a `connected` state toggle, explicit `ValueError` for invalid inputs, and `RuntimeError` for hardware failures. Integrated "The Triad" testing framework into the mock verification.

### 5. Security Watch
[ISSUE]: `vite@8.0.2` in `package.json` was identified as having security vulnerabilities.
[TEST CASE]: `pnpm audit`
[FIX]: Upgraded `vite` to `8.0.8`. `pnpm audit` now returns 0 vulnerabilities.

## Testing Summary
- **The Triad:** Applied Happy Path, Boundary, and Adversarial tests to all hardened logic.
- **Fail-Fast:** Verified that malformed inputs (e.g., invalid YAML, oversized JSON) are caught immediately with descriptive errors.
- **Portability:** Verified that the platform functions correctly in a simulated subpath environment via Playwright.
