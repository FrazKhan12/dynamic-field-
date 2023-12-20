import React, { useEffect, useState } from "react";
import axios from "axios";

const Data = () => {
  const [products, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      if (response.data.products) {
        setData(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [products]);
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {products.map((d, index) => (
          <div
            key={index}
            className="mx-4 my-4 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
          >
            <img
              className="h-48 w-full object-cover object-center"
              src={d.thumbnail}
              alt="Product"
            />
            <div className="p-4">
              <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                {d.title}
              </h2>
              <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
                {d.description}
              </p>
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                  ${d.price}
                </p>
                <p className="text-base font-medium text-gray-500 line-through dark:text-gray-300">
                  $25.00
                </p>
                <p className="ml-auto text-base font-medium text-green-500">
                  {d.discountPercentage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      );
    </div>
  );
};

export default Data;
