import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const products = await db.collection("products").find({}).toArray();
  return NextResponse.json(products);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const newProduct = {
      name: body.name,
      category: body.category,
      price: Number(body.price),
      description: body.description,
      quantity: Number(body.quantity || 0),
      img: body.img || null,
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(newProduct);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
