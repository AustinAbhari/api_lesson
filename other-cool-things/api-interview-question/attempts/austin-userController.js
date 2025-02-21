const express = require('express');
const app = express();
app.use(express.json())

const USERS = [{ user_id: 1, username: "AustinAbhari", password: "IrahbaNistua", age: 31, logged_in: false }];

const cors = require('cors');

const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'x-api-key']
}

app.use(cors(corsOptions));

const authMiddleware = (req, res, next) => {
    if (!req.query.user_id) {
        return res.status(400).json({ "error": "user_id required" });
    }

    const person = USERS.find(c => c.user_id == req.query.user_id)

    if (!person) {
        return res.status(404).json({ "error": `Id ${req.query.user_id} was not found` })
    }

    if (!person.logged_in) {
        return res.status(401).json({ "error": "User not logged in" });
    }

    next();
}

app.post('/v1/user/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ "error": "Please inlude a username and password" });
    }

    const personIndex = USERS.findIndex(c => c.username == req.body.username && c.password == req.body.password);

    if (personIndex === -1) {
        return res.status(404).json({ "error": "User not fuong" })
    }

    USERS[personIndex].logged_in = true;
    return res.status(200).json({ "success": `Userid : ${USERS[personIndex].user_id}` })
})

app.patch('/v1/user', authMiddleware, (req, res) => {
    const person = USERS.find(c => c.user_id == req.query.user_id)
    const index = USERS.findIndex(c => c.name === req.query.user_id);
    USERS[index] = { ...person, ...req.body }
    return res.status(200).json({ "success": "Person Updated!", "User": USERS[index] })
})

app.get('/v1/user', authMiddleware, (req, res) => {
    const person = USERS.find(c => c.user_id == req.query.user_id)
    return res.status(200).json({ "user": person });
});


/**
 * Create a Node.js server with Express.js (or a similar framework).

 * POST LOGIN
    1. Request Body:
        username (string)
        password (string)

        Response:
            Success:  
            userId (string or number)

        Failure:
            error: "Invalid credentials"

    2. CHANGE USER INFORMATION
        Request Body:
            newUsername (optional, string)
            newPassword (optional, string)

        Response:
        Success:
            message: "User information updated successfully"

        Failure:
            error: "Unauthorized"

        Failure:
            error: "User not found"

        Failure:
            error: "Invalid request body"

    3. USER INFORMATION
        Response:
            All user data


   * BONUS Enable CORS for the Get user information endpoint on port 3002 to allow requests from the frontend (port 3002) 
    to the backend (port 3001).

 */

const PORT = 3001;
app.listen(PORT, () => {
    console.log("we started the server!")
})