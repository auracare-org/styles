# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit-based component library demonstrating SOLID principles with design tokens. Built with Svelte 5, TypeScript, and Tailwind CSS 4.

**Package Manager:** This project uses **Yarn**, not npm. All commands should use `yarn`.

**Deployment:** Configured for Vercel deployment via `@sveltejs/adapter-vercel`.

## Development Commands

### Core Development
- `yarn dev` - Start development server (http://localhost:5173)
- `yarn build` - Create production build
- `yarn preview` - Preview production build

### Code Quality
- `yarn check` - Run TypeScript type checking with svelte-check
- `yarn check:watch` - Watch mode for type checking
- `yarn format` - Format all files with Prettier
- `yarn lint` - Check formatting (Prettier in check mode)

### Testing
- `yarn test:unit` - Run Vitest unit tests
- `yarn test:e2e` - Run Playwright e2e tests
- `yarn test` - Run both unit and e2e tests

**Test Configuration:** The project uses a dual-mode Vitest setup:
- **Client tests** (`*.svelte.{test,spec}.{js,ts}`): Run in browser environment using Playwright
- **Server tests** (all other `*.{test,spec}.{js,ts}`): Run in Node environment

## Architecture and SOLID Principles

This codebase strictly follows SOLID principles. When modifying or extending:

### Design Token System (Dependency Inversion)
- All design tokens live in `src/lib/styles/tokens/` as CSS custom properties
- **Never hardcode colors or spacing values in components**
- Components depend on CSS variable abstractions (`var(--token-name)`)
- Token files follow Single Responsibility:
  - `colors.css` - Color tokens only
  - `spacing.css` - Spacing tokens only
  - `index.css` - Aggregates all token files

### Component Structure (Interface Segregation + Single Responsibility)
Each component follows this pattern:
```
ComponentName/
├── ComponentName.svelte  # Component implementation
├── types.ts              # TypeScript interfaces
└── index.ts              # Exports
```

**Critical:** Components use Svelte 5 syntax:
- `$props()` for props (not `export let`)
- `$derived()` for computed values
- `{@render children()}` for slot content (uses `Snippet` type)
- Props interfaces extend native HTML attributes (e.g., `HTMLButtonAttributes`)

### Styling Architecture (Open/Closed Principle)
- Component-specific styles in `src/lib/styles/components/`
- Components import their own CSS files
- All styles use BEM-like naming: `.component`, `.component--variant`, `.component--modifier`
- Styles reference design tokens, never literal values
- Global tokens imported in `src/app.css`

### Component Exports
- All components export through `src/lib/components/index.ts`
- `src/lib/index.ts` re-exports everything from components
- Import pattern: `import { Button, Surface } from '$lib'`

## Adding New Components

When creating new components, follow this checklist:

1. **Create directory structure** in `src/lib/components/ComponentName/`
2. **Create types file** (`types.ts`):
   - Define prop interfaces extending native HTML attributes
   - Use `Snippet` type for children
   - Include JSDoc comments with `@default` values
3. **Create Svelte component**:
   - Use Svelte 5 runes syntax (`$props()`, `$derived()`)
   - Import component-specific CSS
   - Use `{@render children()}` for slot content
4. **Create component styles** in `src/lib/styles/components/`:
   - Use CSS custom properties for all values
   - Follow BEM-like naming convention
   - Include variant and modifier classes
5. **Create index.ts** with exports
6. **Add exports** to `src/lib/components/index.ts`
7. **Validate with svelte-autofixer** (MCP tool available)

## Adding New Design Tokens

1. Add to appropriate file in `src/lib/styles/tokens/`
2. Use naming convention: `--prefix-category-subcategory-state`
   - Example: `--color-bg-button-primary-hover`
3. Document the token's purpose with CSS comments
4. Reference in component CSS using `var(--token-name)`

## Svelte 5 Specifics

This project uses Svelte 5. Key differences from Svelte 4:

- **Props:** Use `let { prop1, prop2 } = $props()` not `export let`
- **Derived state:** Use `$derived(expression)` not `$: value =`
- **Children:** Use `Snippet` type and `{@render children()}`
- **Component events:** Use callback props, not `createEventDispatcher`

## TypeScript Configuration

- Strict mode enabled
- `moduleResolution: "bundler"`
- Path alias `$lib` resolves to `src/lib`
- Generated types in `.svelte-kit/tsconfig.json` (extended by root config)

## Accessibility Requirements

- Interactive surfaces must use proper roles and tabindex
- Use conditional rendering for interactive elements to avoid a11y warnings:
  ```svelte
  {#if interactive}
    <div tabindex="0" role="button">...</div>
  {:else}
    <div>...</div>
  {/if}
  ```

## File Modification Guidelines

- **Always read files before editing** (Edit tool requires prior Read)
- Use **Edit tool for existing files**, not Write
- Component CSS imports are side-effect imports (no exports)
- All exports use `.js` extension in imports (TypeScript convention)
