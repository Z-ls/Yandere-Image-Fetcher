/*global chrome*/
import "./App.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Figure, Button } from "react-bootstrap";

function App() {
	const [url, setUrl] = useState("");
	const [srcUrl, setSrcUrl] = useState();
	const [showUrl, setShowUrl] = useState(false);
	useEffect(() => {
		chrome.storage.sync.get(["picSrcUrl"], function (data) {
			setSrcUrl(data.picSrcUrl);
		});
		chrome.tabs &&
			chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
				setUrl(tabs.find(tab => tab.url.includes("yande")).url);
			});
	}, []);

	return (
		<Container fluid>
			{showUrl && (
				<Row className="my-5">
					<Col className="d-flex justify-content-center">{url ? <h1>{url}</h1> : <h1>TEST</h1>}</Col>
				</Row>
			)}
			<Row className="my-5">
				<Col className="d-flex justify-content-center">
					<Figure>
						<Figure.Image width={768} height={480} src={srcUrl} />
						<Figure.Caption>{srcUrl}</Figure.Caption>
					</Figure>
				</Col>
			</Row>
			<Row className="my-4">
				<Col className="d-flex justify-content-center">
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
