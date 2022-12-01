/*global chrome*/
import "./App.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function App() {
	const [url, setUrl] = useState("https://yande.re/post/show/1040396");
	const [srcUrl, setSrcUrl] = useState(
		"https://files.yande.re/image/bf07e56be32e1b709c6cf2d62b345b7b/yande.re%201040396%20animal_ears%20artist_revision%20ass%20bunny_ears%20bunny_girl%20chen_bin%20feet%20garter%20nopan%20pantyhose%20see_through%20tail.jpg"
	);
	const [showUrl, setShowUrl] = useState(false);
	useEffect(() => {
		chrome.storage &&
			chrome.storage.sync.get(["picSrcUrl"], data => {
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
					<Card style={{ width: "18rem" }}>
						<Card.Img variant="top" src={srcUrl ?? "./logo512.png"} />
						<Card.Body>
							<Card.Title>{url}</Card.Title>
							<Card.Text>{srcUrl}</Card.Text>
							<Button
								variant="primary"
								onClick={() => {
									setShowUrl(show => !show);
								}}>
								Check latest Page
							</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row className="my-5">
				<Col className="d-flex justify-content-center">
					<Button
						variant="primary"
						onClick={() => {
							findRelevantPics(url.split("/").at(-1));
						}}>
						Check latest Page
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

const findRelevantPics = async id => {
	const newTab = await chrome.tabs.create({ url: "https://yande.re/post?tags=parent%3A" + id });
	await chrome.scripting.executeScript({
		target: { tabId: newTab.id },
		files: ["getRelevantPicIds.js"]
	});
	await chrome.tabs.remove(newTab.id);
	return await chrome.storage.sync.get(["parentPicIds"]);
};

export default App;
