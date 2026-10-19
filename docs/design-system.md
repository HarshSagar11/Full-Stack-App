# Design system

The frontend uses **design tokens**: named colors and sizes defined once in `frontend/src/styles/globals.css`, with a light and a dark value for each. Components never use raw colors. They use the tokens through Tailwind classes, so the whole app changes theme consistently.

## Rule

> Use token classes (`bg-surface`, `text-muted-foreground`, `border-border`). Never use raw palette classes (`bg-zinc-900`, `text-indigo-600`) or hex values in components.

If a design needs a color that no token covers, add a token to `globals.css` (both themes) and document it here, instead of hard-coding the color.

## Color tokens

Neutral **zinc** grays with an **indigo** accent. Values are OKLCH colors from Tailwind's palettes.

| Token | Use it for | Light | Dark |
|---|---|---|---|
| `background` | Page background | zinc-50 | zinc-950 |
| `foreground` | Main text | zinc-950 | zinc-50 |
| `surface` | Cards, panels, dialogs, menus | white | zinc-900 |
| `surface-foreground` | Text on surfaces | zinc-950 | zinc-50 |
| `muted` | Subtle backgrounds, hover states | zinc-100 | zinc-800 |
| `muted-foreground` | Secondary text, hints, placeholders | zinc-500 | zinc-400 |
| `border` | Borders and dividers (default border color) | zinc-200 | zinc-800 |
| `input` | Form field borders | zinc-200 | zinc-800 |
| `ring` | Keyboard focus outline | indigo-500 | indigo-400 |
| `primary` | Main buttons, links, key highlights | indigo-600 | indigo-400 |
| `primary-foreground` | Text on `primary` | white | zinc-950 |
| `secondary` | Secondary buttons | zinc-100 | zinc-800 |
| `secondary-foreground` | Text on `secondary` | zinc-900 | zinc-50 |
| `destructive` | Errors, delete actions | red-600 | red-400 |
| `destructive-foreground` | Text on `destructive` | white | zinc-950 |
| `success` | Success messages | green-700 | green-400 |

Each token works with any Tailwind color utility: `bg-primary`, `text-primary`, `border-primary`, `ring-primary`, and with opacity modifiers like `hover:bg-primary/90`.

In dark mode, `primary` and `destructive` use lighter shades with dark text. This keeps both "text on a button" and "colored text on a dark card" readable.

### Accessibility

All text and background pairs meet **WCAG 2.2 AA** contrast (at least 4.5:1 for text, 3:1 for the focus ring) in both themes, for example `muted-foreground` on `surface` is 4.83:1 (light) and 6.74:1 (dark), and `primary-foreground` on `primary` is 6.44:1 and 6.38:1. Re-check contrast whenever a token value changes.

## Radius tokens

| Class | Value |
|---|---|
| `rounded-sm` | `--radius` − 4px |
| `rounded-md` | `--radius` − 2px (buttons, inputs) |
| `rounded-lg` | `--radius` = 0.625rem / 10px |
| `rounded-xl` | `--radius` + 4px (cards) |

## Usage examples

**Card**

```tsx
<div className="rounded-xl border border-border bg-surface p-6 text-surface-foreground shadow-sm">
  <h2 className="text-lg font-semibold">Title</h2>
  <p className="text-sm text-muted-foreground">Description</p>
</div>
```

**Buttons**

```tsx
// primary
<button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
  Save
</button>

// secondary
<button className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80">
  Cancel
</button>

// outline
<button className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
  More
</button>

// destructive
<button className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
  Delete
</button>
```

**Form field**

```tsx
<label htmlFor="email" className="text-sm font-medium">Email</label>
<input
  id="email"
  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
/>
<p className="text-sm text-destructive">Please enter a valid email address.</p>
```

These class strings will move into reusable `Button`, `Card`, and `Input` components so pages do not repeat them.

## How dark mode works

1. **Tokens per theme.** `:root` holds the light values and `.dark` overrides them. Because components only reference tokens, adding the `.dark` class to `<html>` switches the entire app.
2. **Class-based `dark:` variant.** `@custom-variant dark (&:where(.dark, .dark *));` makes Tailwind's `dark:` prefix follow the `.dark` class instead of only the OS setting, so users can override their system theme.
3. **No flash on load.** An inline script in `frontend/index.html` runs before the page is painted. It reads `localStorage.theme` (`"light"`, `"dark"`, or `"system"`/missing) and adds `.dark` to `<html>` when needed. Without it, dark-mode users would briefly see a white page on every load.
4. **Native controls.** `color-scheme: light` / `dark` makes scrollbars and built-in form controls match the theme.

The theme switcher in the UI (light / dark / system) writes the same `localStorage.theme` key, so the inline script and the React app always agree.

## Files

| File | Purpose |
|---|---|
| `frontend/src/styles/globals.css` | Tokens for both themes, Tailwind theme mapping, base styles |
| `frontend/index.html` | Inline script that applies the saved theme before first paint |
| `frontend/vite.config.ts` | Registers the Tailwind Vite plugin |
