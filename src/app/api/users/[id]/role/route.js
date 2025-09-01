// // /app/api/users/[id]/role/route.js
// import clientPromise from "@/lib/mongodb";
// import { getServerSession } from "next-auth";
// // import { authOptions } from "../../auth/[...nextauth]/route";
// import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function PATCH(req, { params }) {
//   try {
//     const session = await getServerSession(authOptions);

//     // ✅ Only admin can update roles
//     if (!session || session.user.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const { role } = await req.json(); // expected { role: "admin" }
//     const client = await clientPromise;
//     const db = client.db(process.env.MONGODB_DB);

//     await db.collection("users").updateOne(
//       { _id: new ObjectId(params.id) },
//       { $set: { role } }
//     );

//     return NextResponse.json({ message: "Role updated successfully" });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
