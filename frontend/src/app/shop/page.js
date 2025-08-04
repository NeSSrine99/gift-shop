"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import FilterBar from "./components/FilterBar";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const [selectedEventType, setSelectedEventType] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState(null);

  const fetchEventTypes = async () => {
    const res = await axios.get("http://localhost:1337/api/event-types");
    setEventTypes(res.data.data);
  };

  const fetchProductTypes = async () => {
    const res = await axios.get("http://localhost:1337/api/product-types");
    setProductTypes(res.data.data);
  };

  const fetchFilteredProducts = async () => {
    const filters = [];

    if (selectedEventType) {
      filters.push(`filters[event_type][id][$eq]=${selectedEventType}`);
    }

    if (selectedProductType) {
      filters.push(`filters[product_type][id][$eq]=${selectedProductType}`);
    }

    const query = filters.length ? `&${filters.join("&")}` : "";
    const res = await axios.get(
      `http://localhost:1337/api/products?populate=*&${query}`
    );
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchEventTypes();
    fetchProductTypes();
    fetchFilteredProducts();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, [selectedEventType, selectedProductType]);

  return (
    <div className="flex flex-col items-center gap-6 pb-20 bg-bg">
      <Breadcrumb items={[{ href: "/" }, { label: "Shop" }]} />

      <FilterBar
        eventTypes={eventTypes}
        productTypes={productTypes}
        selectedEventType={selectedEventType}
        selectedProductType={selectedProductType}
        onEventTypeChange={setSelectedEventType}
        onProductTypeChange={setSelectedProductType}
      />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/shop/${product.slug}`}>
              <ProductCard product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
