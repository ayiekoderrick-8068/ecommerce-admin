import { useState, useEffect } from "react";
import { initialProducts } from "../data/products";

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
