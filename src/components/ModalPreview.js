import { Modal, Image, Row } from "react-bootstrap";

export function ModalPreview(props) {
	return (
		<Modal fullscreen show={props.showModal} onHide={() => props.setShowModal(false)} centered>
			<Modal.Header closeButton />
			<Modal.Body>
				<Row className="d-flex justify-content-center">
					<Image
						style={{ maxHeight: "80rem", maxWidth: "80rem", "object-fit": "cover" }}
						rounded
						thumbnail
						src={props.src}
					/>
				</Row>
			</Modal.Body>
		</Modal>
	);
}