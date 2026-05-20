import { useState, useEffect } from "react";

const embeddedProducts = [
  {
    id: "1",
    name: "Vanilla Bean",
    price: 85,
    category: "Coffee & Beverages",
    stock: 50,
    description: "Medium Roast, nutty flavor",
    origin: "Columbia",
    image: "https://via.placeholder.com/420x260.png?text=Vanilla+Bean",
  },
  {
    id: "2",
    name: "House Blend",
    price: 95,
    category: "Coffee & Beverages",
    stock: 45,
    description: "Dark Roast, Rich flavor",
    origin: "Vietnam",
    image: "https://via.placeholder.com/420x260.png?text=House+Blend",
  },
  {
    id: "3",
    name: "Wireless Headphones",
    price: 149,
    category: "Electronics & Tech",
    stock: 35,
    description: "Noise cancelling over-ear headphones with 30hr battery life.",
    image: "https://via.placeholder.com/420x260.png?text=Wireless+Headphones",
  },
  {
    id: "4",
    name: "Coffee Maker",
    price: 59,
    category: "Kitchen & Appliances",
    stock: 20,
    description: "12-cup programmable coffee maker with auto shut-off.",
    image: "https://via.placeholder.com/420x260.png?text=Coffee+Maker",
  },  {
    id: "5",
    name: "Mechanical Keyboard",
    price: 119,
    category: "Electronics & Tech",
    stock: 18,
    description: "Compact TKL mechanical keyboard with RGB backlight.",
    image: "https://via.placeholder.com/420x260.png?text=Mechanical+Keyboard",
  },
  {
    id: "6",
    name: "Yoga Mat",
    price: 35,
    category: "Sports & Fitness",
    stock: 60,
    description: "Non-slip eco-friendly yoga mat, 6mm thick.",
    image: "https://via.placeholder.com/420x260.png?text=Yoga+Mat",
  },
  {
    id: "7",
    name: "Desk Lamp",
    price: 45,
    category: "Home & Office",
    stock: 25,
    description: "LED desk lamp with adjustable brightness and USB charging port.",
    image: "https://via.placeholder.com/420x260.png?text=Desk+Lamp",
  },
  {
    id: "8",
    name: "Backpack",
    price: 75,
    category: "Travel & Accessories",
    stock: 40,
    description: "Water resistant 30L backpack with laptop compartment.",
    image: "https://via.placeholder.com/420x260.png?text=Backpack",
  },
];

function readAdded() {
  try {
    return JSON.parse(localStorage.getItem("addedProducts") || "[]");
  } catch (e) {
    return [];
  }
}

const API_URL = "https://dummyjson.com/products?limit=50";

function readDeleted() {
  try {
    return JSON.parse(localStorage.getItem("deletedProducts") || "[]");
  } catch (e) {
    return [];
  }
}

function normalizeApiProduct(item) {
  return {
    id: `api-${item.id}`,
    name: item.title,
    price: item.price,
    category: item.category || "General",
    stock: item.stock ?? 25,
    description: item.description,
    origin: item.brand || "",
    image: item.images?.[0] || "https://via.placeholder.com/420x260.png?text=Product",
  };
}

function buildProductList(apiProducts = []) {
  const added = readAdded();
  const deleted = readDeleted();
  const addedIds = new Set(added.map((p) => String(p.id)));
  const apiIds = new Set(apiProducts.map((p) => String(p.id)));

  return [
    ...apiProducts.filter(
      (p) => !deleted.includes(String(p.id)) && !addedIds.has(String(p.id))
    ),
    ...embeddedProducts.filter(
      (p) =>
        !deleted.includes(String(p.id)) &&
        !addedIds.has(String(p.id)) &&
        !apiIds.has(String(p.id))
    ),
    ...added,
  ];
}

function useLocalProducts() {
  const [products, setProducts] = useState(() => buildProductList([]));
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    function updateProducts() {
      setProducts(buildProductList(apiProducts));
    }

    window.addEventListener("storage", updateProducts);
    window.addEventListener("products-updated", updateProducts);
    return () => {
      window.removeEventListener("storage", updateProducts);
      window.removeEventListener("products-updated", updateProducts);
    };
  }, [apiProducts]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
          ? data.products
          : [];

        if (items.length > 0) {
          const normalized = items.map(normalizeApiProduct);
          setApiProducts(normalized);
          setProducts(buildProductList(normalized));
        } else {
          setProducts(buildProductList([]));
        }
      })
      .catch(() => {
        setProducts(buildProductList([]));
      });
  }, []);

  function persistAdded(added) {
    localStorage.setItem("addedProducts", JSON.stringify(added));
    window.dispatchEvent(new Event("products-updated"));
  }

  function persistDeleted(deleted) {
    localStorage.setItem("deletedProducts", JSON.stringify(deleted));
    window.dispatchEvent(new Event("products-updated"));
  }

  function addProduct(product) {
    const added = readAdded();
    added.push(product);
    persistAdded(added);
    setProducts(buildProductList());
  }

  function updateProduct(id, updatedFields) {
    const added = readAdded();
    const idx = added.findIndex((p) => String(p.id) === String(id));
    if (idx !== -1) {
      added[idx] = { ...added[idx], ...updatedFields };
      persistAdded(added);
      setProducts(buildProductList());
      return;
    }

    const embedded = embeddedProducts.find((p) => String(p.id) === String(id));
    if (embedded) {
      const override = { ...embedded, ...updatedFields, id: String(id) };
      added.push(override);
      persistAdded(added);
      setProducts(buildProductList());
    }
  }

  function deleteProduct(id) {
    let added = readAdded();
    const wasAdded = added.some((p) => String(p.id) === String(id));
    if (wasAdded) {
      added = added.filter((p) => String(p.id) !== String(id));
      persistAdded(added);
      setProducts(buildProductList());
      return;
    }
    const deleted = readDeleted();
    if (!deleted.includes(String(id))) deleted.push(String(id));
    persistDeleted(deleted);
    setProducts(buildProductList());
  }

  return { products, addProduct, updateProduct, deleteProduct, setProducts };
}

export default useLocalProducts;
