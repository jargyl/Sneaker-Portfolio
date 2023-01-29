import Head from "next/head";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const [pictures, setPictures] = useState([
    {
      id: 1,
      url: "https://media.restocks.net/products/CW1590-100/nike-dunk-low-retro-white-black-gs-1-400.png",
    },
    {
      id: 2,
      url: "https://media.restocks.net/products/DD1391-103/nike-dunk-low-grey-fog-1-400.png",
    },
    {
      id: 3,
      url: "https://media.restocks.net/products/DJ4695-122/air-jordan-1-mid-gym-red-black-white-gs-1-400.png",
    },
    {
      id: 4,
      url: "https://media.restocks.net/products/DN6998-700/air-jordan-1-low-snkrs-day-1-400.png",
    },
    {
      id: 5,
      url: "https://media.restocks.net/products/554724-411/air-jordan-1-mid-dark-teal-1-400.png",
    },
    {
      id: 6,
      url: "https://media.restocks.net/products/554724-411/air-jordan-1-mid-dark-teal-1-400.png",
    },
    {
      id: 7,
      url: "https://media.restocks.net/products/554724-411/air-jordan-1-mid-dark-teal-1-400.png",
    },
    {
      id: 8,
      url: "https://media.restocks.net/products/554724-411/air-jordan-1-mid-dark-teal-1-400.png",
    },
    {
      id: 9,
      url: "https://media.restocks.net/products/554724-411/air-jordan-1-mid-dark-teal-1-400.png",
    },
    {
      id: 10,
      url: "https://media.restocks.net/products/554724-411/air-jordan-1-mid-dark-teal-1-400.png",
    },
    {
      id: 11,
      url: "https://media.restocks.net/products/554724-411/air-jordan-1-mid-dark-teal-1-400.png",
    },
    {
      id: 12,
      url: "https://media.restocks.net/products/554724-411/air-jordan-1-mid-dark-teal-1-400.png",
    },
    {
      id: 13,
      url: "https://media.restocks.net/products/554724-411/air-jordan-1-mid-dark-teal-1-400.png",
    },
    {
      id: 14,
      url: "https://media.restocks.net/products/554724-411/air-jordan-1-mid-dark-teal-1-400.png",
    },
    {
      id: 15,
      url: "https://media.restocks.net/products/554724-411/air-jordan-1-mid-dark-teal-1-400.png",
    },
  ]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Sneaker Portfolio</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main
        className="bg-white font-mandali dark:bg-gray-900 dark:text-white 
        text-center min-h-screen flex flex-col"
      >
        <section className="px-5 md:px-10">
          <nav className="py-10 flex justify-between">
            <h1 className="text-xl font-[600]">Sneaker Portfolio</h1>
            <ul className=" flex items-center">
              <BsFillMoonStarsFill
                className="cursor-pointer text-2xl"
                onClick={() => setDarkMode((prev) => !prev)}
              />
            </ul>
          </nav>
        </section>
        <section className="flex-1">
          <div className="w-full flex justify-center flex-wrap items-stretch">
            {pictures.map((picture) => (
              <div key={picture.id} className="w-1/3 md:w-1/4 lg:w-1/6">
                <img
                  src={`https://images.weserv.nl/?url=${picture.url}?fit=fill&w=300&h=214&fm=webp&auto=compress&trim=color&q=90&dpr=2`}
                  alt={`picture ${picture.id}`}
                  className=""
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
