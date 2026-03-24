import Spinner from "./Spinner";

export default function WorkInProgress() {
  return (
    <div className="flex flex-col items-center w-full p-4 mt-8">
      <h1 className="text-4xl text-center mb-4">Work in progress 🏗️</h1>
      <p className="text-center">
        This page is currently work in progress. Please return later.
      </p>
      <br />
      <Spinner />
    </div>
  );
}
