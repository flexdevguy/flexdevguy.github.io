# grwm.dev — Homepage

A modern React website for grwm.dev built with **TypeScript**, **Vite**, **React**, **TanStack Router**, **TanStack Query**, **Zustand**, and **Tailwind CSS**, following **Domain-Driven Design**, **SOLID principles**, and **clean code practices**.

## Architecture

This project follows **Domain-Driven Design (DDD)** principles, organizing code by business domains rather than technical layers. Each domain is self-contained with its own components, data, and logic.

### Tech Stack

- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **React 18** - UI framework with latest features
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Powerful data synchronization
- **Zustand** - Lightweight state management
- **Underscore.js** - Utility functions
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Vitest** - Fast unit testing
- **Standard JS** - JavaScript style guide ([standardjs.com](https://standardjs.com/))
- **TS Standard** - TypeScript style guide ([ts.dev/style](https://ts.dev/style/))
- **Husky** - Git hooks

### Project Structure

```
src/
├── domains/              # Business domains (DDD)
│   ├── hero/            # Hero section domain
│   ├── audience/        # Target audience domain
│   ├── services/        # Services domain
│   ├── process/         # Process flow domain
│   ├── about/           # About section domain
│   ├── cta/             # Call-to-action domain
│   └── layout/          # Layout components domain
├── routes/              # TanStack Router routes
├── pages/               # Page components
├── shared/              # Shared resources
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand stores
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── constants/       # Application constants
├── router.tsx           # Router configuration
└── main.tsx             # Application entry point
```

## Code Quality & Standards

### JavaScript Standard Style
This project uses [JavaScript Standard Style](https://standardjs.com/) for JavaScript files:
- No configuration needed
- Automatic code formatting
- Catches style issues early

### TypeScript Standard Style
This project uses [TypeScript Standard Style](https://ts.dev/style/) for TypeScript files:
- Strict type checking
- Consistent code style
- Type-safe development

### Pre-commit Hooks (Husky)
Before every commit, the following checks run automatically:
- ✅ Linting (Standard JS & TS Standard)
- ✅ Code formatting
- ✅ Type checking
- ✅ Unit tests
- ✅ Code coverage (minimum 80%)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Update Calendly URL:
   - Edit `src/shared/constants/calendly.ts` and replace the placeholder URL with your actual Calendly link

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:run` - Run tests once (CI mode)
- `npm run lint` - Lint and fix code
- `npm run lint:check` - Check linting without fixing
- `npm run format` - Format code
- `npm run type-check` - Type check without emitting

## Error Handling

### Error Boundaries
The application includes error boundaries to catch React errors gracefully:
- Root-level error boundary in router
- Component-level error boundaries where needed

### 404 Page
A custom 404 page is available at `/404` route.

### Error Handling Utilities
- `useErrorHandler` hook for consistent error handling
- Error formatting utilities
- Global error state management with Zustand

## Performance Optimizations

- **Lazy Loading**: All below-the-fold components lazy loaded with React.lazy()
- **Shimmer Loaders**: Replaced spinners with shimmer loaders for better UX
- **Code Splitting**: Optimized vendor chunks for better caching
- **Intersection Observer**: Viewport-based component loading
- **React Query**: Optimized for fast hydration with structural sharing
- **Build Optimizations**: ESBuild minification, CSS minification
- **HTML Optimizations**: Preconnect, DNS prefetch, critical CSS inline
- **Core Web Vitals**: Optimized for LCP < 2.5s, TTI < 3.8s

See [PERFORMANCE.md](./PERFORMANCE.md) for detailed optimization strategies.

## Testing

- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing
- **Coverage Threshold** - Minimum 80% coverage required
- All tests must pass before commit

## State Management

- **Zustand** - Lightweight state management
- Global app state in `src/shared/store/useAppStore.ts`
- Domain-specific stores can be added as needed

## Data Fetching

- **TanStack Query** - Powerful data synchronization
- Configured with 5-minute stale time
- Automatic retry and error handling
- DevTools available in development

## Routing

- **TanStack Router** - Type-safe routing
- File-based routing in `src/routes/`
- Automatic route generation
- Type-safe navigation

## License

Private project
