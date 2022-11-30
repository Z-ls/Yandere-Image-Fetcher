/*global chrome*/
import "./App.css";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "./MainPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route index element={<MainPage />} />
			</Routes>
		</Router>
	);
}

export default App;
