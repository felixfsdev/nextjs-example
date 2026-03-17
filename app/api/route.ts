import sql from "@/lib/db";

export async function GET() {
  try {
    await sql`SELECT 1;`;

    return Response.json(
      { message: "Hello from api, db is working" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);

    return Response.json(
      { message: "Hello from api, db is not working" },
      { status: 500 },
    );
  }
}
