import React, { useState } from "react";
import { usePeople } from "../providers/PeopleProvider";
import styled from "styled-components";

const PeopleBlockContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center; /* Center horizontally */
	padding: 20px;
	font-family: sans-serif; /* Use a pleasant font */
`;

const Title = styled.h1`
	margin-bottom: 20px;
	color: #333; /* Darker heading color */
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 300px; /* Set a reasonable width */
	margin-bottom: 20px;
`;

const Label = styled.label`
	margin-bottom: 5px;
	font-weight: bold;
`;

const Input = styled.input`
	padding: 8px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const Button = styled.button`
	padding: 10px 15px;
	background-color: #4caf50; /* Green */
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background-color: #45a049; /* Darker green on hover */
	}
`;

const PeopleList = styled.div`
	width: 300px;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 10px;
`;

const PersonItem = styled.div`
	display: flex; /* Arrange name and age horizontally */
	justify-content: space-between; /* Distribute space between name and age */
	margin-bottom: 5px;
	padding: 5px;
	border-bottom: 1px solid #eee; /* Add a separator line */

	&:last-child {
		border-bottom: none; /* Remove separator on the last item */
	}
`;

const PersonName = styled.span`
	font-weight: bold;
`;

const PersonAge = styled.span`
	color: #777; /* Slightly muted age color */
`;

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
		<PeopleBlockContainer>
			<Title>People</Title>
			<Form onSubmit={handleSubmit}>
				<Label>Name:</Label>
				<Input
					type="text"
					name="name"
					value={newPerson.name}
					onChange={handleChange}
				/>
				<Label>Age:</Label>
				<Input
					type="text"
					name="age"
					value={newPerson.age}
					onChange={handleChange}
				/>
				<Button type="submit">ADD PERSON</Button>
			</Form>
			<PeopleList>
				{people.map((person: Person) => (
					<PersonItem key={person.name + person.age}>
						<PersonName>{person.name}</PersonName>
						<PersonAge>({person.age})</PersonAge>
					</PersonItem>
				))}
			</PeopleList>
		</PeopleBlockContainer>
	);
};

export default PeopleBlock;
