import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: ""
  });

  // Fetch items
  useEffect(() => {
    fetch("/api/items")
      .then(res => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  // Fetch products
  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const handleItemSubmit = async e => {
    e.preventDefault();
    if (!newItem.trim()) return;

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newItem })
      });
      const data = await res.json();
      setItems(prev => [...prev, data]);
      setNewItem("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewChange = (id, value) => {
    setReviews(prev => ({ ...prev, [id]: value }));
  };

  const submitReview = async (id) => {
    const reviewText = reviews[id]?.trim();
    if (!reviewText) return;

    try {
      await fetch(`/api/products/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: reviewText })
      });

      setProducts(prev =>
        prev.map(product =>
          product.id === id
            ? { ...product, reviews: [...product.reviews, reviewText] }
            : product
        )
      );

      setReviews(prev => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewProductChange = e => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const submitNewProduct = async e => {
    e.preventDefault();
    const { name, description, price } = newProduct;
    if (!name || !description || isNaN(price)) return;

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price)
        })
      });

      const data = await res.json();
      setProducts(prev => [...prev, data]);
      setNewProduct({ name: "", description: "", price: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">

        {/* ITEMS SECTION */}
        <h1>Items</h1>
        <ul>
          {items.map(item => (
            <li key={item.id ?? item.name}>{item.name}</li>
          ))}
        </ul>
        <form onSubmit={handleItemSubmit}>
          <input
            type="text"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="Add a new item"
          />
          <button type="submit">Add Item</button>
        </form>

        {/* PRODUCTS SECTION */}
        <h1>Products</h1>
        <form onSubmit={submitNewProduct} className="product-form">
          <h2>Add New Product</h2>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={newProduct.name}
            onChange={handleNewProductChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleNewProductChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleNewProductChange}
          />
          <button type="submit">Add Product</button>
        </form>

        {products.map(product => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>${product.price.toFixed(2)}</strong></p>

            <h4>Reviews:</h4>
            <ul>
              {product.reviews.length > 0 ? (
                product.reviews.map((r, i) => <li key={i}>{r}</li>)
              ) : (
                <li>No reviews yet</li>
              )}
            </ul>

            <input
              type="text"
              value={reviews[product.id] || ""}
              onChange={e => handleReviewChange(product.id, e.target.value)}
              placeholder="Write a review"
            />
            <button onClick={() => submitReview(product.id)}>Submit Review</button>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
