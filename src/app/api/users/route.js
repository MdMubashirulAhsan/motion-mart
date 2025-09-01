// /app/api/users/route.js
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  // ✅ Only allow admins
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const users = await db
    .collection("users")
    .find({}, { projection: { password: 0 } }) // exclude password
    .toArray();

  return NextResponse.json(users);
}
