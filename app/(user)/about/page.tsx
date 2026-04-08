import Article from "@/components/ui/article";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Article>
        <h1>About</h1>
        <p>
          This is a Next.js application bootstrapped with{" "}
          <span className="font-mono">create-next-app</span>. It uses Auth.js
          for authentication, Supabase for database and Shadcn for ui
          components.
        </p>
        <a href="https://github.com/faseehfs/nextjs-example">
          <Button variant="outline">View Source Code</Button>
        </a>
        <h2>What is Next.js</h2>
        <p className="text-muted-foreground">From Wikipedia</p>
        <p>
          Next.js is an open-source full-stack web development framework created
          by the private company Vercel providing React-based web applications
          with server-side rendering and static rendering.
        </p>
        <p>
          React documentation mentions Next.js among "Recommended Toolchains"
          advising it to developers when "building a server-rendered website
          with Node.js". Where traditional React apps can only render their
          content in the client-side browser, Next.js extends this functionality
          to include applications rendered on the server-side.
        </p>
        <a href="https://nextjs.org/docs">
          <Button variant="outline">Read the Docs</Button>
        </a>
      </Article>
    </div>
  );
}
