# Wini Web Components - AI Development Guide

## Project Overview
**wini-web-components** is a React TypeScript UI component library published on npm (v8.4.97+). It exports 35+ reusable components with theming support via design tokens and i18n capabilities.

## Build & Deploy Commands
- **Build**: `npm run build` – Compiles TypeScript → Vite bundles to `dist/` (ES, CJS formats with DTS)
- **Lint**: `npm run lint` – ESLint with strict 0 warnings policy
- Build outputs: `dist/index.es.js`, `dist/index.cjs.js`, `dist/index.d.ts`, `dist/style.css`

## Architecture & Key Patterns

### Component Structure (`src/component/*`)
Each component follows a consistent pattern:
- **Module CSS**: `component-name.module.css` – CSS Modules with design token variables (e.g., `var(--primary-main-color)`)
- **TSX Component**: Exported function with TypeScript interfaces for props
- **Exported from**: `src/index.tsx` as named exports
- **Example**: `Button` uses `forwardRef`, tooltip support, and CSS class composition for variants (size32, button-primary, etc.)

**CSS Variable Convention**: Components use CSS custom properties like `--primary-main-color`, `--neutral-bolder-border` that map to design token values set by WiniProvider.

### Provider & Context (`src/module/WiniProvider.tsx`)
Centralized configuration via `WiniProvider`:
- **Props**: `pid` (project ID), `url` (API endpoint), `fileUrl`, `imgUrlId`, `theme` ("light"|"dark"), `loadResources`
- **Features**: Token-based auth (Bearer token + refreshToken), design token application to CSS, i18n initialization, dialog/toast global management
- **Export**: `useWiniContext()` hook for accessing global state; `initializeProject(config)` for setup

### Data Layer & Controllers
**Three-tier controller pattern** in `src/controller/`:
1. **ConfigData** – Singleton stores: `pid`, `url`, `fileUrl`, `imgUrlId`, token callbacks
2. **BaseDA** – HTTP methods: `post()`, `get()`, `postFile()`, `put()`, `delete()` with auto-token refresh
3. **TableController** – Generic module fetcher (modules: table, column, rel, menu, page, layout, etc.) with methods like `getById()`, `getByIds()`, `getListSimple()`, `update()`, `delete()`

**Token Refresh**: Automatic Bearer token refresh when `timeRefresh` cookie expires; invalid token triggers redirect to `/login`.

### Dynamic Modules (`src/module/*`)
High-level form/table/page builders that fetch configuration from backend:
- **FormById**: Renders form from backend config; supports nested fields, validation, i18n labels
- **TableById**: Renders data table with search, filters, export, inline editing
- **PageById**: Dynamic page layout renderer (containers, cards, charts)
- **ChartById**: ECharts wrapper with backend data binding
- All support **ComponentType** enum for field mapping (text, checkbox, textField, select1, ckEditor, etc.)

## Development Conventions

### Import & Export Pattern
```tsx
// In component files: import from module.css
import styles from './checkbox.module.css';

// In index.tsx: re-export everything for public API
export { Button } from './component/button/button'
export { useWiniContext, initializeProject } from './module/WiniProvider'
```

### Props Interface Pattern
- Use TypeScript interfaces (not `type`)
- Include JSDoc comments for complex props
- **Example**: Button interface documents className variants in comment (size32, button-primary, etc.)

### CSS Styling Rules
- **Design Tokens**: Use `var(--token-name)` instead of hardcoded colors; falls back via `light-dark()` function
- **Responsive Classes**: Use CSS grid/flex with row/col classes from `src/skin/*.css`
- **Module CSS**: Scoped selectors prevent conflicts; import as `import styles from './name.module.css'`

### State Management
- **Local State**: Use React hooks (useState, useRef, useEffect) within components
- **Global State**: Via WiniProvider context for auth, theme, design tokens
- **Form State**: Use `react-hook-form` (UseFormReturn) for FormById, passed via ref
- **Async Operations**: BaseDA methods handle API calls; no Redux/Zustand needed

### Type Definitions
- Enums for fixed sets: **ComponentType**, **FEDataType**, **DesignTokenType** (in `src/module/da.tsx`)
- Avoid `any` – use `[p: string]: any` only for flexible object maps
- Export types in index.tsx if needed by consumers

## Integration Points

### External Dependencies
- **ckeditor5**: Externalized in Rollup config; included as `CustomCkEditor5` component only if installed
- **react-hook-form**: Used in FormById, TableById, and consumer forms
- **react-router-dom**: Re-exported for ease (Route, useNavigate, etc.)
- **react-toastify**: ToastMessage component for notifications
- **axios**: BaseDA uses axios for HTTP; manages retries and error handling

### API Communication Pattern
All API calls route through `BaseDA` → respects ConfigData.url → auto-handles Bearer tokens → redirects on 401.

## Common Tasks

### Adding a New Component
1. Create `src/component/component-name/component-name.tsx`
2. Create `src/component/component-name/component-name.module.css`
3. Use design token CSS variables, export as named export
4. Add export to `src/index.tsx`
5. Component must accept `className` prop for variant customization

### Modifying Design Tokens
- Tokens are set by WiniProvider from backend config
- CSS variables applied to `html` and `html.dark` in document head
- Color tokens support light/dark mode via `--token-name` + `.dark` selector

### Using i18n in Components
```tsx
import { useTranslation } from './language/i18n'
const { t } = useTranslation()
// Access keys from i18n.tsx resources object
```

## Testing & Quality
- **ESLint**: 0 warnings enforced; run `npm run lint` before commit
- **Type Checking**: `tsc` runs before Vite build; check tsconfig.json paths
- **Coverage**: Early test sample in `coverage/early.sample.test.js` (Jest pattern)

## Key Files Reference
- Entry point: `src/index.tsx`
- Provider setup: `src/module/WiniProvider.tsx`
- HTTP client: `src/controller/config.tsx` (BaseDA, ConfigData)
- Type definitions: `src/module/da.tsx` (enums)
- Skinning: `src/skin/root.css`, `layout.css`, `typography.css`

---
*Last updated: 2026-03-31 | For updates to this guide, analyze `src/`, `package.json`, and `vite.config.ts`*
