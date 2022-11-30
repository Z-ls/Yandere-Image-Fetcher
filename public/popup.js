/*global chrome*/
import "./App.css";
import { useState, useEffect } from "react";
import { Router, Routes, Route } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";

function App() {
	const [showUrl, setShowUrl] = useState(false);
	const [url, setUrl] = useState("");
	useEffect(() => {
		chrome.tabs &&
			chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
				setUrl(tabs[0].url.split("/").at(-1));
			});
	}, []);

	return (
		<Container fluid>
			{showUrl && (
				<Row>
					<Col>
						<h1>{url}</h1>
					</Col>
				</Row>
			)}
			<Row>
				<Col>
					<Button
						variant="primary"
						onClick={() => {
							setShowUrl(show => !show);
						}}>
						Check latest Page
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
