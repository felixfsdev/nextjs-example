# Next.js example

🔥 See it in action: <https://nextjs-example-six-nu.vercel.app/>

## Docs

- Next.js: <https://nextjs.org/docs>
- Auth.js: <https://authjs.dev/getting-started>
  - Supabase adapter configuration: <https://authjs.dev/getting-started/adapters/supabase>
- Adding Prisma to an existing database: <https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql>

I attempted to use the Prisma adapter instead of the Supabase one, but I ran into persistent connection issues despite following the Auth.js docs exactly. So, I've decided to keep the Supabase adapter for authentication and manage Prisma as a separate integration.
