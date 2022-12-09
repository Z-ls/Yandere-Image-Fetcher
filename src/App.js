/*global chrome*/
import "./App.css";
import { useState, useEffect } from "react";
import { fetchRelevantPics } from "./js/fetchRelevant";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";
import { RelevantPicCardGroup } from "./components/RelevantPicCardGroup";
import { MainImageCard } from "./components/MainImageCard";
import { ModalComparison } from "./components/ModalComparison";

function App() {
	const [mainPic, setMainPic] = useState();
	const [parentPic, setParentPic] = useState();
	const [childrenPics, setChildrenPics] = useState([]);
	const [selected, setSelected] = useState([]);
	const [showRelevant, setShowRelevant] = useState(false);
	const [showComparison, setShowComparison] = useState(false);

	useEffect(() => {
		chrome.storage.local.get(["pageUrl", "parentPicUrl", "childrenPageUrls"], data => {
			fetchRelevantPics("main", data.pageUrl);
			fetchRelevantPics("parent", data.parentPicUrl);
			fetchRelevantPics("child", data.childrenPageUrls);
		});
		chrome.runtime.onMessage.addListener(message => {
			if (message.mainPic) {
				setMainPic(message.mainPic);
			}
			if (message.parentPic) {
				setParentPic(message.parentPic);
			}
			if (message.childPic) {
				setChildrenPics(oldList => [...oldList, message.childPic]);
			}
		});
	}, []);

	return (
		<Container fluid>
			<Row>
				<Button
					variant="dark"
					onClick={() => {
						setShowRelevant(showRelevant => !showRelevant);
					}}>
					SHOW RELEVANT PICTURES
				</Button>
				{selected.length === 2 && (
					<Button
						variant="success"
						onClick={() => {
							setShowComparison(showComparison => !showComparison);
						}}>
						COMPARE SELECTED IMAGES
					</Button>
				)}
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
							{mainPic && <MainImageCard selected={selected} setSelected={setSelected} pic={mainPic} />}
						</Col>
						<Col className="d-grid justify-content-start">
							<Stack direction="vertical" gap={2}>
								{showRelevant && (
									<RelevantPicCardGroup
										selected={selected}
										setSelected={setSelected}
										pics={parentPic}
										isParent={true}
									/>
								)}
								{showRelevant && (
									<RelevantPicCardGroup
										selected={selected}
										setSelected={setSelected}
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

export default App;
