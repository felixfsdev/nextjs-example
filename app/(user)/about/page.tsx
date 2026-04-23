import { Prose, StandardContainer } from "@/components/layout/prose";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <StandardContainer>
      <Prose>
        <h1>About</h1>
        <p>
          This is a Next.js application bootstrapped with
          <span className="font-mono"> create-next-app </span>, deployed on
          Vercel. It uses Auth.js for authentication, Prisma PostgreSQL as a
          database, Prisma as an ORM, framer-motion for animations, and Shadcn
          for UI components.
        </p>
        <a href="https://github.com/faseehfs/nextjs-example">
          <Button variant="outline">View Source Code</Button>
        </a>
        <h2>What is Next.js</h2>
        <p className="text-muted-foreground text-sm">From Wikipedia</p>
        <p>
          Next.js is an open-source full-stack web development framework created
          by the private company Vercel providing React-based web applications
          with server-side rendering and static rendering.
        </p>
        <a href="https://nextjs.org/docs">
          <Button variant="outline">Read the Docs</Button>
        </a>
        <p>
          React documentation mentions Next.js among "Recommended Toolchains"
          advising it to developers when "building a server-rendered website
          with Node.js". Where traditional React apps can only render their
          content in the client-side browser, Next.js extends this functionality
          to include applications rendered on the server-side.
        </p>
      </Prose>
    </StandardContainer>
  );
}
