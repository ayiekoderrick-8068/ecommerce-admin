import { useState, useEffect } from "react";

function useFetchProducts(url) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setProducts(data);
      });
  }, [url]);

  return [products, setProducts];
}

export default useFetchProducts;
