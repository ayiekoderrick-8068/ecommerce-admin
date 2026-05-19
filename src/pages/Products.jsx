import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import useLocalProducts from "../hooks/useLocalProducts";
import ProductCard from "../Components/Product";
import SearchBar from "../Components/SearchBar";

function Products() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { products, updateProduct, deleteProduct } = useLocalProducts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category") || "All";
    setSelectedCategory(category);
  }, [location.search]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  };

  if (id) {
    const product = products.find(function (p) {
      return String(p.id) === String(id);
    });

    if (!product) {
      return <p style={{ padding: "20px" }}>Loading...</p>;
    }

    function handleEdit() {
      setForm({
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        description: product.description,
      });
      setEditing(true);
    }

    function handleSave(e) {
      e.preventDefault();
      const updatedProduct = {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        description: form.description,
      };
      updateProduct(id, updatedProduct);
      setEditing(false);
    }

    function handleDelete() {
      const confirmed = window.confirm("Are you sure you want to delete " + product.name + "?");
      if (!confirmed) return;
      deleteProduct(id);
      navigate("/products");
    }

    return (
      <div style={{ padding: "24px", maxWidth: "560px", margin: "0 auto" }}>
        <Link to="/products" style={{ color: "#4f46e5", textDecoration: "none", fontSize: "14px" }}>
          ← Back to Products
        </Link>

        {editing ? (
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "20px" }}>
            <h2>Edit Product</h2>
            <input placeholder="Name" value={form.name} onChange={function (e) { setForm({ ...form, name: e.target.value }); }} style={inputStyle} />
            <input type="number" placeholder="Price" value={form.price} onChange={function (e) { setForm({ ...form, price: e.target.value }); }} style={inputStyle} />
            <input placeholder="Category" value={form.category} onChange={function (e) { setForm({ ...form, category: e.target.value }); }} style={inputStyle} />
            <input type="number" placeholder="Stock" value={form.stock} onChange={function (e) { setForm({ ...form, stock: e.target.value }); }} style={inputStyle} />
            <textarea placeholder="Description" value={form.description} onChange={function (e) { setForm({ ...form, description: e.target.value }); }} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={{ padding: "10px 20px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Save Changes</button>
              <button type="button" onClick={function () { setEditing(false); }} style={{ padding: "10px 20px", background: "#6b7280", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Cancel</button>
            </div>
          </form>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <img
              src={product.image || "https://via.placeholder.com/420x260.png?text=Product"}
              alt={product.name}
              style={{ width: "100%", maxHeight: "320px", objectFit: "cover", borderRadius: "12px", marginBottom: "16px" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h1 style={{ margin: 0 }}>{product.name}</h1>
              <span style={{ background: "#e0e7ff", color: "#4f46e5", padding: "4px 12px", borderRadius: "20px", fontSize: "13px" }}>{product.category}</span>
            </div>
            <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#111", margin: "12px 0" }}>KSh {product.price}</p>
            {product.description && <p style={{ color: "#6b7280", marginBottom: "16px" }}>{product.description}</p>}
            <p style={{ marginBottom: "24px" }}>
              <strong>Stock: </strong>
              <span style={{ color: product.stock > 10 ? "#10b981" : product.stock > 0 ? "#f59e0b" : "#ef4444" }}>
                {product.stock} units
              </span>
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleEdit} style={{ padding: "10px 20px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Edit</button>
              <button onClick={handleDelete} style={{ padding: "10px 20px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Delete</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const allCategories = products.map(function (product) { return product.category; });
  const uniqueCategories = ["All", ...Array.from(new Set(allCategories)).filter(Boolean)];

  const filteredProducts = products.filter(function (product) {
    const nameMatches = product.name.toLowerCase().includes(search.toLowerCase());
    const categoryMatches = selectedCategory === "All" || product.category === selectedCategory;
    return nameMatches && categoryMatches;
  });

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ margin: 0 }}>Products</h1>
        <span style={{ color: "#6b7280", fontSize: "14px" }}>
          {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <SearchBar search={search} setSearch={setSearch} />
        <select
          value={selectedCategory}
          onChange={function (e) { setSelectedCategory(e.target.value); }}
          style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc", cursor: "pointer", fontSize: "14px" }}
        >
          {uniqueCategories.map(function (category) { return <option key={category}>{category}</option>; })}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
        {filteredProducts.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No products found.</p>
        ) : (
          filteredProducts.map(function (product) { return <ProductCard key={product.id} product={product} />; })
        )}
      </div>
    </div>
  );
}

export default Products;
