import { Modal, Image } from "react-bootstrap";

export function PreviewModal(props) {
	return (
		<Modal show={props.showModal} onHide={() => props.setShowModal(false)} centered>
			{/* <Modal.Header closeButton> */}
			{/* <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title> */}
			{/* </Modal.Header> */}
			<Modal.Body>
				{/* <h4>Centered Modal</h4> */}
				<Image style={{ "object-fit": "contain" }} rounded thumbnail src={props.src} />
			</Modal.Body>
			{/* <Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer> */}
		</Modal>
	);
}
