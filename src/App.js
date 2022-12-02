/*global chrome*/
import "./App.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { RelevantPicCardRow } from "./RelevantPicCardRow";

function App() {
	const [url, setUrl] = useState("");
	const [srcUrl, setSrcUrl] = useState("");
	const [showRelevant, setShowRelevant] = useState(false);
	useEffect(() => {
		chrome.storage &&
			chrome.storage.sync.get(["picSrcUrl", "pageUrl"], data => {
				setSrcUrl(data.picSrcUrl);
				setUrl(data.pageUrl);
			});
	}, []);

	return (
		<Container fluid>
			{/* {showRelevant && (
				<Row className="my-5">
					<Col className="d-flex justify-content-center">{url ? <h1>{url}</h1> : <h1>TEST</h1>}</Col>
				</Row>
			)} */}
			<Row className="my-5">
				<Col className="d-flex justify-content-center">
					<Card style={{ width: "18rem" }}>
						<Card.Img variant="top" src={srcUrl ?? "./logo512.png"} />
						<Card.Body>
							<Card.Title>{url.split("/").at(-1) ?? "Child"}</Card.Title>
							<Card.Text>{srcUrl.split("/")[4]}</Card.Text>
							<Button
								variant="primary"
								onClick={() => {
									setShowRelevant(show => !show);
								}}>
								Check for Relevant
							</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row className="my-5">
				<Col className="d-flex justify-content-center"></Col>
			</Row>
			{showRelevant && <RelevantPicCardRow picId={url.split("/").at(-1)} />}
		</Container>
	);
}

export default App;
