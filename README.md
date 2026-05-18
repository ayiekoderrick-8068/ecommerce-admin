# Wetin-Mart Admin Portal

An e-commerce admin dashboard built with React and Vite. Administrators can view, add, edit, and delete products, search and filter by category, and track inventory in real time.

---

## Component Tree

```
App
├── NavBar                        (useContext → store name, useRef → nav element)
└── Routes
    ├── / → Home                  (stats: total products, stock, categories)
    ├── /products → Products      (GET all products, search, category filter)
    ├── /products/:id → Product   (GET single, PATCH edit, DELETE)
    └── /add-product → AddProduct (POST new product)
```

### State & Prop Relationships

| Component       | State                              | Props received         |
|-----------------|------------------------------------|------------------------|
| Products        | products, search, selectedCategory | —                      |
| Product (page)  | products, editing, form            | —                      |
| AddProduct      | name, price, category, stock, desc | —                      |
| Product (card)  | —                                  | product                |
| SearchBar       | —                                  | search, setSearch      |
| ProductForm     | —                                  | name, price, setName, setPrice, handleSubmit |
| NavBar          | menuOpen                           | — (reads StoreContext) |

---

## Features

- View all products in a responsive grid
- Search products by name in real time
- Filter products by category
- Add new products via a form (POST)
- Edit product name, price, category, stock, and description (PATCH)
- Delete products with confirmation (DELETE)
- Dashboard stats: total products, total stock, number of categories
- Active link highlighting in the navbar
- Store name loaded dynamically from the API via React Context

---

## Tech Stack

- React 19 + Vite
- React Router DOM v7
- json-server (mock REST API)
- Vitest + React Testing Library
- Tailwind CSS

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ecommerce-admin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the mock API server

```bash
npm run server
```

Runs on `http://localhost:3001`

### 4. Start the development server

```bash
npm run dev
```

Runs on `http://localhost:5173`

> Both servers must be running at the same time.

---

## Running Tests

```bash
npm test
```

Tests cover: NavBar, Home, SearchBar, AddProduct form submission, and Product detail (edit + delete).

---

## API Endpoints (json-server)

| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| GET    | /products           | Get all products    |
| GET    | /products/:id       | Get single product  |
| POST   | /products           | Add new product     |
| PATCH  | /products/:id       | Update product      |
| DELETE | /products/:id       | Delete product      |
| GET    | /store_info         | Get store details   |

---

## Known Limitations

- No authentication — the admin portal is open to anyone with the URL
- Data is stored in `db.json` and resets if the file is overwritten
- No image upload support for products
- Not yet deployed to a live server

---

## Mock Data Structure

```json
{
  "store_info": [
    {
      "id": 1,
      "name": "Wetin-Mart",
      "description": "Your one-stop shop for electronics, fashion, fitness, and more.",
      "phone_number": "555-1234",
      "email": "admin@wetinmart.com",
      "address": "12 Market Street, Lagos"
    }
  ],
  "products": [
    {
      "id": "1",
      "name": "Laptop Pro 15",
      "price": 1299,
      "category": "Electronics",
      "stock": 12,
      "description": "High performance laptop with 16GB RAM and 512GB SSD."
    }
  ]
}
```
# ecommerce-admin
