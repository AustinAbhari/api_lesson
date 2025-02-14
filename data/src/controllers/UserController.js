import User from '../models/User.js'

let people = [new User('Austin', 99), new User('Sophie', 11)]

const UserController = {
    getAllPeople: (req, res) => {
        if (req.query.name) {
            const person = people.find(c => c.name == req.query.name);

            if (!person) {
                return res.status(404).json({ "error": `Name ${req.query.name} was not found` })
            }

            return res.status(200).json(person)
        }
        res.status(200).json(people)
    },
    // POST /people - 201 Created or 400 requirements not met
    createUser: (req, res) => {
        if (!req.body.name) {
            return res.status(400).json({ "error": "Name is required" });
        }

        people.push(req.body);
        res.status(201).json({ "message": "people created!", people })
    },

    // PUT /people - 200 OK or 404 for Not Found
    updateUser: (req, res) => {
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
    },

    partialUpdateUser: (req, res) => {
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
    },

    deleteUser: (req, res) => {
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
    }
}

export default UserController;