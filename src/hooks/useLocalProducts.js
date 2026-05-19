import { useState, useEffect } from "react";

const embeddedProducts = [
  {
    id: "1",
    name: "Vanilla Bean",
    price: 850,
    category: "Coffee & Beverages",
    stock: 50,
    description: "Medium Roast, nutty flavor",
    origin: "Columbia",
  },
  {
    id: "2",
    name: "House Blend",
    price: 950,
    category: "Coffee & Beverages",
    stock: 45,
    description: "Dark Roast, Rich flavor",
    origin: "Vietnam",
  },
  {
    id: "3",
    name: "Wireless Headphones",
    price: 149,
    category: "Electronics & Tech",
    stock: 35,
    description: "Noise cancelling over-ear headphones with 30hr battery life.",
  },
  {
    id: "4",
    name: "Coffee Maker",
    price: 59,
    category: "Kitchen & Appliances",
    stock: 20,
    description: "12-cup programmable coffee maker with auto shut-off.",
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    price: 119,
    category: "Electronics & Tech",
    stock: 18,
    description: "Compact TKL mechanical keyboard with RGB backlight.",
  },
  {
    id: "6",
    name: "Yoga Mat",
    price: 35,
    category: "Sports & Fitness",
    stock: 60,
    description: "Non-slip eco-friendly yoga mat, 6mm thick.",
  },
  {
    id: "7",
    name: "Desk Lamp",
    price: 45,
    category: "Home & Office",
    stock: 25,
    description: "LED desk lamp with adjustable brightness and USB charging port.",
  },
  {
    id: "8",
    name: "Backpack",
    price: 75,
    category: "Travel & Accessories",
    stock: 40,
    description: "Water resistant 30L backpack with laptop compartment.",
  },
];

function readAdded() {
  try {
    return JSON.parse(localStorage.getItem("addedProducts") || "[]");
  } catch (e) {
    return [];
  }
}

function readDeleted() {
  try {
    return JSON.parse(localStorage.getItem("deletedProducts") || "[]");
  } catch (e) {
    return [];
  }
}

function useLocalProducts() {
  const [products, setProducts] = useState(() => {
    const added = readAdded();
    const deleted = readDeleted();
    return [...embeddedProducts.filter((p) => !deleted.includes(String(p.id))), ...added];
  });

  useEffect(() => {
    function updateProducts() {
      const added = readAdded();
      const deleted = readDeleted();
      setProducts([...embeddedProducts.filter((p) => !deleted.includes(String(p.id))), ...added]);
    }

    window.addEventListener("storage", updateProducts);
    window.addEventListener("products-updated", updateProducts);
    return () => {
      window.removeEventListener("storage", updateProducts);
      window.removeEventListener("products-updated", updateProducts);
    };
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
    const deleted = readDeleted();
    setProducts([...embeddedProducts.filter((p) => !deleted.includes(String(p.id))), ...added]);
  }

  function updateProduct(id, updatedFields) {
    const added = readAdded();
    const idx = added.findIndex((p) => String(p.id) === String(id));
    if (idx !== -1) {
      added[idx] = { ...added[idx], ...updatedFields };
      persistAdded(added);
      const deleted = readDeleted();
      setProducts([...embeddedProducts.filter((p) => !deleted.includes(String(p.id))), ...added]);
      return;
    }

    // If it's an embedded product, create an override in addedProducts
    const embedded = embeddedProducts.find((p) => String(p.id) === String(id));
    if (embedded) {
      const override = { ...embedded, ...updatedFields, id: String(Date.now()) };
      added.push(override);
      persistAdded(added);
      const deleted = readDeleted();
      setProducts([...embeddedProducts.filter((p) => !deleted.includes(String(p.id))), ...added]);
    }
  }

  function deleteProduct(id) {
    // Remove from addedProducts if exists
    let added = readAdded();
    const wasAdded = added.some((p) => String(p.id) === String(id));
    if (wasAdded) {
      added = added.filter((p) => String(p.id) !== String(id));
      persistAdded(added);
      const deleted = readDeleted();
      setProducts([...embeddedProducts.filter((p) => !deleted.includes(String(p.id))), ...added]);
      return;
    }

    // For embedded product, mark as deleted
    const deleted = readDeleted();
    if (!deleted.includes(String(id))) deleted.push(String(id));
    persistDeleted(deleted);
    const addedNow = readAdded();
    setProducts([...embeddedProducts.filter((p) => !deleted.includes(String(p.id))), ...addedNow]);
  }

  return { products, addProduct, updateProduct, deleteProduct, setProducts };
}

export default useLocalProducts;
