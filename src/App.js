/*global chrome*/
import "./App.css";
import { useState, useEffect } from "react";
import { fetchChildrenPics, fetchMainPic, fetchParentPic } from "./js/fetchRelevant";
import { Stack, Container, Row, Col, Button, CardGroup } from "react-bootstrap";
import { RelevantPicCardGroup } from "./components/RelevantPicCardGroup";
import { MainImageCard } from "./components/MainImageCard";
import { ModalComparison } from "./components/ModalComparison";

function App() {
	const [mainPic, setMainPic] = useState();
	const [highQual, setHighQual] = useState("");
	const [parentPic, setParentPic] = useState([]);
	const [childrenPics, setChildrenPics] = useState([]);
	const [selected, setSelected] = useState([]);
	const [showRelevant, setShowRelevant] = useState(false);
	const [showComparison, setShowComparison] = useState(false);

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
			<Row className="justify-content-center">
				<Button
					variant="light"
					border="primary"
					onClick={() => {
						setShowComparison(showComparison => !showComparison);
					}}>
					COMPARE SELECTED IMAGES
				</Button>
			</Row>
			<Row className="d-flex justify-content-center">
				{showComparison && (
					<ModalComparison showModal={showComparison} setShowModal={setShowComparison} selected={selected} />
				)}
			</Row>
			<Row>
				<Col className="mt-2 d-block justify-content-center">
					<Row>
						<Col className="d-grid justify-content-end">
							<CardGroup>
								{mainPic && (
									<MainImageCard
										selected={selected}
										setSelected={setSelected}
										toggleSelected={toggleSelected}
										png={false}
										pic={mainPic}
									/>
								)}
								{highQual && (
									<MainImageCard
										selected={selected}
										setSelected={setSelected}
										toggleSelected={toggleSelected}
										png={true}
										pic={highQual}
									/>
								)}
							</CardGroup>
						</Col>
						<Col className="d-grid justify-content-start">
							<Stack direction="vertical" gap={2}>
								{showRelevant && (
									<RelevantPicCardGroup
										selected={selected}
										setSelected={setSelected}
										toggleSelected={toggleSelected}
										pics={parentPic}
										isParent={true}
									/>
								)}
								{showRelevant && (
									<RelevantPicCardGroup
										selected={selected}
										setSelected={setSelected}
										toggleSelected={toggleSelected}
										pics={childrenPics}
										isParent={false}
									/>
								)}
							</Stack>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

const toggleSelected = (selected, setSelected, src) => {
	let newSelected = selected ?? [];
	if (!newSelected.includes(src)) {
		if (newSelected.length === 2) newSelected.shift();
		newSelected.push(src);
	} else {
		newSelected = newSelected.map(s => s !== src);
	}
	setSelected(newSelected);
};

export default App;
