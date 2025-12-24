# Setup Instructions

## Initial Setup

After cloning the repository, run the following commands:

```bash
# Install dependencies
npm install

# Initialize Husky (Git hooks)
npm run prepare

# Generate TanStack Router route tree
npm run dev
```

## Pre-commit Hooks

Husky is configured to run the following checks before every commit:

1. **Linting** - Standard JS and TS Standard
2. **Formatting** - Automatic code formatting
3. **Type Checking** - TypeScript type validation
4. **Unit Tests** - All tests must pass
5. **Code Coverage** - Minimum 80% coverage required

## First Time Setup

1. Install dependencies: `npm install`
2. Husky will be installed automatically via `prepare` script
3. Run `npm run dev` to generate route tree for TanStack Router
4. All pre-commit hooks will be active

## Troubleshooting

### Route Tree Not Generated
If you see errors about `routeTree.gen.ts`, run:
```bash
npm run dev
```
This will generate the route tree automatically.

### Husky Not Working
If pre-commit hooks aren't running:
```bash
npm run prepare
```

### Coverage Check Failing
Ensure you have at least 80% code coverage:
```bash
npm run test:coverage
```

