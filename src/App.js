/*global chrome*/
import "./App.css";
import { useState, useEffect } from "react";
import { fetchRelevantPics } from "./js/fetchRelevant";
import { handleDrag } from "./js/commonFunctions";
import { Container, Stack, Row, Col, Button, Navbar } from "react-bootstrap";
import { RelevantPicCardGroup } from "./components/RelevantPicCardGroup";
import { MainImageCard } from "./components/MainImageCard";
import { ModalComparison } from "./components/ModalComparison";
import { CSSTransition } from "react-transition-group";

function App() {
	const [mainPic, setMainPic] = useState();
	const [parentPic, setParentPic] = useState();
	const [childCount, setChildCount] = useState(0);
	const [childrenPics, setChildrenPics] = useState([]);
	const [selected, setSelected] = useState([]);
	const [showRelevant, setShowRelevant] = useState(false);
	const [showComparison, setShowComparison] = useState(false);

	useEffect(() => {
		chrome.storage.local.get(["pageUrl", "parentPicUrl", "childrenPageUrls"], data => {
			setChildCount(data.childrenPageUrls.length);
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
			<Navbar fluid className="d-block justify-content-center" fixed="top">
				<Row>
					<Col className="d-grid justify-content-end">
						<Button
							id="show-relevant-button"
							variant={childrenPics.length === childCount ? "light" : "warning"}
							onClick={() => {
								setShowRelevant(showRelevant => !showRelevant);
							}}>
							SHOW RELEVANT PICTURES : {childrenPics.length} / {childCount} CHILDREN PICTURES FETCHED
						</Button>
					</Col>
					<Col className="d-grid justify-content-start">
						{selected.length === 2 && (
							<Button
								variant="success"
								onClick={() => {
									setShowComparison(showComparison => !showComparison);
								}}>
								COMPARE SELECTED IMAGES
							</Button>
						)}
					</Col>
				</Row>
			</Navbar>
			{showComparison && (
				<ModalComparison showModal={showComparison} setShowModal={setShowComparison} selected={selected} />
			)}
			<Row className="mt-5">
				<Col className="d-block justify-content-center">
					<Row>
						<Col className="d-grid justify-content-end">
							{mainPic && <MainImageCard selected={selected} setSelected={setSelected} pic={mainPic} />}
						</Col>
						<Col className="d-grid justify-content-start">
							<Row className="d-grid">
								<CSSTransition in={showRelevant} timeout={200} classNames="fade" unmountOnExit>
									<RelevantPicCardGroup
										selected={selected}
										setSelected={setSelected}
										pic={parentPic}
										isParent={true}
									/>
								</CSSTransition>
							</Row>
							<Row id="row-children" className="d-grid overflow-auto" onMouseDown={handleDrag}>
								<CSSTransition in={showRelevant} timeout={200} classNames="fade" unmountOnExit>
									<RelevantPicCardGroup
										selected={selected}
										setSelected={setSelected}
										pics={childrenPics}
										isParent={false}
									/>
								</CSSTransition>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
