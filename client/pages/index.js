import Head from "next/head";
import {
  BsFillSunFill,
  BsFillMoonStarsFill,
  BsClipboardCheck,
} from "react-icons/bs";
import { MdClear } from "react-icons/md";
import { BiCopy } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Modal, Spin, Select, Button } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBarReact from "simplebar-react";

const { Option } = Select;

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.API_URL}/product/all`);
      const products = await res.json();
      //Count quantity of products
      const productMap = products.reduce((acc, product) => {
        const key = `${product.sku}_${product.size}`;
        acc[key] = acc[key] ? acc[key] + 1 : 1;
        return acc;
      }, {});
      //Add quantity to products
      const filteredProducts = products.map((product) => {
        const key = `${product.sku}_${product.size}`;
        return {
          ...product,
          quantity: productMap[key],
        };
      });
      //Filter out duplicates
      const filteredItems = filteredProducts.filter((item, index, self) => {
        return (
          self.findIndex((t) => t.sku === item.sku && t.size === item.size) ===
          index
        );
      });
      //Sort products by size
      filteredItems.sort((a, b) => {
        const sizeA = parseFloat(a.size.replace(",", "."));
        const sizeB = parseFloat(b.size.replace(",", "."));
        return sizeA - sizeB;
      });
      setProducts(filteredItems);
    }
    fetchData();
  }, []);

  const [showQuantity] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleSizeChange = (sizes) => {
    setSelectedSizes(sizes);
  };

  const handleResetSizes = () => {
    setSelectedSizes([]);
  };

  const handleModalOpen = (product) => {
    setSelectedProduct(product);
    setLoading(true);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
    setLoading(false);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Bottled Kicks</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <main
        className="font-mandali dark:bg-gray-900 dark:text-white 
        text-center flex flex-col fixed w-full h-full"
      >
        <section className="relative px-5 md:px-10 pb-[5vh] md:pb-[10vh] ">
          <nav className="dark:bg-gray-900 dark:text-white fixed top-0 left-0 right-0 z-10 flex justify-center items-center bg-white h-[7vh] md:h-[10vh] border-solid border-t-0 border-x-0 border-b-2 border-gray-100 dark:border-gray-800 ">
            <div className="flex items-center gap-1 select-none cursor-pointer">
              <h1 className="text-2xl md:text-4xl font-[600]">Bottled Kicks</h1>
              <img
                src="/bottledkicks_400.png"
                alt="trainers"
                className="h-12 md:h-16"
              />
            </div>

            <div
              className={`fixed right-[1%] pr-3 cursor-pointer text-lg flex`}
              onClick={() => setDarkMode((prev) => !prev)}
            >
              {darkMode ? (
                <BsFillSunFill className="opacity-60" />
              ) : (
                <BsFillMoonStarsFill className="opacity-60" />
              )}
            </div>
          </nav>
        </section>

        <SimpleBarReact className="flex-1 md:mx-12 pb-16 pt-5 h-0">
          {isLoading && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Spin size="large" />
            </div>
          )}

          <div className="flex justify-center flex-wrap ">
            {products
              .filter(
                (product) =>
                  !selectedSizes.length || selectedSizes.includes(product.size)
              )
              .map((product) => (
                <div
                  key={product._id}
                  className="group relative text-xs md:text-sm lg:text-lg cursor-pointer rounded-xl hover:bg-gray-100 hover:shadow-inner hover:delay-75 dark:hover:bg-gray-500  w-1/3 md:w-1/4 lg:w-1/6"
                >
                  <img
                    src={`https://wsrv.nl/?url=${product.image_url}&h=100&dpr=2&l=6&output=webp`}
                    alt={`${product.alt}`}
                    onClick={() => handleModalOpen(product)}
                    className="max-h-full max-w-full rounded-t-xl"
                    onLoad={handleImageLoad}
                  />

                  <p className="leading-1 md:leading-normal mx-1">
                    {product.name}
                  </p>
                  <span className="absolute top-1 left-2 font-bold bg-gray-100 group-hover:bg-white dark:group-hover:bg-gray-900 group-hover:delay-75 dark:bg-gray-700 rounded-lg p-1 tracking-tight ">
                    <p className={showQuantity ? "group-hover:hidden" : ""}>
                      {product.size}
                    </p>
                    {showQuantity && (
                      <p className="hidden group-hover:block text-sm">
                        Quantity: {product.quantity}
                      </p>
                    )}
                  </span>
                </div>
              ))}
          </div>
          {selectedProduct && (
            <Modal
              title={null}
              open={selectedProduct !== null}
              onCancel={handleModalClose}
              width={800}
              footer={null}
            >
              <Spin spinning={loading}>
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-lg md:text-2xl font-mandali">
                    {selectedProduct.name}
                  </h1>
                  <h2 className="text-lg text-gray-400 font-mandali">
                    {selectedProduct.sku}
                  </h2>

                  <img
                    src={(selectedProduct?.image_url).replace("400", "1000")}
                    onLoad={() => setLoading(false)}
                    className="max-h-full max-w-full md:-mb-6"
                  />
                  <CopyToClipboard
                    text={`${selectedProduct.name} | ${selectedProduct.sku} | EU ${selectedProduct.size}`}
                    onCopy={handleCopy}
                  >
                    <div className="text-gray-400 hover:bg-gray-300 hover:text-white delay-75 p-2 cursor-pointer rounded-lg flex justify-center items-center">
                      {copied ? (
                        <BsClipboardCheck className="h-6 text-2xl"></BsClipboardCheck>
                      ) : (
                        <BiCopy className="h-6 text-2xl" />
                      )}
                    </div>
                  </CopyToClipboard>
                </div>
              </Spin>
            </Modal>
          )}
        </SimpleBarReact>
        <section className=" dark:text-white fixed bottom-0 left-0 right-0 flex justify-center">
          <Select
            mode="multiple"
            showArrow={true}
            showSearch={false}
            maxTagCount={"responsive"}
            style={{ width: 100, textAlign: "left", marginBottom: 20 }}
            placeholder="Size"
            onChange={handleSizeChange}
            value={selectedSizes}
            placement="topLeft"
          >
            {Array.from(new Set(products.map((product) => product.size))).map(
              (size) => (
                <Option key={size} value={size}>
                  {size}
                </Option>
              )
            )}
          </Select>
          <Button
            type="default"
            icon={<MdClear className="opacity-60" />}
            className="flex items-center justify-center p-2 ml-1"
            onClick={handleResetSizes}
          ></Button>
        </section>
      </main>
    </div>
  );
}
