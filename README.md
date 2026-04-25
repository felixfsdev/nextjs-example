# Next.js example

🔥 See it in action: <https://nextjs-example-six-nu.vercel.app/>

## Notes

1. Run `npx prisma generate` to generate the prisma client.
2. Run `npx vercel env pull` to download environment variables.

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
