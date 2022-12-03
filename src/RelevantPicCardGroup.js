import { useState } from "react";
import { Row, Col, CardGroup, Card, Button } from "react-bootstrap";
import { DownloadButton } from "./DownloadButton";
import { PreviewModal } from "./PreviewModal";

export function RelevantPicCardGroup(props) {
	const [showModal, setShowModal] = useState(false);
	return (
		<CardGroup>
			{props.pics.map(pic => {
				return <CardPicture pic={pic} showModal={showModal} setShowModal={setShowModal} />;
			})}
		</CardGroup>
	);
}

function CardPicture(props) {
	return (
		<Card className="mx-1" style={{ maxHeight: "25rem" }}>
			<PreviewModal src={props.pic.src} showModal={props.showModal} setShowModal={props.setShowModal} />
			<Card.Img
				rounded
				thumbnail
				style={{ maxHeight: "10rem", "object-fit": "cover" }}
				variant="bottom"
				bg={props.pic.extension === "png" ? "success" : "light"}
				src={props.pic.src}
			/>
			<Card.Body>
				<Card.Title>{props.pic.src.split("/")[4]}</Card.Title>
				<Card.Text>
					<Row>
						<Col className="d-flex justify-content-center">
							<strong>
								{props.pic.extension + " @ " + props.pic.large_width + " X " + props.pic.large_height}
							</strong>
						</Col>
					</Row>
					<Row className="mt-2 d-flex justify-content-evenly">
						<Col className="d-flex justify-content-end">
							<Button
								variant="success"
								onClick={() => {
									props.setShowModal(showModal => !showModal);
								}}>
								PREVIEW
							</Button>
						</Col>
						<Col className="d-flex justify-content-start">
							<DownloadButton srcUrl={props.pic.src} />
						</Col>
					</Row>
				</Card.Text>
			</Card.Body>
		</Card>
	);
}
