import { useState, useEffect } from "react";

const initialProducts = [
  {
    id: "1",
    name: "Vanilla Bean",
    price: 10.00,
    category: "Coffee",
    stock: 50,
    description: "Medium Roast, nutty flavor",
    origin: "Columbia",
  },
  {
    id: "2",
    name: "House Blend",
    price: 12.00,
    category: "Coffee",
    stock: 45,
    description: "Dark Roast, Rich flavor",
    origin: "Vietnam",
  },
];

function useFetchProducts(url) {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setProducts(data);
      })
      .catch(function (error) {
        console.log("Failed to fetch products from server, using initial data");
        setProducts(initialProducts);
      });
  }, [url]);

  return [products, setProducts];
}

export default useFetchProducts;
