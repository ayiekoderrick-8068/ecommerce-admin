import { Link } from "react-router-dom";
import useFetchProducts from "../hooks/useFetchProducts";

function Home() {
  const [products] = useFetchProducts("http://localhost:3001/products");

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
