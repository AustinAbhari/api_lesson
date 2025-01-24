import React, { useState } from "react";
import { usePeople } from "../providers/PeopleProvider";

interface Person {
	name: string;
	age: number;
}

const PeopleBlock: React.FC = (): React.ReactElement => {
	const { people, isLoading, error, post } = usePeople();
	const [newPerson, setNewPerson] = useState<Person>({ name: "", age: 0 });

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setNewPerson({ ...newPerson, [name]: value });
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		post(newPerson);
		setNewPerson({ name: "", age: 0 });
	};

	if (isLoading) {
		return <div>HOLD YOUR HORSES PARTNER</div>;
	}

	if (error) {
		return <div> OH NO PARTNER: {error}</div>;
	}

	return (
		<>
			<h1> People</h1>
			<form onSubmit={handleSubmit}>
				<label>Name:</label>
				<input
					type="text"
					name="name"
					value={newPerson.name}
					onChange={handleChange}
				/>
				<label>Age:</label>
				<input
					type="text"
					name="age"
					value={newPerson.age}
					onChange={handleChange}
				/>
				<button type="submit">ADD PERSON</button>
			</form>
			{people.map((person: Person) => (
				<>
					<div> {person.name}</div>
					<div> {person.age} </div>
				</>
			))}
		</>
	);
};

export default PeopleBlock;
