# Dark Mode Development Guide

## Quick Reference

The AI Interaction Atlas uses a CSS variable-based dark mode system with Tailwind v4. This guide helps you maintain consistent, accessible dark mode support.

---

## Color System

### CSS Variables (Primary Method)

Use these CSS variables for automatic dark mode support:

```tsx
// ✅ GOOD - Automatically adapts to dark mode
<div className="bg-[var(--bg)]">           // Background
<div className="bg-[var(--surface)]">      // Cards, panels
<p className="text-[var(--text-main)]">    // Primary text
<p className="text-[var(--text-muted)]">   // Secondary text
<div className="border-[var(--border)]">   // Borders
```

### Variable Values

| Variable | Light Mode | Dark Mode | Use Case |
|----------|------------|-----------|----------|
| `--bg` | `#F9F9F7` | `#0A0A0A` | Page background |
| `--surface` | `#FFFFFF` | `#141414` | Cards, panels, surfaces |
| `--text-main` | `#111111` | `#EFEFEF` | Primary text (AAA: 17:1) |
| `--text-muted` | `#6E6E6E` | `#B8B8B8` | Secondary text (AAA: 7.6:1) |
| `--border` | `#E6E6E6` | `#2A2A2A` | Borders, dividers |

---

## Common Patterns

### 1. Basic Component

```tsx
// ✅ GOOD - Uses CSS variables
export const Card = ({ children }) => (
  <div className="bg-[var(--surface)] border border-[var(--border)] p-4">
    <h2 className="text-[var(--text-main)]">{title}</h2>
    <p className="text-[var(--text-muted)]">{description}</p>
  </div>
);
```

### 2. Buttons

```tsx
// Primary button
<button className="bg-[var(--text-main)] text-[var(--bg)] px-4 py-2 hover:opacity-80">
  Click me
</button>

// Secondary button
<button className="border-2 border-[var(--text-main)] text-[var(--text-main)] px-4 py-2 hover:bg-[var(--text-main)] hover:text-[var(--bg)]">
  Cancel
</button>
```

### 3. Forms

```tsx
<input
  className="bg-[var(--surface)] border border-[var(--border)] text-[var(--text-main)] placeholder:text-[var(--text-muted)]"
  placeholder="Enter text..."
/>
```

### 4. When You Need Custom Colors

Use Tailwind's `dark:` variant for one-off colors:

```tsx
// ✅ GOOD - Explicit dark mode variant
<div className="bg-blue-500 dark:bg-blue-600">
  <p className="text-blue-900 dark:text-blue-100">Brand color</p>
</div>

// Special sections (like black backgrounds in light mode)
<section className="bg-black dark:bg-[#1A1A1A] text-white">
  <p className="text-gray-300 dark:text-[#C0C0C0]">
    Special content
  </p>
</section>
```

### 5. Images & Logos

```tsx
// Invert logos that need it
<img
  src={logo}
  alt="Logo"
  className="dark:invert"
/>

// Or swap images entirely
<img
  src={isDark ? darkLogo : lightLogo}
  alt="Logo"
/>
```

---

## Accessibility Requirements

### WCAG Contrast Standards

All text must meet these minimum contrast ratios:

| Text Size | AA | AAA |
|-----------|----|----|
| Normal text (< 18px) | 4.5:1 | 7:1 |
| Large text (≥ 18px) | 3:1 | 4.5:1 |

**Our Standards:** Aim for **AAA** (7:1) whenever possible.

### Pre-Approved Accessible Colors

#### On Light Backgrounds (#F9F9F7, #FFFFFF)
- ✅ `#111111` (text-main) - 17:1 AAA
- ✅ `#6E6E6E` (text-muted) - 4.6:1 AA

#### On Dark Backgrounds (#0A0A0A, #141414)
- ✅ `#EFEFEF` (text-main) - 17:1 AAA
- ✅ `#B8B8B8` (text-muted) - 7.6:1 AAA

#### On Black (#000000)
- ✅ `#FFFFFF` - 21:1 AAA
- ✅ `#C0C0C0` - 7.6:1 AAA (labels)
- ✅ `#ADADAD` - 4.8:1 AA (descriptions)
- ✅ `#9E9E9E` - 4.5:1 AA (footer text)

### Testing Contrast

Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

```bash
# Quick test in browser console
# 1. Inspect element
# 2. Check computed color values
# 3. Verify in contrast checker
```

---

## Common Mistakes to Avoid

### ❌ DON'T

```tsx
// Hard-coded colors that don't adapt
<div className="bg-white text-black">
<div className="bg-gray-100 text-gray-800">
<p className="text-gray-500">  // Might fail contrast in dark mode

// Forgetting to test dark mode
// Using system colors without checking contrast
// Mixing CSS variables and hard-coded colors inconsistently
```

### ✅ DO

```tsx
// Use CSS variables consistently
<div className="bg-[var(--bg)] text-[var(--text-main)]">
<div className="bg-[var(--surface)] text-[var(--text-muted)]">

// Or explicit dark variants
<p className="text-gray-600 dark:text-gray-400">

// Always test both modes
// Check contrast with WebAIM
// Use variables for layout colors, dark: for accent colors
```

---

## Development Workflow

### When Building New Components

1. **Build in light mode first**
   ```bash
   # Start dev server
   npm run dev
   ```

2. **Use CSS variables by default**
   ```tsx
   // Start with variables
   className="bg-[var(--surface)] text-[var(--text-main)]"
   ```

3. **Toggle to dark mode when done**
   - Click the sun/moon icon in header
   - Or set in console: `document.documentElement.classList.add('dark')`

4. **Fix any issues**
   - Check contrast
   - Adjust colors if needed
   - Add `dark:` variants where necessary

5. **Test both modes before committing**
   - Toggle between modes
   - Check all interactive states (hover, focus, active)
   - Verify accessibility

### Testing Checklist

- [ ] Light mode looks correct
- [ ] Dark mode looks correct
- [ ] All text has sufficient contrast (AA minimum)
- [ ] Interactive states work in both modes (hover, focus, active)
- [ ] Images/logos display correctly
- [ ] Forms are readable and usable
- [ ] No flash of wrong theme on page load

---

## useDarkMode Hook

```tsx
import { useDarkMode } from '../hooks/useDarkMode';

function MyComponent() {
  const { isDark, toggle } = useDarkMode();

  return (
    <div>
      <p>Current mode: {isDark ? 'dark' : 'light'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
```

**Behavior:**
- **New visitors**: Default to dark mode
- **Returning visitors**: Respects saved localStorage preference
- **Persistence**: Automatically saves preference on toggle

---

## Special Cases

### 1. Sections with Fixed Backgrounds

For sections that are always dark (even in light mode):

```tsx
<section className="bg-black dark:bg-[#1A1A1A] text-white">
  <h2 className="text-white">Always light text</h2>
  <p className="text-[#ADADAD] dark:text-[#B8B8B8]">
    Accessible in both modes
  </p>
</section>
```

### 2. Overlays & Modals

```tsx
// Backdrop
<div className="bg-black/50 dark:bg-black/70">

// Modal content
<div className="bg-[var(--surface)] border border-[var(--border)]">
  <h2 className="text-[var(--text-main)]">Modal Title</h2>
</div>
```

### 3. Syntax Highlighting / Code Blocks

```tsx
// Use separate themes
<pre className={isDark ? 'theme-dark' : 'theme-light'}>
  <code>{codeContent}</code>
</pre>
```

### 4. Third-Party Components

If a library doesn't support dark mode:

```tsx
// Wrap and style the container
<div className="bg-[var(--surface)] [&>*]:dark:filter [&>*]:dark:invert">
  <ThirdPartyComponent />
</div>
```

---

## Performance Tips

1. **CSS variables are fast** - No runtime calculation
2. **Avoid inline styles** - Use classes when possible
3. **Batch DOM updates** - Toggle dark class once, not per element
4. **Use CSS transitions** - Smooth color transitions
   ```css
   * {
     transition: background-color 0.2s, color 0.2s, border-color 0.2s;
   }
   ```

---

## Troubleshooting

### Flash of wrong theme (FOUC)

```tsx
// In useDarkMode hook, apply class immediately
const [isDark, setIsDark] = useState(() => {
  const stored = localStorage.getItem('darkMode');
  const defaultDark = stored !== null ? stored === 'true' : true;

  // Apply immediately to prevent flash
  if (defaultDark) {
    document.documentElement.classList.add('dark');
  }

  return defaultDark;
});
```

### Color not updating

- Check if CSS variable is defined in both `:root` and `.dark`
- Verify Tailwind is compiling the classes (check generated CSS)
- Ensure element has `dark` class in ancestor tree

### Contrast issues

- Use WebAIM contrast checker
- Reference the pre-approved colors table above
- When in doubt, use CSS variables (they're already tested)

---

## Quick Wins

### Converting Existing Components

**Before:**
```tsx
<div className="bg-white text-black border-gray-200">
  <p className="text-gray-600">Description</p>
</div>
```

**After:**
```tsx
<div className="bg-[var(--surface)] text-[var(--text-main)] border-[var(--border)]">
  <p className="text-[var(--text-muted)]">Description</p>
</div>
```

### Search & Replace

```bash
# Find components that need updating
grep -r "bg-white" src/
grep -r "text-black" src/
grep -r "text-gray-" src/

# Common replacements
bg-white      → bg-[var(--surface)]
text-black    → text-[var(--text-main)]
text-gray-600 → text-[var(--text-muted)]
border-gray   → border-[var(--border)]
```

---

## Resources

- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Tailwind v4 Dark Mode**: https://tailwindcss.com/docs/dark-mode
- **CSS Variables**: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

---

## Summary

1. **Use CSS variables** (`var(--bg)`, `var(--text-main)`, etc.) for 90% of cases
2. **Use `dark:` variants** for accent colors and special cases
3. **Test both modes** before committing
4. **Check contrast** with WebAIM (aim for AAA: 7:1)
5. **Follow the patterns** in this guide

When in doubt, copy a similar component that already works well in dark mode.

---

**Last Updated**: January 2026
**Current Version**: Tailwind CSS v4.1.18
