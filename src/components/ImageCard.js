import { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { PreviewModal } from "./PreviewModal";
import { DownloadButton } from "./DownloadButton";

export function ImageCard(props) {
	const [showButtons, setShowButtons] = useState(false);

	return (
		<Card
			border={props.isParent ? "danger" : "warning"}
			onMouseEnter={ev => {
				ev.preventDefault();
				setShowButtons(() => true);
			}}
			onMouseLeave={ev => {
				ev.preventDefault();
				setShowButtons(() => false);
			}}>
			<PreviewModal src={props.pic.src} showModal={props.showModal} setShowModal={props.setShowModal} />
			<Card.Img thumbnail style={{ maxHeight: "21rem", "object-fit": "cover" }} src={props.pic.src} />
			<Card.ImgOverlay>
				{showButtons && (
					<Card.Text>
						<Row className="d-flex justify-content-evenly">
							{props.pic.pageUrl && (
								<Row className="mb-1">
									<Col className="d-flex justify-content-center">
										<Button variant="info" href={props.pic.pageUrl}>
											VISIT
										</Button>
									</Col>
								</Row>
							)}
							<Row className="mb-1">
								<Col className="d-flex justify-content-center">
									<Button
										variant="success"
										onClick={() => {
											props.setShowModal(showModal => !showModal);
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
					</Card.Text>
				)}
			</Card.ImgOverlay>
			<Card.Footer className="text-muted">{props.pic.large_width + " X " + props.pic.large_height}</Card.Footer>
		</Card>
	);
}
