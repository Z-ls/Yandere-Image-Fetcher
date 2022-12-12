import { Modal, Image, Row, Col } from "react-bootstrap";
import { DownloadButton } from "./DownloadButton";

export function ModalPreview(props) {
	return (
		<Modal fullscreen show={props.showModal} onHide={() => props.setShowModal(false)} centered>
			<Modal.Header closeButton />
			<Modal.Body>
				<Row className="d-flex justify-content-center">
					<Image style={{ maxWidth: "72rem", "object-fit": "contain" }} rounded src={props.pic.sampleSrc} />
				</Row>
				<Row className="mt-3">
					<Col className="d-flex justify-content-center">
						<DownloadButton srcUrl={props.pic.src} />
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
}
