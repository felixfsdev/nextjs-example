# Project Structure Reference

This is for reference only, this project might not strictly use the given structure.

```
my-nextjs-app/
├── public/                     
│   ├── images/
│   ├── favicon.ico
│   └── robots.txt
├── src/                        
│   ├── app/                    # App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Root page
│   │   ├── head.tsx            # Optional: HTML <head> settings
│   │   ├── api/                # API routes
│   │   │   └── example/
│   │   │       └── route.ts
│   │   └── dashboard/          # Example nested route
│   │       ├── layout.tsx      # Nested layout
│   │       └── page.tsx        # "/dashboard"
│   ├── components/             # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Navbar.tsx
│   ├── features/               # Feature-specific modules
│   │   └── auth/
│   │       ├── LoginForm.tsx
│   │       └── authStore.ts    # State management for auth
│   ├── hooks/                  # Custom React hooks
│   │   └── useAuth.ts
│   ├── context/                # React context providers
│   │   └── AuthContext.tsx
│   ├── lib/                    # Library functions, API clients
│   │   ├── api.ts
│   │   └── firebase.ts
│   ├── styles/                 # Global CSS / SCSS / Tailwind configs
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── types/                  # TypeScript types
│   │   └── index.d.ts
│   ├── utils/                  # Utility functions
│   │   └── formatDate.ts
│   └── services/               # External services or API calls
│       └── userService.ts
├── .env                        # Environment variables
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── package.json
└── README.md
```