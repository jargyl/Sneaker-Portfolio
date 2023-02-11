import React from "react";
import { withAuth } from "../../hoc/withAuth";
import AddProduct from "../../components/addProduct";
function index() {
  return (
    <div>
      <AddProduct />
    </div>
  );
}

export default withAuth(index);
