# Next.js example

🔥 See it in action: <https://nextjs-example-six-nu.vercel.app/>

## Instructions

Run `npm install` or `npm i` to install the dependencies.

If you haven't already, install the Vercel CLI using `npm i -g vercel` and login using the command `vercel login`. Link the project using `vercel link` and run `vercel env pull` to download the environment variables.

Run `npx prisma generate` to generate the prisma client.

Now, you can start the development server using `npm run dev` and build the app using `npm run build`. Run `npm start` to run the build. Note that the build may not support auth.

## Recommended VS Code extensions

- Prettier
- Tailwind

## Tips

The following VS Code configuration ensures the extension recognizes and provides autocomplete suggestions for classes nested within functions like `cva` or `cn`. Without it, IntelliSense will only trigger in standard `className` strings.

```json
{
  "tailwindCSS.classFunctions": ["cva", "cn", "clsx", "twMerge", "variant"]
}
```

## Docs

- Next.js: <https://nextjs.org/docs>
- Auth.js: <https://authjs.dev/getting-started>
- Prisma: <https://www.prisma.io/docs>
- Motion: <https://motion.dev/docs/react>
- Typography: <https://github.com/tailwindlabs/tailwindcss-typography>
