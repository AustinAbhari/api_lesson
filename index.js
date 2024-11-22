const express = require('express');
const app = express();


/**
 * Adds a middleware function that automatically parses incoming requests 
 * with a JSON payload. 
 * This means it converts the JSON data in the request body into a 
 * JavaScript object and makes it available on req.body
 */
app.use(express.json())

// rules 
// 1. Make sure name exists
let people = [{ name: "Austin", age: 31 }, { name: "Sophie", age: 91 }]

// Get /people - status 200
app.get('/people', (req, res) => {
    if (req.query.name) {
        const person = people.find(c => c.name == req.query.name);

        if (!person) {
            return res.status(404).json({ "error": `Name ${req.query.name} was not found` })
        }

        return res.status(200).json(person)
    }
    res.status(200).json(people)
})

// POST /people - 201 Created or 400 requirements not met
app.post('/people', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ "error": "Name is required" });
    }

    people.push(req.body);
    res.status(201).json({ "message": "people created!", people })
})

// PUT /people - 200 OK or 404 for Not Found
app.put('/people', (req, res) => {
    // name not given 
    if (!req.query.name) {
        return res.status(400).json({ "error": "Name is required" });
    }

    // name does not exist in the people
    if (!people.find(c => c.name == req.query.name)) {
        return res.status(404).json({ "error": `Name ${req.query.name} was not found` })
    }

    // everything is good update the object
    const index = people.map(c => c.name).indexOf(req.query.name);
    people[index] = req.body;

    // SHOULD check that the data is consistant

    return res.status(200).json({ "message": "people updated!", people })
})

app.patch('/people', (req, res) => {
    // name not given 
    if (!req.query.name) {
        return res.status(400).json({ "error": "Name is required" });
    }

    const person = people.find(c => c.name == req.query.name)
    // name does not exist in the people
    if (!person) {
        return res.status(404).json({ "error": `Name ${req.query.name} was not found` })
    }

    const index = people.findIndex(c => c.name === req.query.name);
    people[index] = { ...person, ...req.body }

    return res.status(200).json({ "message": "Person Updated!", people })
})

app.delete('/people', (req, res) => {
    // name not given 
    if (!req.query.name) {
        return res.status(400).json({ "error": "Name is required" });
    }

    const person = people.find(c => c.name == req.query.name)
    // name does not exist in the people
    if (!person) {
        return res.status(404).json({ "error": `Name ${req.query.name} was not found` })
    }

    const index = people.findIndex(c => c.name === req.query.name);
    people.splice(index, 1);

    return res.status(204)
})

// 500 everytime
app.get('/error', (req, res) => {
    try {
        throw new Error("Whoops, but this was on purpose")
    } catch (err) {
        res.status(500).json({ error: "We did this on purpose I swear", details: err.message })
    }
})


// limit per min
// keep count of customer pay limit
let requestLimit = 3;
app.get('/limited', (req, res) => {
    requestLimit--;
    if (requestLimit == 0) {
        return res.status(429).json({ error: "too many request" });
    }

    return res.status(200).json({ message: ":)" })
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log("we started the server!")
})