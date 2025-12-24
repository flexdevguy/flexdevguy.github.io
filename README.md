# grwm.dev — Homepage

A modern, performant React portfolio built with **TypeScript**, **Vite**, **React 18**, **TanStack Router**, and **Tailwind CSS**, following **Domain-Driven Design** and **clean code practices**.

## Architecture

This project follows **Domain-Driven Design (DDD)** principles, organizing code by business domains rather than technical layers. Each domain is self-contained with its own components, data, and logic.

### Tech Stack

- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **React 18** - UI framework with latest features
- **TanStack Router** - Type-safe routing with zero-config
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Standard JS** - JavaScript style guide
- **TS Standard** - TypeScript style guide

### Project Structure

\\\
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
├── router.tsx           # Router configuration
└── main.tsx             # Application entry point
\\\

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
\\\ash
npm install
npm run dev
\\\

### Build for Production
\\\ash
npm run build
\\\

## Available Scripts

- \
pm run dev\ - Start development server
- \
pm run build\ - Build for production
- \
pm run preview\ - Preview production build
- \
pm run test\ - Run tests in watch mode
- \
pm run test:run\ - Run tests once
- \
pm run lint\ - Lint and fix code
- \
pm run type-check\ - Type check TypeScript

## Code Quality

- **Linting**: ESLint with StandardJS + TS Standard (enforced on staged files)
- **Formatting**: Standard + TS Standard (automatic fixing)
- **Type Safety**: TypeScript strict mode enforced

## Performance Features

- Lazy loading of below-fold sections
- Code splitting by domain
- Shimmer loaders for better UX
- Intersection Observer-based viewport loading
- Optimized vendor chunks

## License

Private project
