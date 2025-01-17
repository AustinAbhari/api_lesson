import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { PeopleProvider } from "./providers/PeopleProvider";

function App() {
	return (
		<div className="App">
			<PeopleProvider>
				<div />
			</PeopleProvider>
		</div>
	);
}

export default App;
