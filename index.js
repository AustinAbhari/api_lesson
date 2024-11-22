const express = require('express');
const app = express();


/**
 * Adds a middleware function that automatically parses incoming requests 
 * with a JSON payload. 
 * This means it converts the JSON data in the request body into a 
 * JavaScript object and makes it available on req.body
 */
app.use(express.json())

let item = [{ name: "Austin", age: 31 }]

// Get /item - status 200
app.get('/item', (req, res) => {
    res.status(200).json(item)
})

// POST /item - 201 Created or 400 requirements not met
app.post('/item', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ "error": "Name is required" });
    }

    item.push(req.body);
    res.status(201).json({ "message": "item created!", item })
})

// PUT /item - 200 OK or 404 for Not Found
app.put('/item', (req, res) => {
    // name not given 
    if (!req.body.name) {
        return res.status(400).json({ "error": "Name is required" });
    }

    // name does not exist in the item
    if (!item.find(c => c.name == req.body.name)) {
        return res.status(404).json({ "error": `Name ${req.body.name} was not found` })
    }

    // everything is good update the object
    const index = item.map(c => c.name).indexOf(req.body.name);
    console.log(index, req.body.name)
    item[index] = { name: req.body.new };
    return res.status(200).json({ "message": "item updated!", item })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("we started the server!")
})