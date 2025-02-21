import { NextFunction, Request, Response } from 'express';
import User from '../models/User';

let people: User[] = [new User('Austin', 99), new User('Sophie', 11)]; 

const UserController = {
    getAllPeople: (req: Request, res: Response) => { 
        if (req.query.name) {
            const person = people.find(c => c.name === req.query.name);

            if (!person) {
                res.status(404).json({ "error": `Name ${req.query.name} was not found` });
            }

            res.status(200).json(person);
        }
        res.status(200).json(people);
    },

    createUser: (req: Request, res: Response) => { // Type req and res
        const { age, name } = req.body;

        const newPerson = new User(name, age);
        const errors = newPerson.validate();

        if (errors) {
            res.status(400).json({ errors });
            return;
        }

        people.push(newPerson);
        res.status(201).json({ message: "User created!", people });
    },

    updateUser: (req: Request, res: Response) => {
        if (!req.query.name) {
            res.status(400).json({ "error": "Name is required" });
        }

        const index = people.findIndex(c => c.name === req.query.name);

        if (index === -1) { 
            res.status(404).json({ "error": `Name ${req.query.name} was not found` });
        }

        
        const updatedUser: User = req.body as User;

        // Validate updated data before assigning it
        const errors = updatedUser.validate();
        if (errors) {
            res.status(400).json({ errors });
        }

        people[index] = updatedUser;

        res.status(200).json({ "message": "People updated!", people });
    },

    partialUpdateUser: (req: Request, res: Response) => { 
        if (!req.query.name) {
            res.status(400).json({ "error": "Name is required" });
        }

        const index = people.findIndex(c => c.name === req.query.name);

        if (index === -1) {
            res.status(404).json({ "error": `Name ${req.query.name} was not found` });
        }

        const person = people[index];

        // Type assertion and partial update
        const partialUpdate: Partial<User> = req.body as Partial<User>;
        const updatedPerson = { ...person, ...partialUpdate };

        // Type guard: Check if validate exists
        if (updatedPerson.validate) {  // <-- The crucial check
            const errors = updatedPerson.validate();
            if (errors) {
                res.status(400).json({ errors });
            }
        } else {
            // Handle the case where validate is missing (e.g., log a warning)
            console.warn("Validate method is missing on updatedPerson. Skipping validation.");
        }

        people[index] = updatedPerson as User; // Type assertion after validation

        res.status(200).json({ "message": "Person Updated!", people });
    },

    deleteUser: (req: Request, res: Response) => { // Type req and res
        if (!req.query.name) {
            res.status(400).json({ "error": "Name is required" });
        }

        const index = people.findIndex(c => c.name === req.query.name);

        if (index === -1) {
            res.status(404).json({ "error": `Name ${req.query.name} was not found` });
        }

        people.splice(index, 1);

        res.status(204).end(); // Use .end() for 204 No Content
    }
};

export default UserController;