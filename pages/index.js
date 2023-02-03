import Head from "next/head";
import {
  BsFillSunFill,
  BsFillMoonStarsFill,
  BsClipboardCheck,
} from "react-icons/bs";
import { MdClear } from "react-icons/md";
import { BiCopy } from "react-icons/bi";
import { useState } from "react";
import { Modal, Spin, Select, Button } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";

const { Option } = Select;

export default function Home() {
  const data = [
    {
      id: 0,
      sku: "GX6947",
      name: "adidas Adilette Slide Carbon Aluminium",
      size: "38",
      product_url:
        "https://restocks.net/nl/p/adidas-adilette-slides-carbon-aluminium",
      image_url:
        "https://media.restocks.net/products/GX6947/adidas-adilette-slides-carbon-aluminium-1-400.png",
      alt: "adidas-adilette-slides-carbon-aluminium",
    },
    {
      id: 1,
      sku: "DH6927-111",
      name: "Air Jordan 4 Retro Military Black",
      size: "42",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-military-black",
      image_url:
        "https://media.restocks.net/products/DH6927-111/air-jordan-4-retro-military-black-1-400.png",
      alt: "air-jordan-4-retro-military-black",
    },
    {
      id: 2,
      sku: "DH6927-140",
      name: "Air Jordan 4 Retro White Midnight Navy",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-white-midnight-navy",
      image_url:
        "https://media.restocks.net/products/DH6927-140/air-jordan-4-retro-white-midnight-navy-1-400.png",
      alt: "air-jordan-4-retro-white-midnight-navy",
    },
    {
      id: 3,
      sku: "553558-615",
      name: "Air Jordan 1 Low Bordeaux",
      size: "41",
      product_url: "https://restocks.net/nl/p/air-jordan-1-low-bordeaux",
      image_url:
        "https://media.restocks.net/products/553558-615/air-jordan-1-low-bordeaux-1-400.png",
      alt: "air-jordan-1-low-bordeaux",
    },
    {
      id: 4,
      sku: "DC0774-114",
      name: "Air Jordan 1 Low Marina Blue (W)",
      size: "36,5",
      product_url: "https://restocks.net/nl/p/air-jordan-1-low-marina-blue-w",
      image_url:
        "https://media.restocks.net/products/DC0774-114/air-jordan-1-low-marina-blue-w-1-400.png",
      alt: "air-jordan-1-low-marina-blue-w",
    },
    {
      id: 5,
      sku: "555088-711",
      name: "Air Jordan 1 Retro High OG Yellow Toe",
      size: "40",
      product_url:
        "https://restocks.net/nl/p/air-jordan-1-retro-high-og-yellow-toe",
      image_url:
        "https://media.restocks.net/products/555088-711/air-jordan-1-retro-high-og-yellow-toe-1-400.png",
      alt: "air-jordan-1-retro-high-og-yellow-toe",
    },
    {
      id: 6,
      sku: "555088-711",
      name: "Air Jordan 1 Retro High OG Yellow Toe",
      size: "40,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-1-retro-high-og-yellow-toe",
      image_url:
        "https://media.restocks.net/products/555088-711/air-jordan-1-retro-high-og-yellow-toe-1-400.png",
      alt: "air-jordan-1-retro-high-og-yellow-toe",
    },
    {
      id: 7,
      sku: "555088-711",
      name: "Air Jordan 1 Retro High OG Yellow Toe",
      size: "40,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-1-retro-high-og-yellow-toe",
      image_url:
        "https://media.restocks.net/products/555088-711/air-jordan-1-retro-high-og-yellow-toe-1-400.png",
      alt: "air-jordan-1-retro-high-og-yellow-toe",
    },
    {
      id: 10,
      sku: "555088-711",
      name: "Air Jordan 1 Retro High OG Yellow Toe",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-1-retro-high-og-yellow-toe",
      image_url:
        "https://media.restocks.net/products/555088-711/air-jordan-1-retro-high-og-yellow-toe-1-400.png",
      alt: "air-jordan-1-retro-high-og-yellow-toe",
    },
    {
      id: 11,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 12,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 13,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 14,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 15,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 16,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 17,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 18,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 19,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 20,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 21,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 22,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 23,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
    {
      id: 24,
      sku: "DH7138-006",
      name: "Jordan 4 Retro SE Black Canvas",
      size: "42,5",
      product_url:
        "https://restocks.net/nl/p/air-jordan-4-retro-se-black-canvas",
      image_url:
        "https://media.restocks.net/products/DH7138-006/air-jordan-4-retro-se-black-canvas-1-400.png",
      alt: "air-jordan-4-retro-se-black-canvas",
    },
  ];

  data.sort((a, b) => {
    const sizeA = parseFloat(a.size.replace(",", "."));
    const sizeB = parseFloat(b.size.replace(",", "."));
    return sizeA - sizeB;
  });
  const [products] = useState(data);

  const [darkMode, setDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizeChange = (sizes) => {
    setSelectedSizes(sizes);
  };

  const handleReset = () => {
    setSelectedSizes([]);
  };

  const handleImageClick = (product) => {
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
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link rel="icon" href="/bottledkicks.ico" />
      </Head>
      <main
        className="font-mandali dark:bg-gray-900 dark:text-white 
        text-center flex flex-col fixed overflow-y-scroll w-full h-full"
      >
        <section className="relative px-5 md:px-10 pb-[10vh] md:pb-[13vh] ">
          <nav className="dark:bg-gray-900 dark:text-white fixed top-0 left-0 right-0 z-10 flex justify-center items-center bg-white h-[7vh] md:h-[10vh] border-solid border-t-0 border-x-0 border-gray-100 dark:border-gray-800 ">
            <div className="flex items-center gap-1">
              <h1 className="text-2xl md:text-4xl font-[600]">Bottled Kicks</h1>
              <img
                src="/bottledkicks.png"
                alt="trainers"
                className="h-12 md:h-16"
              />
            </div>

            <div
              className={`absolute right-[1%] cursor-pointer text-lg md:text-2xl`}
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

        <section className="flex-1 md:mx-12 mb-20">
          <div className="flex justify-center flex-wrap ">
            {products
              .filter(
                (product) =>
                  !selectedSizes.length || selectedSizes.includes(product.size)
              )
              .map((product) => (
                <div
                  key={product.id}
                  className="group relative text-xs md:text-sm lg:text-lg cursor-pointer rounded-xl hover:bg-gray-100 hover:shadow-inner hover:delay-75 dark:hover:bg-gray-500  w-1/3 md:w-1/4 lg:w-1/6"
                >
                  <img
                    src={`https://images.weserv.nl/?url=${product.image_url}?fit=fill&w=300&h=214&fm=webp&auto=compress&trim=color&q=90&dpr=2`}
                    alt={`${product.alt}`}
                    onClick={() => handleImageClick(product)}
                    className="max-h-full max-w-full rounded-t-xl"
                  />

                  <p className="leading-1 md:leading-normal mx-1">
                    {product.name}
                  </p>
                  <span className="absolute top-1 left-2 font-bold bg-gray-100 group-hover:bg-white dark:group-hover:bg-gray-900 group-hover:delay-75 dark:bg-gray-700 rounded-lg p-1 tracking-tight ">
                    {product.size}
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
        </section>
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
            onClick={handleReset}
          ></Button>
        </section>
      </main>
    </div>
  );
}
