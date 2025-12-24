# Copilot Instructions for AI Agents

Guide for GitHub Copilot, Claude, and other AI agents working on **grwm.dev** — a Domain-Driven Design React portfolio site.

## Quick Facts
- **Stack**: React 18 + TypeScript (strict) + Vite + TanStack Router + Zustand + Tailwind
- **Commands**: `npm run dev` (dev server), `npm run test` (run tests), `npm run build` (production)
- **Testing**: Vitest with React Testing Library — tests are **required** for all features
- **Linting**: `npm run lint` auto-fixes with Standard JS + TS Standard

## Architecture: Domain-Driven Design

The codebase is organized by **business domains**, not technical layers. Each domain is self-contained:

```
src/domains/{feature}/
├── index.ts                    # Public API exports
├── components/
│   ├── {Feature}Section.tsx   # Main component
│   └── {Feature}Section.test.tsx
└── data/
    ├── {feature}Data.ts       # Types + data
    └── {feature}Data.test.ts
```

**Current domains**: `hero`, `audience`, `services`, `process`, `about`, `cta`, `layout`

**Why this matters**: Each domain has:
1. Data file (types + content constants) that's separate from components
2. Components that consume that data via imports
3. Tests that validate both data structure AND rendering
4. A barrel export (`index.ts`) for clean imports

## Component Architecture

### Patterns in Use

1. **Section Components**: Wrap content with `<Section>` from `shared/components`
   ```tsx
   <Section title="Services">
     {servicesData.map(s => <ServiceCard key={s.id} {...s} />)}
   </Section>
   ```

2. **Animated Lists**: Use `<AnimatedList>` for staggered entrance effects
   ```tsx
   <AnimatedList items={data} renderItem={item => <ItemComponent {...item} />} />
   ```

3. **Lazy Loading**: Below-the-fold sections use `<LazySection>` (viewport-triggered) or `React.lazy()` + `Suspense` (route-based)
   ```tsx
   <LazySection><ExpensiveSection /></LazySection>
   ```

4. **Data-Driven Tests**: Test files reference data imports and verify text rendering
   ```tsx
   ABOUT_POINTS.forEach(point => {
     expect(screen.getByText(point.text)).toBeInTheDocument()
   })
   ```

### Layout Flow
HomePage → HeroSection → AudienceSection → ServicesSection → ProcessSection → AboutSection → CTASection → Footer

Each section is independently lazy-loaded except Hero.

## State Management: Zustand Only

Global state goes in `src/shared/store/useAppStore.ts`. Current state:
```typescript
{
  isLoading: boolean
  error: Error | null
  setLoading: (loading: boolean) => void
  setError: (error: Error | null) => void
  clearError: () => void
}
```

**Do NOT** introduce Context API or Redux. Local component state stays in components.

## Routing: TanStack Router (Auto-Generated)

- Routes defined in `src/routes/` (file-based, similar to Next.js)
- Router tree is **auto-generated** in `src/routeTree.gen.ts` (don't edit manually)
- Run `npm run dev` to regenerate routes after creating new route files
- Type-safe: Router configuration in `src/router.tsx` with TypeScript module augmentation

## Data + Types Convention

**Every domain data file follows this pattern**:

```typescript
export interface DataType {
  id: string
  [other fields]
}

export const domainData: DataType[] = [...] as const

export const domainConfig = {
  title: string
  subtitle: string
} as const
```

Why `as const`: Ensures literal types for config values used in tests.

## Testing Requirements

**All new code needs tests.** Pattern:

```typescript
import { render, screen } from '../../../test-utils/test-utils'
import { DOMAIN_DATA, DOMAIN_CONFIG } from '../data/domainData'

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

**Key**: Use test-utils from `src/test-utils/test-utils.tsx`, not React Testing Library directly.

## Critical Developer Workflows

### Development
```bash
npm run dev           # Start Vite dev server (auto-reload)
npm run type-check   # Check TypeScript (required before commit)
npm run lint:check   # Check lint violations
```

### Testing
```bash
npm run test         # Run all tests in watch mode
npm run test:run     # Run once (CI mode)
npm run test:coverage
npm run test:ui      # Visual test dashboard
```

### Before Committing
```bash
npm run lint         # Auto-fix lint + format
npm run type-check   # No TS errors allowed
npm run test:run     # All tests must pass
```

**TanStack Router gotcha**: After creating new route files, Vite won't auto-generate the tree. Restart dev server or manually trigger rebuild.

## Build Optimization Details (Why This Matters)

Vite config chunks dependencies separately for better browser caching:
- `react-vendor` — React + ReactDOM
- `router-vendor` — TanStack Router (lazy routes depend on this)
- `query-vendor` — TanStack Query
- `animation-vendor` — Framer Motion
- `state-vendor` — Zustand
- `utils-vendor` — Underscore.js

When adding new major dependencies, consider adding them to `vite.config.ts` manualChunks.

## Import Conventions

Always import from **barrel exports** (index.ts files):

```tsx
// ✅ Good
import { Button, Section } from '@/shared/components'
import { useScrollAnimation } from '@/shared/hooks'
import { HeroSection } from '@/domains/hero'

// ❌ Bad
import { Button } from '@/shared/components/Button'
import { useScrollAnimation } from '@/shared/hooks/useScrollAnimation.ts'
```

## Type Safety Non-Negotiables

1. **No `any`** — Use `unknown` or proper typing
2. **Explicit return types** on all functions/hooks
3. **React.FC<Props>** pattern for components
4. **Discriminated unions** for complex state (see AsyncState patterns)
5. **`as const`** for config/data objects to preserve literal types

## Performance Considerations

- **Lazy load** anything below the fold (use `LazySection` or `React.lazy()`)
- **Code split** by domain — each domain's components are tree-shakeable
- **Memoization**: Use `useMemo`/`useCallback` only when rendering expensive components
- **Framer Motion** is already optimized for animations; don't re-implement with CSS

## Reusable Components (Use These First)

In `src/shared/components/`:
- `Button` — styled, multiple variants
- `Section` — page section wrapper
- `AnimatedList` — staggered list animations
- `AnimatedText` — scroll-triggered text animations
- `ErrorBoundary` — error containment
- `LazySection` — viewport-triggered lazy loading
- `LoadingSpinner` — loading state
- `ShimmerLoader` — skeleton screens
- `SEO` — meta tags + schema.json

Check these before creating new components.

## Reusable Hooks (Use These First)

In `src/shared/hooks/`:
- `useAnimationVariants()` — Framer Motion animation config
- `useScrollAnimation()` — Detect when element enters viewport
- `useIntersectionObserver()` — Low-level visibility detection
- `useErrorHandler()` — Centralized error handling
- `usePrefetch()` — Prefetch routes on hover

## Common Mistakes to Avoid

1. **Hardcoded strings** → Put in data files (e.g., `servicesData.ts`)
2. **Missing tests** → Every new feature needs `ComponentName.test.tsx`
3. **Direct React Testing Library imports** → Use `src/test-utils/test-utils.tsx` instead
4. **Mutating state** → Always create new objects/arrays (`[...arr]`, `{...obj}`)
5. **Prop drilling** → Use Zustand store instead
6. **Creating new routes without restart** → Restart dev server after creating `src/routes/*.tsx`
7. **Forgetting `as const` on data** → Tests won't get literal types for exact text matching
8. **Skipping TypeScript strict checks** → `npm run type-check` must pass

## Code Generation Guidelines

### React Components

#### Component Template
```typescript
import React from 'react'
import type { ReactNode } from 'react'

interface ComponentNameProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

/**
 * ComponentName description
 * @param props - Component props
 * @returns Rendered component
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  subtitle,
  children
}) => {
  return (
    <div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </div>
  )
}
```

#### Guidelines
- Always use `React.FC<Props>` typing pattern
- Provide explicit JSDoc comments for public components
- Keep components under 300 lines
- Extract complex logic into custom hooks
- Use destructuring for props
- Provide optional props with defaults where sensible
- Never use `any` or implicit `unknown`

### Data Files

#### Data File Template
```typescript
/**
 * Data structures and content for the feature
 */

export interface DataItem {
  id: string
  title: string
  description: string
}

export const featureData: DataItem[] = [
  {
    id: 'item-1',
    title: 'Item Title',
    description: 'Item description'
  },
  // ... more items
] as const

export const featureConfig = {
  heading: 'Feature Heading',
  subheading: 'Feature Subheading',
  cta: 'Call to action text'
} as const
```

#### Guidelines
- Define TypeScript interfaces for all data structures
- Use `as const` for configuration objects to ensure literal types
- Separate content data from configuration
- Include JSDoc comments for complex types
- Create corresponding `.test.ts` file to validate data structure

### Custom Hooks

#### Hook Template
```typescript
import { useState, useEffect, useCallback } from 'react'

interface UseCustomHookOptions {
  initialValue?: string
  enabled?: boolean
}

interface UseCustomHookReturn {
  value: string
  setValue: (value: string) => void
  reset: () => void
}

/**
 * Custom hook description
 * @param options - Hook configuration options
 * @returns Hook state and handlers
 */
export const useCustomHook = (
  options: UseCustomHookOptions = {}
): UseCustomHookReturn => {
  const { initialValue = '', enabled = true } = options
  const [value, setValue] = useState(initialValue)

  const reset = useCallback(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    if (!enabled) return
    // Hook effect logic
  }, [enabled])

  return { value, setValue, reset }
}
```

#### Guidelines
- Extract logic from components into reusable hooks
- Always provide explicit return types
- Include proper dependency arrays in `useEffect`
- Consider cleanup functions for subscriptions
- Document hook parameters and return values

### TypeScript Standards

#### Type Definitions
```typescript
// ✅ Good: Explicit, descriptive types
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary'
  size: 'sm' | 'md' | 'lg'
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  children: React.ReactNode
}

// ❌ Bad: Using any
interface ButtonProps {
  variant: any
  onClick: (event: any) => void
  children: any
}
```

#### Generic Types
```typescript
// ✅ Good: Reusable generic types
export interface ApiResponse<T> {
  data: T
  error?: string
  isLoading: boolean
  timestamp: Date
}

export interface ListState<T> {
  items: T[]
  selectedId: string | null
  isLoading: boolean
  error?: Error
}

// Usage:
const userResponse: ApiResponse<User> = { ... }
const userList: ListState<User> = { ... }
```

#### Discriminated Unions
```typescript
// ✅ Good: Type-safe state
type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

function handleState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'success':
      return state.data  // ✅ data is guaranteed to exist
    case 'error':
      return state.error // ✅ error is guaranteed to exist
  }
}
```

## Styling Guidelines

### Tailwind CSS

#### Usage Pattern
```typescript
// ✅ Good: Organized Tailwind classes
const baseClasses = 'rounded-lg border transition-all duration-200'
const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary' }) => {
  return <button className={`${baseClasses} ${variantClasses[variant]}`}>
    Click me
  </button>
}

// ❌ Bad: Inline complex classes
export const Button = () => (
  <button className="rounded-lg border transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700">
    Click me
  </button>
)
```

#### Responsive Design
```typescript
// Use responsive prefixes for mobile-first design
<div className="text-sm sm:text-base md:text-lg lg:text-xl">
  Responsive text
</div>

// Stack layouts
<div className="flex flex-col sm:flex-row gap-4">
  <div className="w-full sm:w-1/2">Column 1</div>
  <div className="w-full sm:w-1/2">Column 2</div>
</div>
```

## Component Patterns

### Section Wrapper Pattern
```typescript
import { Section } from '@/shared/components'

export const MyFeatureSection: React.FC = () => (
  <Section title="Feature Title" className="bg-gradient">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Content */}
    </div>
  </Section>
)
```

### Animated List Pattern
```typescript
import { AnimatedList } from '@/shared/components'

interface Item {
  id: string
  title: string
}

interface AnimatedListProps {
  items: Item[]
  renderItem: (item: Item) => React.ReactNode
  staggerDelay?: number
}

export const MyAnimatedList: React.FC<AnimatedListProps> = ({
  items,
  renderItem,
  staggerDelay = 0.1
}) => (
  <AnimatedList items={items} renderItem={renderItem} staggerDelay={staggerDelay} />
)
```

### Lazy Loading Pattern
```typescript
import { lazy, Suspense } from 'react'
import { ShimmerLoader } from '@/shared/components'
import { LazySection } from '@/shared/components'

// Option 1: For below-the-fold sections
export const HomePage = () => (
  <div>
    <HeroSection />
    <LazySection>
      <ExpensiveSection />
    </LazySection>
  </div>
)

// Option 2: For routes
const HeavyPage = lazy(() => import('./pages/HeavyPage'))

export const RouteWithSuspense = () => (
  <Suspense fallback={<ShimmerLoader />}>
    <HeavyPage />
  </Suspense>
)
```

## State Management

### Zustand Store Pattern
```typescript
// src/shared/store/useAppStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  // State
  isDarkMode: boolean
  sidebarOpen: boolean
  
  // Actions
  toggleDarkMode: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      sidebarOpen: true,
      
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setSidebarOpen: (open) => set({ sidebarOpen: open })
    }),
    {
      name: 'app-storage' // localStorage key
    }
  )
)

// Usage in components:
export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore()
  return <button onClick={toggleDarkMode}>{isDarkMode ? '☀️' : '🌙'}</button>
}
```

#### Guidelines
- Keep store focused on global app state
- Use descriptive action names (verbs: `toggle`, `set`, `add`, `remove`)
- Avoid storing derived/computed state
- Use middleware for persistence when needed
- **DO NOT** use Context API or Redux without discussion

## Testing Standards

### Test File Template
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@/test-utils/test-utils'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup before each test
  })

  it('should render correctly', () => {
    render(<ComponentName title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should handle user interactions', async () => {
    const mockHandler = vi.fn()
    render(<ComponentName onAction={mockHandler} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(mockHandler).toHaveBeenCalled()
  })

  it('should handle async operations', async () => {
    render(<ComponentName />)
    
    await waitFor(() => {
      expect(screen.getByText('Loaded')).toBeInTheDocument()
    })
  })
})
```

### Testing Guidelines
- Write tests for every new component and utility function
- Test behavior, not implementation details
- Use descriptive test names (should do something)
- Mock external dependencies (API calls, animations, etc.)
- Include both happy path and error scenarios
- Aim for >70% coverage on critical paths
- Use `data-testid` for complex DOM queries only
- Always verify error states and edge cases

## Import Organization

### Correct Import Order
```typescript
// 1. React & external libraries
import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from '@tanstack/react-router'

// 2. Shared modules (always from index.ts)
import { Button, Section, AnimatedList } from '@/shared/components'
import { useScrollAnimation, useErrorHandler } from '@/shared/hooks'
import { useAppStore } from '@/shared/store'
import type { User, ApiResponse } from '@/shared/types'

// 3. Domain modules (from index.ts)
import { HeroSection } from '@/domains/hero'
import { servicesData } from '@/domains/services'

// 4. Relative imports (if necessary)
import { helper } from './helper'
import type { LocalType } from './types'
```

### Export from Index Files
Always create `index.ts` files to expose public APIs:

```typescript
// src/shared/components/index.ts
export { Button } from './Button'
export { Section } from './Section'
export { AnimatedList } from './AnimatedList'
export { ErrorBoundary } from './ErrorBoundary'
export type { ButtonProps, SectionProps } from './types'

// src/domains/services/index.ts
export { ServicesSection } from './components/ServicesSection'
export { ServiceCard } from './components/ServiceCard'
export { servicesData } from './data/servicesData'
export type { Service, ServiceCardProps } from './data/servicesData'
```

## Performance Optimization

### Code Splitting
- Use `React.lazy()` for route-based code splitting
- Use `LazySection` for viewport-triggered loading
- Lazy load heavy libraries (e.g., analytics, charts)

### Memoization
```typescript
// ✅ Good: Memoize expensive computations
import { useMemo, useCallback } from 'react'

export const ComponentWithMemo: React.FC<Props> = ({ items, filter }) => {
  const filteredItems = useMemo(
    () => items.filter(item => item.type === filter),
    [items, filter]
  )
  
  const handleChange = useCallback((value: string) => {
    // Handle change
  }, [])
  
  return <div>{/* Render filteredItems */}</div>
}
```

### Image Optimization
- Use `img` with descriptive alt text for SEO
- Consider using `next/image` equivalent or lazy loading for large images

## Error Handling

### Error Boundary Pattern
```typescript
import { ErrorBoundary } from '@/shared/components'
import { ErrorFallback } from './ErrorFallback'

export const App = () => (
  <ErrorBoundary fallback={<ErrorFallback />}>
    <MainContent />
  </ErrorBoundary>
)
```

### Hook Error Handling
```typescript
import { useErrorHandler } from '@/shared/hooks'

export const useDataFetch = (url: string) => {
  const { handleError } = useErrorHandler()
  const [data, setData] = useState(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch((err) => {
        setError(err)
        handleError(err)
      })
  }, [url, handleError])

  return { data, error }
}
```

## SEO Best Practices

### Using SEO Component
```typescript
import { SEO } from '@/shared/components/SEO'

export const AboutPage: React.FC = () => (
  <>
    <SEO
      title="About Me - Software Developer"
      description="Learn about my 15+ years of experience in web development"
      keywords={['developer', 'software engineer', 'about', 'portfolio']}
      canonicalUrl="https://example.com/about"
    />
    <AboutContent />
  </>
)
```

### Metadata in Data Files
```typescript
// src/domains/hero/data/heroContent.ts
export const heroContent = {
  title: 'Hi, I\'m Gowtham',
  seo: {
    metaTitle: 'Software Developer - 15+ Years Experience',
    metaDescription: 'Full-stack software developer specializing in React and TypeScript',
    keywords: ['developer', 'software engineer', 'react', 'typescript']
  }
} as const
```

## Git & Commit Standards

### Branch Naming
- Feature: `feature/user-authentication`
- Bug fix: `bugfix/header-alignment`
- Docs: `docs/api-documentation`
- Chore: `chore/update-dependencies`

### Commit Message Format
```bash
feat: add user authentication page
fix: resolve button alignment issue on mobile
docs: update installation instructions
test: add tests for AuthService
refactor: extract reusable hook from ProfilePage
style: align button spacing
perf: optimize image loading with lazy loading
chore: update dependencies to latest versions
```

### Pre-commit Checklist
- [ ] TypeScript: `npm run type-check` passes
- [ ] Tests: `npm run test` passes
- [ ] Lint: `npm run lint` passes
- [ ] Format: `npm run format` applied
- [ ] No `console.log()` in production code
- [ ] All props properly typed
- [ ] Tests added for new features
- [ ] No breaking changes

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test
npm run test:watch

# Linting & formatting
npm run lint
npm run format

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Common Mistakes to Avoid

1. **Hardcoding values** → Use data files and constants
2. **Missing types** → Always provide explicit types
3. **Skipping tests** → Every feature needs tests
4. **Monolithic components** → Keep components focused (<300 lines)
5. **Prop drilling** → Use Zustand store or composition
6. **Mutating state** → Always create new objects/arrays
7. **Missing dependencies** → Include all dependencies in `useEffect`
8. **Memory leaks** → Clean up in `useEffect` cleanup functions
9. **Using any** → Use proper types or `unknown`
10. **Global state for local state** → Keep local state in components

## Reusable Components Reference

These components are available in `src/shared/components/`:
- **Button** - Styled button with variants and states
- **Section** - Page section wrapper with title and spacing
- **AnimatedList** - List with staggered entrance animations
- **AnimatedText** - Text with scroll-triggered animations
- **ErrorBoundary** - Error containment boundary
- **LazySection** - Lazy-load sections on scroll
- **LoadingSpinner** - Loading indicator
- **ShimmerLoader** - Skeleton loading state
- **SEO** - Meta tags and structured data management

Always use these before creating duplicates.

## Reusable Hooks Reference

These hooks are available in `src/shared/hooks/`:
- **useAnimationVariants** - Framer Motion animation variants
- **useScrollAnimation** - Trigger animations on scroll
- **useIntersectionObserver** - Detect element visibility
- **useErrorHandler** - Centralized error handling
- **usePrefetch** - Prefetch routes on hover
- **useAppStore** - Global app state (Zustand)

## When in Doubt

1. **Check existing patterns** - Look for similar components/hooks
2. **Follow the guidelines** - Refer to this document
3. **Ask the team** - Clarify ambiguous requirements
4. **Write tests** - Validate your understanding
5. **Keep it simple** - Choose clarity over cleverness

## Summary

This codebase prioritizes:
- ✅ **Type safety** - No `any`, strict TypeScript
- ✅ **Testability** - Every feature has tests
- ✅ **Maintainability** - Clear structure and patterns
- ✅ **Performance** - Lazy loading and code splitting
- ✅ **Accessibility** - Semantic HTML and ARIA labels
- ✅ **Developer experience** - Consistent patterns and tooling
