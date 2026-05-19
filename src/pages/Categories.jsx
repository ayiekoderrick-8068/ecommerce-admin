import { Link } from "react-router-dom";
import useLocalProducts from "../hooks/useLocalProducts";

function Categories() {
  const { products } = useLocalProducts();

  const allCategories = products.map(function (product) {
    return product.category;
  });

  const uniqueCategories = [...new Set(allCategories)].filter(Boolean).sort();

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px" }}>Categories</h1>

      {uniqueCategories.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No categories found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {uniqueCategories.map(function (category) {
            const count = products.filter(function (product) {
              return product.category === category;
            }).length;

            return (
              <Link
                key={category}
                to={"/products?category=" + encodeURIComponent(category)}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#f0f4ff",
                    borderRadius: "10px",
                    padding: "24px",
                    textAlign: "center",
                    border: "1px solid #e0e7ff",
                  }}
                >
                  <h3 style={{ color: "#4f46e5", margin: "0 0 8px 0" }}>{category}</h3>
                  <p style={{ color: "#6b7280", margin: 0 }}>
                    {count} {count === 1 ? "product" : "products"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Categories;
