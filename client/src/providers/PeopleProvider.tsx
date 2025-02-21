import React, { createContext, useContext, useEffect, useState } from "react";

interface Person {
	name: string;
	age: number;
}

const PeopleContext = createContext<{
	people: Person[];
	isLoading: boolean;
	errors: string[] | null;
	post: (person: Person) => void;
}>({
	people: [],
	isLoading: true,
	errors: null,
	post: () => {},
});

export const PeopleProvider = ({ children }: { children: React.ReactNode }) => {
	const [people, setPeople] = useState<Person[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [errors, setError] = useState<string[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/people");
				const data = await response.json();
				setPeople(data);
			} catch (e) {
				setError(["Failed to fetch the data"]);
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const post = async (person: Person) => {
		try {
			setIsLoading(true);
			const response = await fetch("http://localhost:3001/people", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(person),
			});
			const data = await response.json();

			if (response.ok) {
				setPeople(data.people);
			} else {
				setError(data.errors);
			}
		} catch (e) {
			setError(["Failed to fetch the data"]);
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<PeopleContext.Provider value={{ people, isLoading, errors, post }}>
			{children}
		</PeopleContext.Provider>
	);
};

export const usePeople = () => {
	return useContext(PeopleContext);
};
