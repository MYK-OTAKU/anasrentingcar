# Replit.md

## Overview

This is a car rental website for "Tourisme Car Location" (also referred to as "YR Car"), a car rental agency operating in Morocco. The site allows customers to browse vehicles, make reservation requests, submit reviews, and contact the agency. It includes a full admin dashboard for managing vehicles (CRUD), moderating customer reviews, and handling contact/reservation requests. The site supports multiple languages (English, Arabic, with French translations preserved) and has light/dark theme support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Next.js (App Router)** with TypeScript, using React Server Components where possible
- **Tailwind CSS v4** with CSS custom properties for theming (light/dark modes)
- **shadcn/ui** components (New York style) built on Radix UI primitives
- Path aliases configured: `@/*` maps to project root

### Routing Structure
- `app/(public)/` — Public-facing pages with shared layout (Header, Footer, I18n provider). Includes home page, services, contact, and about
- `app/admin/` — Protected admin area with its own layout. Includes login, vehicle management, review moderation, and request management
- `app/actions/` — Server Actions for form submissions (contact, reservation, reviews, car CRUD with image upload)
- `app/auth/` — Auth callback routes

### State Management & Internationalization
- **I18n**: Custom context provider (`lib/i18n/context.tsx`) with translations in `lib/i18n/translations.ts`. Supports English, Arabic (with RTL), and French. Default language is English
- **Theme**: Uses `next-themes` via a ThemeProvider, with a custom toggle component. Dark mode supported via CSS custom properties in `app/globals.css`

### Data Layer
- **Supabase** (PostgreSQL) is the primary database and auth provider
- Two Supabase client patterns exist: `lib/supabase/server.ts` (server-side) and `lib/supabase/client.ts` (client-side)
- **Tables**: `cars`, `reviews`, `contact_requests`, `admins`
- **Supabase Storage**: Used for car image uploads (bucket: `car-images`)
- **RLS (Row Level Security)**: Enabled on all tables. Reviews allow public INSERT; approved reviews are publicly readable. Admin table is restricted to self-read
- Mock data exists in `lib/mock-data.ts` as fallback

### Authentication & Authorization
- **Supabase Auth** with email/password for admin login
- Admin verification uses a dedicated `admins` table (not user metadata) — checks `admins` table after Supabase Auth succeeds
- Double verification: environment variable `ADMIN_EMAILS` / `NEXT_PUBLIC_ADMIN_EMAILS` provides an additional email whitelist check
- Middleware in `proxy.ts` handles session management via `@supabase/ssr`

### Key TypeScript Types (`lib/types.ts`)
- `Car`: id, brand, model, category (citadine/suv/berline/utilitaire), seats, transmission, fuel_type, price_per_day, image_url, available
- `Review`: id, customer_name, rating, comment, approved, display_order
- `ContactRequest`: id, name, email, phone, subject, message, car_id, status (new/in_progress/done)

### Component Organization
- `components/layout/` — Header, Footer
- `components/sections/` — Page sections (Hero, Reservation, Services, About, Cars, Reviews, CTA, FAQ)
- `components/forms/` — Contact form, Review form, Reservation form
- `components/cards/` — Car card, Review card
- `components/admin/` — Admin sidebar, header, car form, tables for cars/reviews/requests
- `components/animations/` — FadeInSection (Intersection Observer-based scroll animations)
- `components/ui/` — shadcn/ui primitives

### Currency & Locale
- Prices are in Moroccan Dirhams (DH)
- The site targets Moroccan car rental market with SEO for French, English, and Arabic keywords

### SEO
- Comprehensive meta tags in root layout targeting Morocco car rental keywords
- `sitemap.ts` generates sitemap with static pages and city-specific landing pages
- `robots.txt` blocks `/admin/` and `/api/` from indexing
- Structured data and Open Graph tags configured

## External Dependencies

### Core Services
- **Supabase**: PostgreSQL database, authentication, file storage. Requires env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Resend**: Email delivery for contact form notifications. Requires `RESEND_API_KEY`. Falls back gracefully if not configured
- **Vercel Analytics**: `@vercel/analytics` integrated in root layout

### Environment Variables Required
| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) |
| `RESEND_API_KEY` | Email sending (optional) |
| `ADMIN_EMAILS` | Comma-separated admin email whitelist (server) |
| `NEXT_PUBLIC_ADMIN_EMAILS` | Admin email whitelist (client-accessible) |
| `CONTACT_EMAIL` | Recipient for contact form emails |

### Key NPM Packages
- `@supabase/ssr`, `@supabase/supabase-js` — Supabase client
- `@hookform/resolvers`, `react-hook-form` (via resolvers) — Form validation
- `resend`, `@react-email/render` — Email
- `date-fns` — Date utilities
- `lucide-react` — Icons
- `next-themes` — Theme management
- `embla-carousel-react` — Carousel
- Multiple `@radix-ui/*` packages — UI primitives for shadcn/ui