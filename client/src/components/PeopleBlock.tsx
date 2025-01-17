import React from "react";
import { usePeople } from "../providers/PeopleProvider";

interface Person {
	name: string;
	age: number;
}

const PeopleBlock: React.FC = (): React.ReactElement => {
	const { people, isLoading, error } = usePeople();

	if (isLoading) {
		return <div>HOLD YOUR HORSES PARTNER</div>;
	}

	if (error) {
		return <div> OH NO PARTNER: {error}</div>;
	}

	return (
		<>
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
