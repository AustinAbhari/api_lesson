import UserController from './controllers/UserController';
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-api-key']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/people', UserController.getAllPeople)
app.post('/people', UserController.createUser)
app.put('/people', UserController.updateUser)
app.patch('/people', UserController.partialUpdateUser)
app.delete('/people', UserController.deleteUser)


const PORT = 3001;
app.listen(PORT, () => {
    console.log("We started the server!");
});
