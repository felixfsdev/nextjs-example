# Next.js example

🔥 See it in action: <https://nextjs-example-six-nu.vercel.app/>

## Setup instructions

**Note:** The setup assumes a Linux environment.

1. Clone the repo and pull LFS objects.
2. Run `npm install` or `npm i` to install the dependencies.
3. If you haven't already, install the Vercel CLI using `npm i -g vercel` and login using the command `vercel login`.
4. Link the project using `vercel link` and run `vercel env pull` to download the environment variables.
5. Run `npx prisma generate` to generate the prisma client.

Now, you can start the development server using `npm run dev` or build the app using `npm run build`. Run `npm start` to run the build. Note that the build may not support auth if run locally.

## Running Prisma migrations

Make changes to your `schema.prisma` and run `npx prisma migrate dev`. Then run `npx prisma generate` to generate the new Prisma client. Run `npx prisma studio` to view the changes.

## Recommended VS Code extensions

- Prettier
- Tailwind
- etc.

## Tips

The following VS Code configuration ensures the extension recognizes and provides autocomplete suggestions for classes nested within functions like `cva` or `cn`. Without it, IntelliSense will only trigger in standard `className` strings.

```json
{
  "tailwindCSS.classFunctions": ["cva", "cn", "clsx", "twMerge", "variant"]
}
```

## Notes

Theme: Tiesen (from <tweakcn.com>).

## Docs

- Next.js: <https://nextjs.org/docs>
- Auth.js: <https://authjs.dev/getting-started>
- Prisma: <https://www.prisma.io/docs>
- Motion: <https://motion.dev/docs/react>
- Typography: <https://github.com/tailwindlabs/tailwindcss-typography>
