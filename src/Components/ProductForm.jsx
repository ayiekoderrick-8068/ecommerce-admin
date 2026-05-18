function ProductForm({ name, price, setName, setPrice, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
      />
      <button type="submit" style={{ padding: "8px 16px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;
