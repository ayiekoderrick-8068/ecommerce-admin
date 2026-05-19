function Product({ product }) {
  let stockColor = "#10b981";

  if (product.stock <= 20) {
    stockColor = "#f59e0b";
  }

  if (product.stock <= 5) {
    stockColor = "#ef4444";
  }

  function addToCart() {
    const saved = localStorage.getItem("cart");
    const cart = saved ? JSON.parse(saved) : [];

    const existing = cart.find(function (item) {
      return item.id === product.id;
    });

    if (existing) {
      existing.quantity = existing.quantity + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.name + " added to cart!");
  }

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "18px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <img
        src={product.image || "https://via.placeholder.com/420x260.png?text=Product"}
        alt={product.name}
        style={{ width: "100%", borderRadius: "10px", objectFit: "cover", height: "180px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            background: "#e0e7ff",
            color: "#4f46e5",
            padding: "3px 10px",
            borderRadius: "20px",
            fontSize: "12px",
          }}
        >
          {product.category || "Uncategorized"}
        </span>
        <span style={{ fontSize: "12px", color: stockColor, fontWeight: "bold" }}>
          Stock: {product.stock}
        </span>
      </div>

      <h3 style={{ margin: 0 }}>{product.name}</h3>

      {product.description && (
        <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>
          {product.description}
        </p>
      )}

      <p style={{ fontWeight: "bold", fontSize: "1.1rem", margin: 0 }}>
        KSh {product.price}
      </p>

      <button
        onClick={addToCart}
        style={{
          marginTop: "auto",
          padding: "8px",
          background: "#10b981",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
