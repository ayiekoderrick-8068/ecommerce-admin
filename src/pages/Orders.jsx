import { useState } from "react";

function Orders() {
  const saved = localStorage.getItem("orders");
  const [orders] = useState(saved ? JSON.parse(saved) : []);

  return (
    <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px" }}>Orders</h1>

      {orders.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No orders yet.</p>
      ) : (
        <div>
          {orders.map(function (order) {
            return (
              <div
                key={order.id}
                style={{
                  padding: "16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <h3 style={{ margin: 0 }}>Order #{order.id}</h3>
                  <span
                    style={{
                      background: "#d1fae5",
                      color: "#065f46",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                    }}
                  >
                    {order.status || "Processing"}
                  </span>
                </div>

                <p style={{ color: "#6b7280", margin: "4px 0" }}>{order.date}</p>

                <div style={{ marginTop: "8px" }}>
                  {order.items.map(function (item) {
                    return (
                      <p key={item.id} style={{ margin: "2px 0", fontSize: "14px", color: "#374151" }}>
                        {item.name} x {item.quantity} — KSh {item.price * item.quantity}
                      </p>
                    );
                  })}
                </div>

                <p style={{ fontWeight: "bold", margin: "8px 0 0 0" }}>
                  Total: KSh {order.total}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;
