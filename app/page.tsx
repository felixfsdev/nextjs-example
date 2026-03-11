import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import LandingPageNavbar from "@/components/LandingPageNavbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <LandingPageNavbar />
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
          image="/images/images.png"
        >
          <p className="text-center">
            <a href="https://undraw.co/">Undraw.co</a>
          </p>
        </Feature>

        <hr className="text-gray-300" />

        <Feature
          title="What about the banner image?"
          text="Oh, that's from Pixabay"
          image="/images/landing-page.png"
          reverse
        ></Feature>
      </div>

      <Footer />
    </main>
  );
}
