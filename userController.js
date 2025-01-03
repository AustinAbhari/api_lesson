const express = require('express');
const app = express();


const USERS = [{user_id: 1, username: "AustinAbhari", password: "IrahbaNistua", age: 31, logged_in: false}];

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