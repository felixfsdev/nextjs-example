import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      <div className="mx-auto w-full max-w-4xl px-5">
        <Feature
          title="What is this?"
          text="This is a Next.js application."
          image="/images/web-search.png"
        />

        <hr className="text-gray-300" />

        <Feature
          title="Why did you make this?"
          text="To learn Next.js"
          image="/images/working-at-home.png"
          reverse
        />

        <hr className="text-gray-300" />

        <Feature
          title="From where did you get these images?"
          image="/images/un-draw-1000.png"
        >
          <p className="text-center">
            <a href="https://undraw.co/">Undraw.co</a>
          </p>
        </Feature>

        <hr className="text-gray-300" />

        <Feature
          title="What about the banner image?"
          text="Oh, that's from Pixabay"
          image="/images/social-media-carousel.png"
          reverse
        ></Feature>
      </div>
    </main>
  );
}
