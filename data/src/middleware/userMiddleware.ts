import { Request, Response, NextFunction } from 'express';
import User from '../models/User'; // Adjust path if needed

// Middleware for checking required name parameter
export const checkNameParam = (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.name) {
        res.status(400).json({ "error": "Name is required" });
    }
    next();
};

// Middleware for finding a person by name
export const findPerson = (req: Request, res: Response, next: NextFunction) => {
    const people: User[] = res.locals.people || []; // Ensure people array exists
    const index = people.findIndex(c => c.name === req.query.name);
    if (index === -1) {
        res.status(404).json({ "error": `Name ${req.query.name} was not found` });
    }
    res.locals.person = people[index];
    res.locals.personIndex = index;
    next();
};

// Middleware for validating the user data in the body
export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const newUser = new User(req.body.name, req.body.age);
    const errors = newUser.validate();
    if (errors) {
        res.status(400).json({ errors });
    }
    next();
};

// Middleware to ensure the 'people' array exists in res.locals
export const ensurePeopleArray = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.people) {
        res.locals.people = [new User('Austin', 99), new User('Sophie', 11)]; // Initialize if it doesn't exist
    }
    next();
};