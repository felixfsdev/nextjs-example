import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-4xl p-5">
      <div className="w-full max-w-md p-6 mx-auto">
        <Image
          src="/images/out-of-office.png"
          alt="Image"
          width={500}
          height={500}
        />
      </div>
      <h1 className="text-5xl text-center">Welcome!</h1>
      <p className="text-center mt-4 mb-10">Thanks for visiting my website</p>

      <hr className="text-gray-300" />

      <div className="flex flex-col md:flex-row w-full p-6">
        <div className="flex-1 flex justify-center items-center p-2">
          <Image
            src="/images/web-search.png"
            alt="Image"
            width={500}
            height={500}
            className="object-contain w-full max-w-xs"
          />
        </div>

        <div className="flex-1 p-4 flex flex-col justify-center">
          <h2 className="text-3xl text-center pb-4">What is this?</h2>
          <p className="text-center">This is a Next.js application.</p>
        </div>
      </div>

      <hr className="text-gray-300" />

      <div className="flex flex-col-reverse md:flex-row w-full p-6">
        <div className="flex-1 p-4 flex flex-col justify-center">
          <h2 className="text-3xl text-center pb-4">Why I made this</h2>
          <p className="text-center">To learn Next.js</p>
        </div>
        <div className="flex-1 flex justify-center items-center p-2">
          <Image
            src="/images/working-at-home.png"
            alt="Image"
            width={500}
            height={500}
            className="object-contain w-full max-w-xs"
          />
        </div>
      </div>

      <hr className="text-gray-300" />

      <div className="flex flex-col md:flex-row w-full p-6">
        <div className="flex-1 flex justify-center items-center p-2">
          <Image
            src="/images/un-draw-1000.png"
            alt="Image"
            width={500}
            height={500}
            className="object-contain w-full max-w-sm"
          />
        </div>

        <div className="flex-1 p-4 flex flex-col justify-center">
          <h2 className="text-3xl text-center pb-4">
            From where did you get these images?
          </h2>
          <p className="text-center">
            From <a href="https://undraw.co/">Undraw.co</a>
          </p>
        </div>
      </div>
    </div>
  );
}
