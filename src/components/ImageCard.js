import { useState } from "react";
import { Stack, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { ModalPreview } from "./ModalPreview";
import { DownloadButton } from "./DownloadButton";
import { toggleSelected } from "../js/commonFunctions";
import { fetchByPageUrl } from "../js/fetchRelevant";

export function ImageCard(props) {
	const [showButtons, setShowButtons] = useState(false);
	const [showModal, setShowModal] = useState(false);

	return (
		<Card
			class="card-child"
			className={props.selected.includes(props.pic.src) && "shadow"}
			style={{ maxHeight: "50rem" }}
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
			<Card.Img style={{ maxHeight: "30rem", "object-fit": "cover" }} src={props.pic.sampleSrc} />
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
											fetchByPageUrl(props.pic.pageUrl);
										}}>
										FETCH
									</Button>
								</Col>
							</Row>
						)}
						{!props.isParent && props.pic.hasDeeperRelatives.hasChildren && (
							<Row className="mb-1">
								<Col className="d-flex justify-content-center">
									<Button
										variant="info"
										onClick={ev => {
											ev.preventDefault();
											fetchByPageUrl(props.pic.pageUrl);
										}}>
										FETCH
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
			<Card.Footer className="d-flex justify-content-center">
				<Stack gap={2}>
					<Badge
						bg={
							props.pic.extension === "png"
								? "success"
								: !props.isParent && props.pic.hasDeeperRelatives.hasChildren
								? "warning"
								: "secondary"
						}>
						{props.pic.large_width + " X " + props.pic.large_height}
					</Badge>
					<Badge bg="dark" text="light">
						{props.pic.fileSize}
					</Badge>
				</Stack>
			</Card.Footer>
		</Card>
	);
}
