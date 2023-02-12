import React, { useEffect, useState } from "react";
import { withAuth } from "../../hoc/withAuth";
import AddProduct from "../../components/addProduct";
import { useRouter } from "next/router";
import ProductList from "@/components/ProductList";
function index() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  async function fetchProducts() {
    try {
      const res = await fetch("http://localhost:3000/product/all");
      const data = await res.json();
      setProducts(data);
      console.log("From index" + data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <AddProduct onAddProduct={fetchProducts} />
      <ProductList products={products} onProductChanged={fetchProducts} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default withAuth(index);
