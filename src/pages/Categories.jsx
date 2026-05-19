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

function Categories() {
  const products = coffeeProducts;

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
                to={"/products"}
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
