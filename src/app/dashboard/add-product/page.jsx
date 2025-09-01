// app/dashboard/add-product/page.jsx
import { redirect } from "next/navigation";
// import { requireAuth } from "@/lib/auth";
import AddProductForm from "../components/AddProductForm";
import Breadcrumb from "@/app/components/Breadcrumb";
import Image from "next/image";
import { getServerSession } from "next-auth";

export default async function AddProductPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login"); // Redirect unauthenticated users
  }

  return (
    <div className="min-w-full mx-auto p-6 px-15">
      <Breadcrumb />
      <div className="flex gap-5">
        <AddProductForm />
        <div className="flex-1  hidden lg:block">
          <Image
            src="/add-product.svg"
            alt="Add Product Illustration"
            width={400}
            height={400}
            className="w-200 h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
