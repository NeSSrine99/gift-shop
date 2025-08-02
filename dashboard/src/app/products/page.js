"use client";

import { useState, useEffect } from "react";
import api from "../../lib/api";

import ProductHeader from "./components/ProductHeader";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    available: false,
    event_type_id: null,
    product_type_id: null,
    file: null,
  });

  useEffect(() => {
    fetchProducts();
    fetchEventTypes();
    fetchProductTypes();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get(
        "/products?populate[0]=image&populate[1]=event_type&populate[2]=product_type"
      );

      console.log("API response:", res.data);

      const fetched = res.data.data.map((item) => {
        const firstImage =
          item.image && Array.isArray(item.image) && item.image.length > 0
            ? item.image[0]
            : null;

        return {
          id: item.documentId || item.id,
          name: item.name || "No name",
          description:
            Array.isArray(item.description) && item.description.length > 0
              ? item.description
                  .map((block) =>
                    block.children?.map((child) => child.text).join("")
                  )
                  .join("\n")
              : item.description || "",

          price: item.price || 0,
          available: item.available || false,
          quantity: item.quantity || 0,

          event_type: item.event_type || null,
          product_type: item.product_type || null,

          image: firstImage
            ? firstImage.url.startsWith("http")
              ? firstImage.url
              : `http://localhost:1337${firstImage.url}`
            : "",
        };
      });

      setProducts(fetched);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchEventTypes = async () => {
    try {
      const res = await api.get("/event-types");
      console.log("Event types API response:", res.data);
      setEventTypes(res.data.data);
    } catch (err) {
      console.error("Error fetching event types:", err);
    }
  };

  const fetchProductTypes = async () => {
    try {
      const res = await api.get("/product-types");
      const formatted = res.data.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setProductTypes(formatted);
    } catch (err) {
      console.error("Error fetching product types:", err);
    }
  };

  const openAddModal = () => {
    setNewProduct({
      name: "",
      price: "",
      image: "",
      description: "",
      available: false,
      event_type_id: null,
      product_type_id: null,
      file: null,
    });
    setEditingProductId(null);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setNewProduct({
      ...product,
      event_type_id: product.event_type?.id || null,
      product_type_id: product.product_type?.id || null,
    });
    setEditingProductId(product.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting product with ID:", id);
      await api.delete(`/products/${id}`);

      fetchProducts();
    } catch (err) {
      console.error(
        "Error deleting product:",
        err.response?.data || err.message
      );
    }
  };

  const handleSaveProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.price) {
        alert("Name and price are required.");
        return;
      }

      let imageId = null;

      if (newImageFile) {
        const uploaded = await uploadImage(newImageFile);
        imageId = uploaded.id;
      } else if (existingImageId) {
        imageId = existingImageId;
      }

      const data = {
        name: newProduct.name,
        slug: newProduct.name.toLowerCase().replace(/\s+/g, "-"),
        price: parseFloat(newProduct.price),
        description: newProduct.description || "",
        available: Boolean(newProduct.available),
        image: imageId,
        event_type: newProduct.event_type_id
          ? { connect: [{ id: parseInt(newProduct.event_type_id) }] }
          : undefined,
        product_type: newProduct.product_type_id
          ? { connect: [{ id: parseInt(newProduct.product_type_id) }] }
          : undefined,
      };

      console.log("✅ Data sent to Strapi:", JSON.stringify({ data }, null, 2));

      if (editingProductId) {
        await api.put(`/products/${editingProductId}`, { data });
      } else {
        await api.post("/products", { data });
      }

      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error("🚨 Full error:", err);
      if (err.response?.data?.error) {
        console.error(
          "📛 Strapi Error:",
          JSON.stringify(err.response.data.error, null, 2)
        );
      } else {
        console.error("📛 Unknown error:", err);
      }

      alert("Failed to save product. Check console.");
    }
  };

  return (
    <div>
      <ProductHeader onAdd={openAddModal} />
      <ProductTable
        products={products}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />
      <ProductForm
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveProduct}
        product={newProduct}
        setProduct={setNewProduct}
        editingId={editingProductId}
        eventTypes={eventTypes}
        productTypes={productTypes}
      />
    </div>
  );
}
