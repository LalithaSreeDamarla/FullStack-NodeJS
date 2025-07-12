import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetch("/api/items")                // use proxy or same origin
      .then(res => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!newItem.trim()) return;       // ignore empty submit

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Items</h1>
        <ul>
          {items.map(item => (
            <li key={item.id ?? item.name}>{item.name}</li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="Add a new item"
          />
          <button type="submit">Add Item</button>
        </form>
      </header>
    </div>
  );
}

export default App;
