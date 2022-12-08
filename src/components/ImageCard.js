/*global chrome*/

import { useState } from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { ModalPreview } from "./ModalPreview";
import { DownloadButton } from "./DownloadButton";
import { toggleSelected } from "../js/commonFunctions";

export function ImageCard(props) {
	const [showButtons, setShowButtons] = useState(false);
	const [showModal, setShowModal] = useState(false);

	return (
		<Card
			className={props.selected.includes(props.pic.src) && "shadow"}
			border={props.isParent ? "danger" : "warning"}
			onClick={ev => {
				ev.preventDefault();
				toggleSelected(props.selected, props.setSelected, props.pic.src);
			}}
			onMouseEnter={ev => {
				ev.preventDefault();
				setShowButtons(() => true);
			}}
			onMouseLeave={ev => {
				ev.preventDefault();
				setShowButtons(() => false);
			}}>
			<ModalPreview src={props.pic.src} showModal={showModal} setShowModal={setShowModal} />
			<Card.Img thumbnail style={{ maxHeight: "21rem", "object-fit": "cover" }} src={props.pic.src} />
			<Card.ImgOverlay>
				{showButtons && (
					<Row className="d-flex justify-content-evenly">
						{props.isParent && (
								<Row className="mb-1">
								<Col className="d-flex justify-content-center">
									<Button
										variant="info"
										onClick={ev => {
											ev.preventDefault();
											chrome.tabs.create({ url: props.pic.pageUrl, active: false });
										}}>
										VISIT
									</Button>
								</Col>
							</Row>
						)}
							<Row className="mb-1">
							<Col className="d-flex justify-content-center">
								<Button
									variant="success"
									onClick={ev => {
										ev.preventDefault();
										setShowModal(true);
									}}>
									PREVIEW
								</Button>
							</Col>
						</Row>
						<Row>
							<Col className="d-flex justify-content-center">
								<DownloadButton srcUrl={props.pic.src} />
							</Col>
						</Row>
					</Row>
				)}
			</Card.ImgOverlay>
			<Card.Footer className="d-flex justify-content-between">
				<Badge bg="primary" text="light">
					{props.pic.large_width + " X " + props.pic.large_height}
				</Badge>
				{props.pic.src.split(".").at(-1) === "png" && <Badge bg="success">PNG</Badge>}
			</Card.Footer>
		</Card>
	);
}
