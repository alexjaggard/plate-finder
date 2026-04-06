import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const result = await pool.query(
      "SELECT * FROM plates WHERE plate ILIKE $1 LIMIT 10",
      [`%${query}%`]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}