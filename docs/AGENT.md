# YR Car - Agent Guide

## Quick Start

### Development
\`\`\`bash
npm run dev
\`\`\`

### Build
\`\`\`bash
npm run build
\`\`\`

## Supabase Connection

The project uses Supabase for:
- **Database**: PostgreSQL for cars, reviews, contact requests
- **Auth**: Admin authentication with email/password

### Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Code Conventions

### TypeScript
- Strict mode enabled
- Use interfaces for object shapes
- Prefer `type` for unions and intersections

### File Naming
- Components: PascalCase (`CarCard.tsx`)
- Utilities: camelCase (`formatPrice.ts`)
- Pages: kebab-case folders (`app/about/page.tsx`)

### Component Structure
\`\`\`
components/
├── layout/           # Header, Footer, Navigation
├── sections/         # Page sections (Hero, Features, etc.)
├── forms/            # Form components
├── cards/            # Card components
└── ui/               # shadcn/ui components
\`\`\`

### UI/UX Rules
- Mobile-first responsive design
- Brand colors: Orange primary (#f59e0b), Yellow accent (#fbbf24)
- Consistent spacing using Tailwind scale
- Accessible (ARIA labels, keyboard navigation, contrast)

### Database Operations
- Always use RLS (Row Level Security)
- Server components for protected pages
- Use `createClient` from appropriate location (client/server)

## SQL Scripts
Located in `/scripts/` folder. Run sequentially:
1. `001_create_tables.sql` - Initial schema
2. `002_seed_data.sql` - Sample data
3. `003_rls_policies.sql` - Security policies
