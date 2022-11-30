/*global chrome*/
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export function MainPage() {
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
