import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([{ plate: "TEST123", id: 1 }]);
}