import ProductCard from "@/components/ui/ProductCard";
import axios from "axios";
import Link from "next/link";

export default async function ProductsPage() {
  const res = await axios.get("http://localhost:1337/api/products?populate=*");
  const products = res.data.data;

  return (
    <div className="my-20">
      <h1 className="text-2xl font-semibold text-center mb-20">Products</h1>
      <ul className="flex flex-wrap items-center justify-center gap-5">
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
