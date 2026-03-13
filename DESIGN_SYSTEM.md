# Design System - Mustafa McLinn DevOps Resume

## Typography System

### Font Stack
- **Display/Headings**: `'Inter', 'Segoe UI', system-ui, sans-serif` (Modern, clean)
- **Body/UI**: `'Inter', 'Segoe UI', system-ui, sans-serif` (Consistent, readable)
- **Code/Terminal**: `'Fira Code', 'Courier New', monospace` (Technical aesthetic)

### Type Scale

#### Display (H1)
- **Font Size**: 48px
- **Font Weight**: 700 (Bold)
- **Line Height**: 1.2
- **Letter Spacing**: -0.02em
- **Color**: #38bdf8 (Primary Blue)
- **Use Case**: Main page title, hero section

#### Heading 1 (H2)
- **Font Size**: 32px
- **Font Weight**: 600 (Semibold)
- **Line Height**: 1.3
- **Letter Spacing**: -0.01em
- **Color**: #38bdf8 (Primary Blue)
- **Use Case**: Section headers, major divisions

#### Heading 2 (H3)
- **Font Size**: 24px
- **Font Weight**: 600 (Semibold)
- **Line Height**: 1.4
- **Letter Spacing**: 0em
- **Color**: #38bdf8 (Primary Blue)
- **Use Case**: Subsection headers, feature titles

#### Heading 3 (H4)
- **Font Size**: 18px
- **Font Weight**: 500 (Medium)
- **Line Height**: 1.5
- **Letter Spacing**: 0em
- **Color**: #10b981 (Secondary Green)
- **Use Case**: Component titles, emphasis

#### Body Large
- **Font Size**: 16px
- **Font Weight**: 400 (Regular)
- **Line Height**: 1.6
- **Letter Spacing**: 0em
- **Color**: #e2e8f0 (Light Gray)
- **Use Case**: Main body text, descriptions

#### Body Regular
- **Font Size**: 14px
- **Font Weight**: 400 (Regular)
- **Line Height**: 1.6
- **Letter Spacing**: 0em
- **Color**: #cbd5e1 (Medium Gray)
- **Use Case**: Secondary text, captions

#### Body Small
- **Font Size**: 12px
- **Font Weight**: 400 (Regular)
- **Line Height**: 1.5
- **Letter Spacing**: 0.02em
- **Color**: #94a3b8 (Muted Gray)
- **Use Case**: Labels, metadata, tags

#### Code/Terminal
- **Font Size**: 13px
- **Font Weight**: 400 (Regular)
- **Line Height**: 1.6
- **Letter Spacing**: 0em
- **Color**: #38bdf8 (Primary Blue)
- **Use Case**: Code blocks, terminal text

### Font Weights
- **300**: Light (not used in this system)
- **400**: Regular (body text, default)
- **500**: Medium (emphasis, UI elements)
- **600**: Semibold (headings, strong emphasis)
- **700**: Bold (display, strong headings)

---

## Color System

### Primary Colors
- **Primary Blue**: #38bdf8 (Headings, links, accents)
- **Primary Blue (Hover)**: #0ea5e9 (Interactive states)
- **Primary Blue (Dark)**: #0284c7 (Active states)

### Secondary Colors
- **Secondary Green**: #10b981 (Emphasis, success)
- **Secondary Green (Hover)**: #059669 (Interactive states)
- **Accent Amber**: #f59e0b (Warnings, highlights)
- **Accent Purple**: #8b5cf6 (Special features)

### Neutral Colors
- **Background**: #000000 (Pure black)
- **Surface**: #0f172a (Very dark blue)
- **Surface Light**: #1e293b (Dark blue)
- **Text Primary**: #e2e8f0 (Light gray)
- **Text Secondary**: #cbd5e1 (Medium gray)
- **Text Muted**: #94a3b8 (Muted gray)
- **Border**: rgba(56, 189, 248, 0.2) (Blue with transparency)

---

## Spacing System

### Base Unit: 4px

- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 12px (0.75rem)
- **lg**: 16px (1rem)
- **xl**: 20px (1.25rem)
- **2xl**: 24px (1.5rem)
- **3xl**: 32px (2rem)
- **4xl**: 40px (2.5rem)
- **5xl**: 48px (3rem)

---

## Component Styles

### Buttons
- **Padding**: 12px 24px (md lg)
- **Border Radius**: 6px
- **Font Size**: 14px
- **Font Weight**: 500
- **Transition**: 200ms ease-in-out

### Tags/Badges
- **Padding**: 6px 12px (sm md)
- **Border Radius**: 4px
- **Font Size**: 12px
- **Font Weight**: 400
- **Border**: 1px solid (color-specific)

### Cards
- **Padding**: 24px (2xl)
- **Border Radius**: 8px
- **Border**: 1px solid rgba(56, 189, 248, 0.2)
- **Background**: rgba(15, 23, 42, 0.5)

### Inputs
- **Padding**: 10px 12px (md)
- **Border Radius**: 6px
- **Font Size**: 14px
- **Border**: 1px solid rgba(56, 189, 248, 0.3)

---

## Layout System

### Container Widths
- **Mobile**: 100% (0-640px)
- **Tablet**: 640px (640px-1024px)
- **Desktop**: 1024px (1024px+)

### Breakpoints
- **sm**: 640px
- **md**: 1024px
- **lg**: 1280px
- **xl**: 1536px

### Grid
- **Columns**: 12 columns
- **Gap**: 16px (lg)
- **Margin**: 20px (xl) on sides

---

## Visual Effects

### Shadows
- **sm**: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- **md**: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- **lg**: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- **xl**: 0 20px 25px -5px rgba(0, 0, 0, 0.1)

### Borders
- **Thin**: 1px
- **Medium**: 2px
- **Thick**: 3px

### Border Radius
- **sm**: 4px
- **md**: 6px
- **lg**: 8px
- **xl**: 12px
- **full**: 9999px

### Animations
- **Fast**: 150ms
- **Base**: 200ms
- **Slow**: 300ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)

---

## Accessibility

### Color Contrast
- **WCAG AA**: Minimum 4.5:1 for text
- **WCAG AAA**: Minimum 7:1 for text
- All primary colors meet WCAG AAA standards

### Typography
- **Minimum Font Size**: 12px (for body text)
- **Line Height**: Minimum 1.5 for body text
- **Letter Spacing**: Appropriate for readability

### Interactive Elements
- **Focus States**: Visible outline with 2px border
- **Hover States**: Color change or opacity shift
- **Active States**: Darker color or shadow change

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #38bdf8;
  --color-primary-hover: #0ea5e9;
  --color-primary-dark: #0284c7;
  --color-secondary: #10b981;
  --color-accent-amber: #f59e0b;
  --color-accent-purple: #8b5cf6;
  
  --color-bg: #000000;
  --color-surface: #0f172a;
  --color-surface-light: #1e293b;
  --color-text-primary: #e2e8f0;
  --color-text-secondary: #cbd5e1;
  --color-text-muted: #94a3b8;
  --color-border: rgba(56, 189, 248, 0.2);
  
  /* Typography */
  --font-display: 'Inter', 'Segoe UI', system-ui, sans-serif;
  --font-body: 'Inter', 'Segoe UI', system-ui, sans-serif;
  --font-code: 'Fira Code', 'Courier New', monospace;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 20px;
  --space-2xl: 24px;
  --space-3xl: 32px;
  --space-4xl: 40px;
  --space-5xl: 48px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Image Specifications

### Hero Image (Moose as a Service)
- **Dimensions**: 1200px × 600px
- **Format**: PNG or SVG
- **Background**: Dark gradient (black to dark blue)
- **Content**: Moose illustration with DevOps theme
- **Style**: Modern, minimalist, tech-forward

### Banner Image (DevOps Resume Banner)
- **Dimensions**: 1200px × 300px
- **Format**: SVG
- **Background**: Dark with grid pattern
- **Content**: DevOps tool icons (Docker, Kubernetes, Terraform, etc.)
- **Style**: Terminal aesthetic with neon accents

### Logo Image (DevOps Resume Logo)
- **Dimensions**: 400px × 400px
- **Format**: SVG
- **Background**: Transparent or dark
- **Content**: Terminal window with DevOps symbols
- **Style**: Minimalist, scalable, professional

### Feature Icons
- **Dimensions**: 64px × 64px
- **Format**: SVG
- **Style**: Outline or filled, consistent stroke width
- **Colors**: Primary blue (#38bdf8) or secondary green (#10b981)

---

## Implementation Guidelines

### HTML/CSS
1. Use semantic HTML elements (h1, h2, h3, p, etc.)
2. Apply typography classes or inline styles consistently
3. Use CSS variables for colors and spacing
4. Maintain 1.5+ line height for body text
5. Ensure minimum 12px font size for all text

### React Components
1. Create typography components (Display, Heading, Body, etc.)
2. Use design tokens for all styling
3. Implement proper heading hierarchy
4. Add ARIA labels for accessibility
5. Test with screen readers

### Markdown
1. Use proper heading hierarchy (h1 → h2 → h3)
2. Apply consistent styling to headings
3. Use semantic emphasis (strong, em)
4. Maintain readable line lengths
5. Include alt text for all images

---

## References

- **Font**: Inter (Google Fonts)
- **Code Font**: Fira Code (Google Fonts)
- **Color Palette**: Tailwind CSS extended palette
- **Spacing**: 4px base unit system
- **Accessibility**: WCAG 2.1 Level AA+
