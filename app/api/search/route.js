import pool from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  const result = await pool.query(
    "SELECT * FROM plates WHERE plate ILIKE $1 LIMIT 50",
    [`%${query}%`]
  );

  return Response.json(result.rows);
}
