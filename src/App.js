/*global chrome*/
import "./App.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { RelevantPicCardGroup } from "./RelevantPicCardGroup";
import { DownloadButton } from "./DownloadButton";

function App() {
	const [url, setUrl] = useState("");
	const [srcUrl, setSrcUrl] = useState("");
	const [parentPic, setParentPic] = useState([]);
	const [childrenPics, setChildrenPics] = useState([]);
	const [relevantReady] = useState(true);
	const [showRelevant, setShowRelevant] = useState(false);
	useEffect(() => {
		chrome.storage.local.get(["url", "srcUrl", "parentPicUrl", "childrenPageUrls"], data => {
			setUrl(data.url ?? "");
			setSrcUrl(data.srcUrl ?? "");
			setParentPic(fetchParentPic(data.parentPicUrl));
			setChildrenPics(fetchChildrenPics(data.childrenPageUrls));
			chrome.storage.onChanged.addListener((changes, namespace) => {
				if (namespace === "local") {
					if (changes.url) setUrl(changes.url.newValue);
					if (changes.srcUrl) setSrcUrl(changes.srcUrl.newValue);
					if (changes.parentPicUrl) {
						setParentPic(() => fetchParentPic(changes.parentPicUrl.newValue));
					}
					if (changes.childrenPageUrls) {
						setChildrenPics(() => fetchChildrenPics(changes.childrenPageUrls.newValue));
					}
				}
			});
		});
	}, []);

	return (
		<Container fluid>
			<Row className="my-2 d-flex justify-content-evenly">
				<Col className="d-flex justify-content-end">
					<Card style={{ maxWidth: "80rem", maxHeight: "80rem" }}>
						<Card.Img
							style={{ maxWidth: "80rem", maxHeight: "80rem", "object-fit": "cover" }}
							variant="bottom"
							src={srcUrl}
						/>
						<Card.Body>
							<Card.Title className="text-center">{url.split("/").at(-1)}</Card.Title>
							<Card.Text>
								<Row className="d-flex justify-content-center">
									<Col className="d-flex justify-content-end">
										<DownloadButton srcUrl={srcUrl} />
									</Col>
									<Col className="d-flex justify-content-start">
										<Button
											variant="light"
											disabled={!relevantReady}
											onClick={() => {
												setShowRelevant(showRelevant => !showRelevant);
											}}>
											RELEVANT
										</Button>
									</Col>
								</Row>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Row id="parent" className="justify-content-start">
						{showRelevant && <RelevantPicCardGroup pics={parentPic} />}
					</Row>
					<Row id="children" className="justify-content-start">
						{showRelevant && <RelevantPicCardGroup pics={childrenPics} />}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

const fetchParentPic = parentPicUrl => {
	let parentPic = [];
	if (parentPicUrl.length === 0) return [];
	chrome.tabs.create({ url: parentPicUrl[0].src ?? parentPicUrl[0], active: false }, tab => {
		chrome.scripting.executeScript(
			{
				target: { tabId: tab.id },
				files: ["getParentPicObj.js"]
			},
			() => {
				chrome.storage.local.get(["parentPic"], data => {
					parentPic.concat(data.parentPic);
					chrome.storage.local.remove(["parentPic"]);
					chrome.tabs.remove(tab.id);
				});
			}
		);
	});
	return parentPic;
};

const fetchChildrenPics = childrenPics => {
	// setRelevantReady(false);
	let newChildrenPics = [];
	if (childrenPics.length === 0) {
		// setRelevantReady(true);
		return [];
	}
	for (let picObj of childrenPics) {
		chrome.tabs.create({ url: picObj.src ?? picObj, active: false }, tab => {
			chrome.scripting.executeScript(
				{
					target: { tabId: tab.id },
					files: ["getChildPicObjs.js"]
				},
				() => {
					chrome.storage.local.get(["childPic"], data => {
						newChildrenPics.push(data.childPic);
						chrome.storage.local.remove(["childPic"]);
						chrome.tabs.remove(tab.id);
					});
				}
			);
		});
	}
	// setRelevantReady(true);
	return newChildrenPics;
};

export default App;
