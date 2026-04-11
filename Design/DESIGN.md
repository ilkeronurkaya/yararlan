# Design System Document: The Utility Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**

This design system is a rejection of the "over-designed" web. It moves beyond the clutter of modern SaaS to find its soul in the intersection of high-end editorial layouts and the raw utility of early digital directories. 

To achieve a "High-End Editorial" feel, we break the standard template look by prioritizing **intentional asymmetry** and **tonal depth**. Rather than using boxes and lines to organize information, we use mathematical white space and shifting surface weights. The goal is an interface that feels like a well-typeset architectural journal—authoritative, quiet, and profoundly functional.

---

## 2. Colors & Surface Logic
The palette is a sophisticated range of cool grays and muted slates. It is designed to be invisible, allowing the content to lead.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` (#f1f4f6) section should sit directly against a `surface` (#f8f9fa) background to create a "edge" without a line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of heavy-weight cotton paper. 
- **Base Layer:** `surface` (#f8f9fa)
- **Secondary Sections:** `surface-container-low` (#f1f4f6)
- **Interactive Elements:** `surface-container-lowest` (#ffffff)
- **High-Focus Elements:** `surface-container-highest` (#dbe4e7)

### Signature Textures & Glass
While the aesthetic is minimalist, we avoid "flatness" through environmental depth. 
- **Glassmorphism:** For floating menus or navigation bars, use `surface` at 80% opacity with a `24px` backdrop blur. 
- **Subtle Gradients:** To provide a "soul" to the primary CTAs, use a nearly imperceptible linear gradient from `primary` (#575e70) to `primary_dim` (#4b5264). This adds a tactile, premium weight that flat hex codes lack.

---

## 3. Typography
The system uses **Inter** as its sole typeface. The luxury of the brand is expressed through the extreme contrast between `display` scales and `body` scales.

*   **Display (lg/md/sm):** Use `display-lg` (3.5rem) for hero statements. Tighten letter-spacing by `-0.02em` to give it an editorial, "ink-on-paper" density.
*   **Headlines & Titles:** Use these to anchor the eye. `headline-lg` (2rem) should always be paired with generous top-padding to let the typography breathe.
*   **Body & Labels:** `body-md` (0.875rem) is the workhorse. Maintain a line-height of `1.6` for maximum readability, mimicking the legibility of classic newsprint.
*   **Hierarchy Note:** All-caps should be reserved strictly for `label-sm` with a `0.05em` letter-spacing, used for metadata or category tags.

---

## 4. Elevation & Depth
We eschew traditional "material" shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking" tokens. Place a `surface-container-lowest` card (Pure White) on a `surface-container-low` (Pale Gray) background. This creates a soft, natural lift that feels architectural rather than digital.
*   **Ambient Shadows:** If a floating effect is required (e.g., a modal), use a shadow with a `48px` blur and `4%` opacity, using the `on-surface` color (#2b3437) as the tint.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` (#abb3b7) at **15% opacity**. A 100% opaque border is considered a design failure in this system.

---

## 5. Components

### Buttons
*   **Primary:** Background: `primary` (#575e70); Text: `on-primary` (#f7f7ff). Radius: `md` (0.375rem). No shadow.
*   **Secondary:** Background: `surface-container-high` (#e2e9ec); Text: `on-surface` (#2b3437).
*   **Tertiary:** Text-only, using `primary` for the label. On hover, apply a `surface-container-low` background.

### Input Fields
*   **Structure:** No background color. Only a "Ghost Border" bottom-edge or a subtle `surface-container-low` fill. 
*   **States:** On focus, transition the background to `surface-container-lowest` and darken the label color.

### Cards & Lists
*   **The Divider Ban:** Strictly forbid the use of horizontal lines to separate list items. Use `24px` of vertical white space or a subtle hover state shift to `surface-container-low`.
*   **Editorial Cards:** Use `surface-container-lowest` for the card body, with no border and no shadow. The "lift" is purely tonal.

### Contextual Components
*   **The Directory Grid:** For Yararlan’s core utility, use an asymmetric grid where the first item in a list takes up 66% of the width, and subsequent items fall into a 33% rhythm. This breaks the "Craigslist" monotony with editorial intent.

---

## 6. Do’s and Don'ts

### Do
*   **Do** use asymmetrical margins. If the left margin is `4rem`, try a right margin of `8rem` to create a dynamic, modern-art feel.
*   **Do** embrace the "Empty State." An empty screen with one perfectly typeset line of `display-sm` text is more powerful than a filled screen.
*   **Do** use `primary_fixed_dim` (#ced4e9) for subtle highlights in information-heavy tables.

### Don't
*   **Don't** use pure black (#000000) for text. Only use `on-surface` (#2b3437).
*   **Don't** use "Alert Red" for errors unless critical. Use `error` (#9f403d) which is desaturated and fits the neutral palette.
*   **Don't** use icons as primary navigation. The system is typography-first; words should almost always replace icons.
*   **Don't** use standard 12-column grids. Use a "Baseline Grid" where all elements align to the vertical rhythm of the typography.