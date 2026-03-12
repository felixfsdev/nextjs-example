import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import ExternalLink from "@/components/ExternalLink";
import Card from "@/components/Card";

export default function LandingPage() {
  return (
    <main>
      <Hero />

      <div className="mx-auto w-full max-w-4xl px-5">
        <Feature
          title="What is this?"
          text="This is a Next.js application."
          image="/images/web-search.png"
        />

        <hr className="text-border" />

        <Feature
          title="Why did you make this?"
          text="To learn Next.js"
          image="/images/working-at-home.png"
          reverse
        />

        <hr className="text-border" />

        <Feature
          title="From where did you get these images?"
          image="/images/images.png"
        >
          <ExternalLink href="https://undraw.co/">Undraw.co</ExternalLink>
        </Feature>

        <hr className="text-border" />

        <Feature
          title="What about the banner image?"
          text="Oh, that's from Pixabay"
          image="/images/landing-page.png"
          reverse
        ></Feature>
      </div>

      <div className="flex flex-col gap-8 p-8 justify-center items-center w-full bg-primary text-on-primary">
        <h1 className="text-center text-xl">What's in here</h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-3 max-w-4xl">
          <Card
            image="/images/sweet-home.png"
            title="Home"
            text="The homepage"
          />
          <Card
            image="/images/source-code.png"
            title="Code"
            text="Yeah, code"
          />
          <Card
            image="/images/next-js.png"
            title="Next.js"
            text="Isn't that obvious??"
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-5">
        <Feature
          title="What are you waiting for?"
          text="Go and click some links already!"
          image="/images/waiting-for-you.png"
        ></Feature>
      </div>
      <Footer text="This is a footer" />
    </main>
  );
}
