import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET all products (public, optional)
export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const products = await db.collection("products").find({}).toArray();
  return NextResponse.json(products);
}

// POST new product (protected)
export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const newProduct = {
      name: String(body.name).trim(),
      category: String(body.category).trim(),
      mrp: Number(body.mrp), // convert to number
      purchasePrice: Number(body.purchasePrice), // convert to number
      description: String(body.description || "").trim(),
      quantity: Number(body.quantity) || 0, // fallback to 0
      image: body.image ? String(body.image) : null, // allow null
      createdAt: new Date(),
      userEmail: String(body.userEmail),// track who added it
    };

    const result = await db.collection("products").insertOne(newProduct);

    return NextResponse.json(
      { success: true, id: result.insertedId, message: "Product added successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
