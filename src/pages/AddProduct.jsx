import { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      id: Date.now().toString(),
      name: name,
      price: Number(price),
      category: category,
      stock: Number(stock),
      description: description,
    };

    const savedProducts = JSON.parse(localStorage.getItem("addedProducts") || "[]");
    savedProducts.push(newProduct);
    localStorage.setItem("addedProducts", JSON.stringify(savedProducts));

    setName("");
    setPrice("");
    setCategory("");
    setStock("");
    setDescription("");
    setSuccess(true);
    setTimeout(function () {
      setSuccess(false);
    }, 3000);
  }

  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  };

  return (
    <div style={{ padding: "24px", maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px" }}>Add New Product</h1>

      {success && (
        <div
          style={{
            background: "#d1fae5",
            color: "#065f46",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          Product added successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "14px" }}
      >
        <input
          required
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={function (e) { setName(e.target.value); }}
          style={inputStyle}
        />
        <input
          required
          type="number"
          placeholder="Price (KSh)"
          value={price}
          onChange={function (e) { setPrice(e.target.value); }}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Category (e.g. Electronics)"
          value={category}
          onChange={function (e) { setCategory(e.target.value); }}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Stock quantity"
          value={stock}
          onChange={function (e) { setStock(e.target.value); }}
          style={inputStyle}
        />
        <textarea
          placeholder="Product description"
          value={description}
          onChange={function (e) { setDescription(e.target.value); }}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
