import { Link } from "react-router-dom";

const coffeeProducts = [
  {
    id: "1",
    name: "Vanilla Bean",
    price: 850,
    category: "Coffee",
    stock: 50,
    description: "Medium Roast, nutty flavor",
    origin: "Columbia",
  },
  {
    id: "2",
    name: "House Blend",
    price: 950,
    category: "Coffee",
    stock: 45,
    description: "Dark Roast, Rich flavor",
    origin: "Vietnam",
  },
  {
    id: "3",
    name: "Wireless Headphones",
    price: 149,
    category: "Electronics",
    stock: 35,
    description: "Noise cancelling over-ear headphones with 30hr battery life.",
  },
  {
    id: "4",
    name: "Coffee Maker",
    price: 59,
    category: "Kitchen",
    stock: 20,
    description: "12-cup programmable coffee maker with auto shut-off.",
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    price: 119,
    category: "Electronics",
    stock: 18,
    description: "Compact TKL mechanical keyboard with RGB backlight.",
  },
  {
    id: "6",
    name: "Yoga Mat",
    price: 35,
    category: "Fitness",
    stock: 60,
    description: "Non-slip eco-friendly yoga mat, 6mm thick.",
  },
  {
    id: "7",
    name: "Desk Lamp",
    price: 45,
    category: "Home",
    stock: 25,
    description: "LED desk lamp with adjustable brightness and USB charging port.",
  },
  {
    id: "8",
    name: "Backpack",
    price: 75,
    category: "Accessories",
    stock: 40,
    description: "Water resistant 30L backpack with laptop compartment.",
  },
];

function Home() {
  const embeddedProducts = coffeeProducts;
  const addedProducts = JSON.parse(localStorage.getItem("addedProducts") || "[]");
  const products = [...embeddedProducts, ...addedProducts];

  const totalProducts = products.length;

  const totalStock = products.reduce(function (total, product) {
    return total + Number(product.stock || 0);
  }, 0);

  const allCategories = products.map(function (product) {
    return product.category;
  });
  const uniqueCategories = [...new Set(allCategories)].filter(Boolean);

  return (
    <div style={{ padding: "40px 24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>Welcome to Wetin-Mart</h1>
      <p style={{ color: "#6b7280", marginBottom: "32px" }}>
        Manage your products, track inventory, and keep your store up to date.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <div style={{ background: "#f0f4ff", borderRadius: "10px", padding: "20px" }}>
          <p style={{ color: "#6b7280", marginBottom: "4px" }}>Total Products</p>
          <h2 style={{ fontSize: "2rem", color: "#4f46e5", margin: 0 }}>{totalProducts}</h2>
        </div>

        <div style={{ background: "#f0fdf4", borderRadius: "10px", padding: "20px" }}>
          <p style={{ color: "#6b7280", marginBottom: "4px" }}>Total Stock</p>
          <h2 style={{ fontSize: "2rem", color: "#10b981", margin: 0 }}>{totalStock}</h2>
        </div>

        <div style={{ background: "#fff7ed", borderRadius: "10px", padding: "20px" }}>
          <p style={{ color: "#6b7280", marginBottom: "4px" }}>Categories</p>
          <h2 style={{ fontSize: "2rem", color: "#f59e0b", margin: 0 }}>{uniqueCategories.length}</h2>
        </div>
      </div>

      <h2 style={{ marginBottom: "16px" }}>Quick Actions</h2>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <Link
          to="/products"
          style={{
            padding: "12px 24px",
            background: "#4f46e5",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          View Products
        </Link>
        <Link
          to="/add-product"
          style={{
            padding: "12px 24px",
            background: "#10b981",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          + Add Product
        </Link>
      </div>
    </div>
  );
}

export default Home;
