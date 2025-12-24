# Copilot Instructions for AI Agents

Guide for GitHub Copilot, Claude, and other AI agents working on **grwm.dev** — a Domain-Driven Design React portfolio site.

## Quick Facts
- **Stack**: React 18 + TypeScript (strict) + Vite + TanStack Router + Zustand + Tailwind
- **Commands**: `npm run dev` (dev), `npm run test` (watch), `npm run build` (production), `npm run lint` (fix)
- **Testing**: Vitest + React Testing Library — **required** for all features
- **Before commit**: `npm run lint && npm run type-check && npm run test:run`

## Architecture: Domain-Driven Design

Code organized by **business domains**, not technical layers. Each domain is self-contained:

```
src/domains/{feature}/
├── index.ts                    # Public API exports
├── components/
│   ├── {Feature}Section.tsx   # Main component
│   └── {Feature}Section.test.tsx
└── data/
    ├── {feature}Data.ts       # Types + data constants
    └── {feature}Data.test.ts
```

**Current domains**: `hero`, `audience`, `services`, `process`, `about`, `cta`, `layout`

### Why This Matters

1. **Data is separate from components** — `HeroSection.tsx` imports from `heroContent.ts`
2. **Tests validate data structure AND rendering** — Test file imports data and verifies text appears
3. **Barrel exports** (`index.ts`) enable clean imports: `import { HeroSection } from '@/domains/hero'`
4. **Self-contained** — Each domain can be understood in isolation

## Component Patterns in Use

### Section Components
Wrap content with `<Section>` from `shared/components`:
```tsx
<Section title="Services">
  {servicesData.map(s => <ServiceCard key={s.id} {...s} />)}
</Section>
```

### Animated Lists
Use `<AnimatedList>` for staggered entrance effects:
```tsx
<AnimatedList items={data} renderItem={item => <ItemComponent {...item} />} />
```

### Lazy Loading
- Below-the-fold sections: `<LazySection><ExpensiveSection /></LazySection>` (viewport-triggered)
- Routes: `const Page = lazy(() => import('./pages/Page'))` + `<Suspense fallback={<ShimmerLoader />}>`

### Data-Driven Tests
```tsx
ABOUT_POINTS.forEach(point => {
  expect(screen.getByText(point.text)).toBeInTheDocument()
})
```

### Layout Flow
HomePage → HeroSection → AudienceSection → ServicesSection → ProcessSection → AboutSection → CTASection → Footer

Each section lazy-loads except Hero.

## Data + Types Convention (Critical)

**Every domain data file follows this pattern**:

```typescript
export interface DataType {
  id: string
  title: string
  // other fields
}

export const domainData: DataType[] = [
  { id: '1', title: 'Item', /* ... */ }
] as const  // ← CRITICAL: as const ensures literal types for tests

export const domainConfig = {
  heading: 'Heading text',
  subheading: 'Sub text'
} as const
```

**Why `as const`**: Enables exact text matching in tests without quotes. Tests can `expect(screen.getByText(DOMAIN_CONFIG.heading))` instead of hardcoding strings.

## State Management: Zustand Only

Global state goes in `src/shared/store/useAppStore.ts`:

```typescript
interface AppState {
  isLoading: boolean
  error: Error | null
  setLoading: (loading: boolean) => void
  setError: (error: Error | null) => void
  clearError: () => void
}
```

**Rule**: Do NOT introduce Context API or Redux without team discussion. Local component state stays in components.

## Routing: TanStack Router (Auto-Generated)

- Routes defined in `src/routes/` (file-based, like Next.js)
- **Router tree is auto-generated** in `src/routeTree.gen.ts` (never edit manually)
- After creating new route files, **restart dev server** to regenerate tree
- Type-safe: Router config in `src/router.tsx` with TypeScript module augmentation

## Testing Requirements

**All new code needs tests.** Pattern:

```typescript
import { render, screen } from '../../../test-utils/test-utils'
import { DOMAIN_DATA, DOMAIN_CONFIG } from '../data/domainData'
import { DomainComponent } from './DomainComponent'

describe('DomainComponent', () => {
  it('should render title', () => {
    render(<DomainComponent />)
    expect(screen.getByText(DOMAIN_CONFIG.title)).toBeInTheDocument()
  })

  it('should render all data items', () => {
    render(<DomainComponent />)
    DOMAIN_DATA.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })
})
```

**Key**: Always use `src/test-utils/test-utils.tsx`, not React Testing Library directly.

## Development Workflows

### Typical Flow
```bash
npm run dev            # Start Vite dev server (auto-reload on file change)
npm run type-check     # Check TypeScript before committing
npm run lint:check     # Check for lint violations
npm run test:run       # Run all tests once
```

### Critical Patterns
- **New domain?** Create `src/domains/{name}/` with component, data, index.ts
- **New route?** Create `src/routes/newroute.tsx`, then restart dev server
- **New test failing?** Check that data file has `as const`, test file imports from `test-utils`
- **TypeScript errors?** Use `npm run type-check` to validate (required before commit)

### Before Committing
```bash
npm run lint         # Auto-fixes format + lint
npm run type-check   # No TS errors allowed
npm run test:run     # All tests must pass
git add .
git commit -m "feat: description"
```

## Build Optimization (Why It Matters)

Vite chunks dependencies for better browser caching:
- `react-vendor` — React + ReactDOM
- `router-vendor` — TanStack Router
- `query-vendor` — TanStack Query
- `animation-vendor` — Framer Motion
- `state-vendor` — Zustand

When adding new major dependencies, consider adding them to `vite.config.ts` manualChunks if not included.

## Import Conventions (Non-Negotiable)

Always import from **barrel exports**:

```tsx
// ✅ Good
import { Button, Section } from '@/shared/components'
import { useScrollAnimation } from '@/shared/hooks'
import { HeroSection } from '@/domains/hero'
import { servicesData } from '@/domains/services'

// ❌ Bad
import { Button } from '@/shared/components/Button'
import { useScrollAnimation } from '@/shared/hooks/useScrollAnimation'
import { HeroSection } from '@/domains/hero/components/HeroSection'
```

Barrel export pattern:
```typescript
// src/shared/components/index.ts
export { Button } from './Button'
export { Section } from './Section'
export { AnimatedList } from './AnimatedList'
export type { ButtonProps } from './Button'
```

## TypeScript Non-Negotiables

1. **No `any`** — Use proper types or `unknown`
2. **Explicit return types** on all functions/hooks
3. **React.FC<Props>** pattern for components
4. **Discriminated unions** for complex state
5. **`as const`** on data objects (see Data Convention above)

Example:
```tsx
// ✅ Good
export const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
)

// ❌ Bad
export const Button = ({ label, onClick }: any) => (
  <button onClick={onClick}>{label}</button>
)
```

## Reusable Components (Check First Before Creating New Ones)

In `src/shared/components/`:
- `Button` — multiple variants
- `Section` — page section wrapper
- `AnimatedList` — staggered animations
- `AnimatedText` — scroll-triggered text animations
- `ErrorBoundary` — error containment
- `LazySection` — viewport-triggered lazy loading
- `LoadingSpinner` — loading state
- `ShimmerLoader` — skeleton screens
- `SEO` — meta tags + structured data

## Reusable Hooks (Check First)

In `src/shared/hooks/`:
- `useAnimationVariants()` — Framer Motion config
- `useScrollAnimation()` — Viewport visibility detection
- `useIntersectionObserver()` — Low-level visibility
- `useErrorHandler()` — Centralized error handling
- `usePrefetch()` — Route prefetch on hover

## Common Mistakes to Avoid

1. **Hardcoded text** → Move to data files (e.g., `servicesData.ts`)
2. **Missing tests** → Every feature needs `ComponentName.test.tsx`
3. **Direct React Testing Library** → Use `src/test-utils/test-utils.tsx` instead
4. **Mutating state** → Always: `[...arr]`, `{...obj}`, never `arr.push()`
5. **Prop drilling** → Use Zustand store instead
6. **Route files without restart** → Dev server won't see new routes until restart
7. **Data without `as const`** → Tests won't match exact text strings
8. **TS strict mode errors** → `npm run type-check` must pass; no exceptions
9. **Forgetting test file** → Every component needs a `.test.tsx` file
10. **Using Context/Redux** → Use Zustand for global state only

## Testing Gotchas

- **Import data in tests** → `import { DOMAIN_DATA } from '../data/domainData'`
- **Use test-utils** → `import { render, screen } from '@/test-utils/test-utils'`
- **as const critical** → Data file without `as const` breaks exact text matching in tests
- **Mock animations** → Framer Motion animations are mocked in tests

## Performance Considerations

- **Lazy load below the fold** — Use `LazySection` or `React.lazy()`
- **Code split by domain** — Each domain is tree-shakeable
- **Memoize selectively** — Only for expensive component renders
- **Framer Motion optimized** — Don't re-implement animations with CSS

## Summary

This codebase prioritizes:
- ✅ **Type safety** — No `any`, strict TypeScript
- ✅ **Separation of concerns** — Data separate from components
- ✅ **Testing** — Every feature has tests
- ✅ **Reusability** — DDD domains + shared components/hooks
- ✅ **Performance** — Code splitting, lazy loading, optimization-ready
- ✅ **Maintainability** — Clear patterns, consistent structure

When in doubt: **Check existing code in the same domain**, follow the pattern, write tests, run `npm run type-check && npm run lint && npm run test:run`.
