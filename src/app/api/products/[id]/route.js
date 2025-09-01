import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// import { requireAuth } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(params.id) });

    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}

// 🔹 PATCH (Admin only)
export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden - Admins only" },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const fieldsToUpdate = {
      ...(body.name && { name: String(body.name).trim() }),
      ...(body.category && { category: String(body.category).trim() }),
      ...(body.mrp !== undefined && { mrp: Number(body.mrp) }),
      ...(body.purchasePrice !== undefined && {
        purchasePrice: Number(body.purchasePrice),
      }),
      ...(body.description && { description: String(body.description).trim() }),
      ...(body.quantity !== undefined && { quantity: Number(body.quantity) }),
      ...(body.image ? { image: String(body.image) } : {}),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: fieldsToUpdate });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// 🔹 DELETE (Admin only)
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden - Admins only" },
      { status: 403 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}
