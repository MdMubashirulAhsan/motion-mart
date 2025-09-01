import Breadcrumb from "../components/Breadcrumb";
import ProductList from "./components/ProductList.jsx"; // Client Component

export default async function Page() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <div className="min-h-screen bg-background text-text py-6 px-3 md:px-7 lg:px-15">
      <Breadcrumb />
      <h1 className="text-3xl font-bold text-primary mb-6">Our Products</h1>

      <ProductList initialProducts={products} />
    </div>
  );
}
