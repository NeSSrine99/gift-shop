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
      const res = await api.get("/products?populate=image");

      console.log("API response:", res.data);

      const fetched = res.data.data.map((item) => {
        const firstImage =
          item.image && Array.isArray(item.image) && item.image.length > 0
            ? item.image[0]
            : null;

        return {
          id: item.documentId,
          name: item.name || "No name",
          description:
            Array.isArray(item.description) && item.description.length > 0
              ? item.description
                  .map((block) =>
                    block.children.map((child) => child.text).join("")
                  )
                  .join("\n")
              : "",
          price: item.price || 0,
          available: item.available || false,
          event_type_name: "-",
          product_type_id: null,
          product_type_name: "-",
          image: firstImage ? "http://localhost:1337" + firstImage.url : "",
          quantity: item.quantity || 0,
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
        name: item.attributes.name,
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
    console.log("Editing product:", product);

    if (!product?.id) {
      console.error("Product has no valid ID for editing");
      return;
    }
    setNewProduct(product);
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
      let imageId = null;

      if (newProduct.file) {
        const formData = new FormData();
        formData.append("files", newProduct.file);
        const uploadRes = await api.post("/upload", formData);
        imageId = uploadRes.data[0]?.id;
      }

      const parsedDescription =
        typeof newProduct.description === "string"
          ? [
              {
                type: "paragraph",
                children: [{ type: "text", text: newProduct.description }],
              },
            ]
          : newProduct.description;

      const data = {
        name: newProduct.name,
        description: parsedDescription,
        price: parseFloat(newProduct.price),
        available: newProduct.available,
        event_type: newProduct.event_type_id,
        product_type: newProduct.product_type_id,
        image: imageId ? [imageId] : [],
      };

      console.log("Data to send:", JSON.stringify(data, null, 2));
      console.log("Editing product ID:", editingProductId);

      if (editingProductId) {
        await api.put(`/products/${editingProductId}`, { data });
      } else {
        await api.post("/products", { data });
      }

      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error("Full error saving product:", err);
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
