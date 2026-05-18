import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const saved = localStorage.getItem("cart");
  const [cart, setCart] = useState(saved ? JSON.parse(saved) : []);
  const [ordered, setOrdered] = useState(false);
  const navigate = useNavigate();

  function removeItem(id) {
    const updated = cart.filter(function (item) {
      return item.id !== id;
    });
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  function handleOrderNow() {
    const existingOrders = localStorage.getItem("orders");
    const orders = existingOrders ? JSON.parse(existingOrders) : [];

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: cart,
      total: total,
      status: "Processing",
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    setCart([]);
    localStorage.removeItem("cart");
    setOrdered(true);

    setTimeout(function () {
      navigate("/orders");
    }, 2000);
  }

  const total = cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px" }}>Cart</h1>

      {ordered && (
        <div
          style={{
            background: "#d1fae5",
            color: "#065f46",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          Order placed successfully! Redirecting to orders...
        </div>
      )}

      {cart.length === 0 ? (
        <p style={{ color: "#6b7280" }}>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(function (item) {
            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <h3 style={{ margin: "0 0 4px 0" }}>{item.name}</h3>
                  <p style={{ margin: 0, color: "#6b7280" }}>
                    KSh {item.price} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={function () { removeItem(item.id); }}
                  style={{
                    padding: "6px 14px",
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <h2>Total: KSh {total}</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={clearCart}
                style={{
                  padding: "10px 20px",
                  background: "#6b7280",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Clear Cart
              </button>
              <button
                onClick={handleOrderNow}
                style={{
                  padding: "10px 20px",
                  background: "#4f46e5",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
