# YR Location - Architecture

## Overview

YR Location is a car rental agency website built with:
- **Frontend**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth

## Directory Structure

\`\`\`
├── app/
│   ├── (public)/           # Public pages with shared layout
│   │   ├── page.tsx        # Home
│   │   ├── about/          # About page
│   │   ├── services/       # Services/Catalog
│   │   └── contact/        # Contact page
│   ├── admin/              # Protected admin area
│   │   ├── login/          # Admin login
│   │   ├── cars/           # Cars management
│   │   ├── reviews/        # Reviews management
│   │   └── requests/       # Contact requests
│   ├── auth/               # Auth callbacks
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── layout/             # Header, Footer, Nav
│   ├── sections/           # Page sections
│   ├── forms/              # Forms
│   ├── cards/              # Cards
│   └── ui/                 # shadcn components
├── lib/
│   ├── supabase/           # Supabase clients
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utilities
├── scripts/                # SQL scripts
├── docs/                   # Documentation
└── public/                 # Static assets
\`\`\`

## Data Flow

### Public Pages
1. Server Components fetch data from Supabase
2. Data is rendered server-side
3. Client components handle interactivity

### Admin Area
1. Middleware checks auth status
2. Protected routes redirect if not authenticated
3. Admin actions use server actions or API routes

## Database Schema

### cars
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| brand | text | Car brand |
| model | text | Car model |
| category | text | citadine, suv, berline, utilitaire |
| seats | int | Number of seats |
| transmission | text | manual, automatic |
| fuel_type | text | essence, diesel, electric, hybrid |
| price_per_day | decimal | Daily price |
| description | text | Car description |
| image_url | text | Image URL |
| available | boolean | Availability status |
| created_at | timestamp | Creation date |

### reviews
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| customer_name | text | Customer name |
| rating | int | 1-5 stars |
| comment | text | Review text |
| approved | boolean | Moderation status |
| created_at | timestamp | Creation date |

### contact_requests
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Contact name |
| email | text | Contact email |
| phone | text | Phone (optional) |
| subject | text | Request subject |
| message | text | Message content |
| car_id | uuid | Related car (optional) |
| status | text | new, in_progress, done |
| created_at | timestamp | Creation date |

## Authentication

- Email/password auth via Supabase
- Admin users identified by `is_admin` metadata
- Session managed via cookies (middleware refresh)
- Protected routes under `/admin/*`
