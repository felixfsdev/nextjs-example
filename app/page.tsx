import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-4xl p-5">
      <div className="w-full max-w-xs p-6 mx-auto">
        <Image
          src="/images/out-of-office.png"
          alt="Image"
          width={500}
          height={500}
        />
      </div>
      <h1 className="text-4xl text-center">Welcome!</h1>
      <p className="text-center mt-4 mb-10">Thanks for visiting my website</p>
      <hr className="text-gray-300" />
    </div>
  );
}
