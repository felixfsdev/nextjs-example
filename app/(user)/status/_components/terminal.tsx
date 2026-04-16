import prisma from "@/lib/prisma";

export default async function Terminal() {
  let error = false;
  let userCount = null;
  let postCount = null;

  try {
    userCount = await prisma.user.count();
    postCount = await prisma.user.count();
  } catch {
    error = true;
  }

  return (
    <div className="rounded-xl bg-gray-800 p-4 my-4 font-mono text-yellow-200">
      {error ? (
        <p>Error</p>
      ) : (
        <>
          <p>Registered users: {userCount}</p>
          <p>Uploaded posts: {postCount}</p>
        </>
      )}
    </div>
  );
}
