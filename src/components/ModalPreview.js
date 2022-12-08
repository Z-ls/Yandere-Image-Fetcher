import { Modal, Image, Row } from "react-bootstrap";

export function ModalPreview(props) {
	return (
		<Modal fullscreen show={props.showModal} onHide={() => props.setShowModal(false)} centered>
			<Modal.Header closeButton />
			<Modal.Body>
				<Row className="d-flex justify-content-center">
					<Image style={{ maxWidth: "72rem", "object-fit": "contain"}} rounded src={props.src} />
				</Row>
			</Modal.Body>
		</Modal>
	);
}
