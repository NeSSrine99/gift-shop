import axios from "axios";
import Image from "next/image";

export default async function ProductDetailsPage({ params }) {
  const { id } = params;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products/${id}?populate=*`
  );
  const product = res.data.data;

  return (
    <div className="my-20 px-5">
      <h1 className="text-2xl font-bold mb-6 text-center">{product.name}</h1>
      <div className="flex justify-center">
        <Image src={product.image} />
        <p> {product.price} </p>
      </div>
    </div>
  );
}
