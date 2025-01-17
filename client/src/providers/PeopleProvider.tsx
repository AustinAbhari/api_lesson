import React, { createContext, useContext, useEffect, useState } from "react";

interface Person {
	name: string;
	age: number;
}

const PeopleContext = createContext<{
	people: Person[];
	isLoading: boolean;
	error: string | null;
}>({
	people: [],
	isLoading: true,
	error: null,
});

export const PeopleProvider = ({ children }: { children: React.ReactNode }) => {
	const [people, setPeople] = useState<Person[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/people");
				const data = await response.json();
				setPeople(data);
			} catch (e) {
				setError("Failed to fetch the data");
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<PeopleContext.Provider value={{ people, isLoading, error }}>
			{children}
		</PeopleContext.Provider>
	);
};

export const usePeople = () => {
	return useContext(PeopleContext);
};