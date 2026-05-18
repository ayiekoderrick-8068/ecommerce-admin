import { Link, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import { useStore } from "../context/StoreContext";

function NavBar() {
  const location = useLocation();
  const store = useStore();
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function getLinkStyle(path) {
    const isActive = location.pathname === path;
    return {
      color: isActive ? "#fff" : "rgba(255, 255, 255, 0.75)",
      textDecoration: "none",
      fontWeight: isActive ? "bold" : "normal",
      borderBottom: isActive ? "2px solid #fff" : "2px solid transparent",
      paddingBottom: "2px",
    };
  }

  return (
    <nav
      ref={navRef}
      style={{
        background: "#111827",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        gap: "32px",
        flexWrap: "wrap",
      }}
    >
      <span style={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
        {store ? store.name : "Wetin-Mart"}
      </span>
      <Link to="/" style={getLinkStyle("/")}>Home</Link>
      <Link to="/categories" style={getLinkStyle("/categories")}>Categories</Link>
      <Link to="/products" style={getLinkStyle("/products")}>Products</Link>
      <Link to="/cart" style={getLinkStyle("/cart")}>Cart</Link>
      <Link to="/orders" style={getLinkStyle("/orders")}>Orders</Link>
    </nav>
  );
}

export default NavBar;
