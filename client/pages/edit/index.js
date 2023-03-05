import React, { useEffect, useState } from "react";
import { withAuth } from "../../hoc/withAuth";
import AddProduct from "../../components/AddProduct";
import { useRouter } from "next/router";
import ProductList from "@/components/ProductList";
import { Button, Tabs, Tooltip, Icon } from "antd";
import { TbLogout } from "react-icons/tb";
import { API_URL } from "@/config";
import ScrapeProduct from "@/components/ScrapeProduct";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const { TabPane } = Tabs;

function index() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  async function fetchProducts() {
    try {
      const res = await fetch(`${API_URL}/product/all`);
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
    <div className="font-mandali w-5/6 md:w-3/5 mr-auto ml-auto relative">
      <Tabs>
        <TabPane tab="Product Overview" key="1">
          <ProductList products={products} onProductChanged={fetchProducts} />
        </TabPane>
        <TabPane tab="Add Product" key="2" className="flex flex-col gap-5">
          <div>
            <p className="text-xl text-center pb-2">Manual</p>
            <AddProduct onAddProduct={fetchProducts} />
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 pb-1">
              <p className="text-xl text-center ">Scrape</p>
              <Tooltip title="Scrape product information from Restocks.net using SKU & Size.">
                <AiOutlineQuestionCircle className="text-slate-400" />
              </Tooltip>
            </div>
            <ScrapeProduct onProductAdded={fetchProducts} />
          </div>
        </TabPane>
      </Tabs>
      <Button
        onClick={handleLogout}
        shape="round"
        className="absolute top-2 right-0 flex items-center"
        type="text"
      >
        <TbLogout />
      </Button>
    </div>
  );
}

export default withAuth(index);
