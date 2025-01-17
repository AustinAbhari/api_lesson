import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { PeopleProvider } from "./providers/PeopleProvider";
import PeopleBlock from "./components/PeopleBlock";

function App() {
	return (
		<div className="App">
			<PeopleProvider>
				<PeopleBlock />
			</PeopleProvider>
		</div>
	);
}

export default App;
