/*global chrome*/
import "./App.css";
import { useState, useEffect } from "react";
import { fetchChildrenPics, fetchMainPic, fetchParentPic } from "./js/fetchRelevant";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";
import { RelevantPicCardGroup } from "./components/RelevantPicCardGroup";
import { MainImageCard } from "./components/MainImageCard";
import { HQImageCard } from "./components/HQImageCard";

function App() {
	const [mainPic, setMainPic] = useState();
	const [highQual, setHighQual] = useState("");
	const [parentPic, setParentPic] = useState([]);
	const [childrenPics, setChildrenPics] = useState([]);
	const [showRelevant, setShowRelevant] = useState(false);

	useEffect(() => {
		chrome.storage.local.get(["url", "parentPicUrl", "childrenPageUrls"], data => {
			fetchMainPic(data.url, setMainPic, setHighQual);
			setParentPic(fetchParentPic(data.parentPicUrl));
			setChildrenPics(fetchChildrenPics(data.childrenPageUrls));
			chrome.storage.onChanged.addListener((changes, namespace) => {
				if (namespace === "local") {
					if (changes.url) fetchMainPic(changes.url.newValue, setMainPic, setHighQual);
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
			<Row>
				<Button
					variant="light"
					onClick={() => {
						setShowRelevant(showRelevant => !showRelevant);
					}}>
					SHOW RELEVANT PICTURES
				</Button>
			</Row>
			<Row>
				<Col className="mt-2 d-block justify-content-center">
					<Row>
						<Col className="d-grid justify-content-end">
							<Stack direction="horizontal" gap={2}>
								{mainPic && <MainImageCard mainPic={mainPic} />}
								{highQual && <HQImageCard highQual={highQual} />}
							</Stack>
						</Col>
						<Col className="d-grid justify-content-start">
							<Stack direction="vertical" gap={2}>
								{showRelevant && <RelevantPicCardGroup pics={parentPic} isParent={true} />}
								{showRelevant && <RelevantPicCardGroup pics={childrenPics} isParent={false} />}
							</Stack>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
