# Component Library Demo

A SvelteKit-based component library demonstrating SOLID principles with design tokens.

## Overview

This project showcases a component library built with Svelte 5, following SOLID principles and utilizing design tokens for consistent styling across all components.

## Project Structure

```
src/
├── lib/
│   ├── styles/
│   │   ├── tokens/
│   │   │   ├── colors.css         # Color design tokens
│   │   │   ├── spacing.css        # Spacing design tokens
│   │   │   └── index.css          # Token aggregator
│   │   └── components/
│   │       ├── button.css         # Button component styles
│   │       └── surface.css        # Surface component styles
│   └── components/
│       ├── Button/
│       │   ├── Button.svelte      # Button component
│       │   ├── types.ts           # Button types
│       │   └── index.ts           # Button exports
│       ├── Surface/
│       │   ├── Surface.svelte     # Surface component
│       │   ├── types.ts           # Surface types
│       │   └── index.ts           # Surface exports
│       └── index.ts               # Component library exports
└── routes/
    └── +page.svelte               # Demo page
```

## SOLID Principles Applied

### Single Responsibility Principle (SRP)
- Each CSS file handles one category of design tokens (colors, spacing)
- Each component has a single, well-defined purpose (Button for actions, Surface for containers)
- TypeScript types are separated into dedicated files

### Open/Closed Principle (OCP)
- Components are open for extension through props and CSS variables
- No need to modify component code to change appearance
- Design tokens allow theme changes without touching component logic

### Liskov Substitution Principle (LSP)
- All component variants can be used interchangeably
- Button variants (primary, secondary) implement the same interface
- Surface variants maintain consistent behavior

### Interface Segregation Principle (ISP)
- Component interfaces contain only relevant properties
- No component is forced to depend on props it doesn't use
- Separate type definitions for each component

### Dependency Inversion Principle (DIP)
- Components depend on CSS variable abstractions, not concrete values
- No hard-coded colors or spacing values in components
- Easy to swap design systems by changing token values

## Design Tokens

Design tokens are defined as CSS custom properties in `src/lib/styles/tokens/`:

- **Colors**: Button backgrounds, text colors, borders, surfaces
- **Spacing**: Consistent spacing scale from `xxs` (4px) to `xxxl` (48px)

## Components

### Button Component

A flexible button component with multiple variants, sizes, and states.

**Props:**
- `variant`: `'primary' | 'secondary'` (default: `'primary'`)
- `size`: `'small' | 'medium' | 'large'` (default: `'medium'`)
- `disabled`: `boolean` (default: `false`)
- `fullWidth`: `boolean` (default: `false`)

**Usage:**
```svelte
<script>
  import { Button } from '$lib';
</script>

<Button variant="primary" size="medium">Click Me</Button>
<Button variant="secondary" disabled>Disabled</Button>
<Button variant="primary" fullWidth>Full Width</Button>
```

### Surface Component

A container component for creating cards, panels, and other surfaces.

**Props:**
- `variant`: `'default' | 'raised'` (default: `'default'`)
- `padding`: `'none' | 'small' | 'medium' | 'large'` (default: `'medium'`)
- `interactive`: `boolean` (default: `false`)

**Usage:**
```svelte
<script>
  import { Surface } from '$lib';
</script>

<Surface padding="large">
  <h2>Card Title</h2>
  <p>Card content</p>
</Surface>

<Surface variant="raised" interactive onclick={() => alert('Clicked!')}>
  <p>Interactive card</p>
</Surface>
```

## Getting Started

### Installation

```sh
# Install dependencies
yarn install
```

### Development

Start the development server:

```sh
yarn dev

# Open in browser
yarn dev --open
```

Visit http://localhost:5173 to view the component demo.

### Building

Create a production build:

```sh
yarn build
```

Preview the production build:

```sh
yarn preview
```

## Type Checking

Run TypeScript type checking:

```sh
yarn check
```

## Testing

Run unit tests:

```sh
yarn test:unit
```

Run end-to-end tests:

```sh
yarn test:e2e
```

## Extending the Library

### Adding New Components

1. Create a new directory in `src/lib/components/`
2. Create component file, types file, and index file
3. Add component-specific styles in `src/lib/styles/components/`
4. Export from `src/lib/components/index.ts`

### Adding New Design Tokens

1. Add tokens to appropriate file in `src/lib/styles/tokens/`
2. Use CSS custom properties format: `--prefix-category-name: value;`
3. Reference tokens in component styles using `var(--token-name)`

