import { Modal, Image, Stack, Row } from "react-bootstrap";

export function ModalComparison(props) {
	return props.selected.length === 2 ? (
		<Modal fullscreen show={props.showModal} onHide={() => props.setShowModal(false)}>
			<Modal.Header closeButton />
			<Modal.Body>
				<Stack direction="horizontal" gap={3}>
					<Stack gap={2}>
						<Image
							style={{ maxHeight: "50rem", maxWidth: "50rem", "object-fit": "cover" }}
							thumbnail
							rounded
							src={props.selected[0]}
						/>
						<strong>{props.selected[0].split("%20").at(1)}</strong>
					</Stack>
					<Stack gap={2}>
						<Image
							style={{ maxHeight: "50rem", maxWidth: "50rem", "object-fit": "cover" }}
							thumbnail
							rounded
							src={props.selected[1]}
						/>
						<strong>{props.selected[1].split("%20").at(1)}</strong>
					</Stack>
				</Stack>
			</Modal.Body>
		</Modal>
	) : (
		<strong>Please select (by clicking) two pictures first!</strong>
	);
}
