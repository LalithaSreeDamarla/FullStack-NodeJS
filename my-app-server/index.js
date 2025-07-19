const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Items
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];

// Products
let products = [
    {
        id: 1,
        name: "Laptop",
        description: "A powerful laptop for developers.",
        price: 999.99,
        reviews: []
    },
    {
        id: 2,
        name: "Smartphone",
        description: "A high-end smartphone with excellent camera.",
        price: 799.99,
        reviews: []
    }
];

// Get all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Add a new item
app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
    };
    items.push(newItem);
    res.json(newItem);
});

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Add a new product
app.post('/api/products', (req, res) => {
    const { name, description, price } = req.body;
    if (!name || !description || isNaN(price)) {
        return res.status(400).json({ error: "Invalid product data" });
    }
    const newProduct = {
        id: products.length + 1,
        name,
        description,
        price: parseFloat(price),
        reviews: []
    };
    products.push(newProduct);
    res.json(newProduct);
});

// Add a review to a product
app.post('/api/products/:id/review', (req, res) => {
    const productId = parseInt(req.params.id);
    const { review } = req.body;
    const product = products.find(p => p.id === productId);

    if (product && review) {
        product.reviews.push(review);
        res.json({ success: true });
    } else {
        res.status(400).json({ error: "Invalid product or review" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
