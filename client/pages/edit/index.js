import React from "react";
import { withAuth } from "../../hoc/withAuth";
import AddProduct from "../../components/addProduct";
import { useRouter } from "next/router";
import ProductList from "@/components/ProductList";
function index() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <div>
      <AddProduct />
      <ProductList />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default withAuth(index);
