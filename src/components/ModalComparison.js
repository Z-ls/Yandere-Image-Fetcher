import { Modal, Image, Stack } from "react-bootstrap";

export function ModalComparison(props) {
	return props.selected.length === 2 ? (
		<Modal fullscreen show={props.showModal} onHide={() => props.setShowModal(false)}>
			<Modal.Header closeButton />
			<Modal.Body>
				<Stack direction="horizontal" gap={3}>
					<Stack gap={2}>
						<Image
							style={{ maxHeight: "27rem", maxWidth: "48rem", "object-fit": "contain" }}
							rounded
							src={props.selected[0]}
						/>
						<strong className="text-center">{props.selected[0].split("%20").at(1)}</strong>
					</Stack>
					<Stack gap={2}>
						<Image
							style={{ maxHeight: "27rem", maxWidth: "48rem", "object-fit": "contain" }}
							rounded
							src={props.selected[1]}
						/>
						<strong className="text-center">{props.selected[1].split("%20").at(1)}</strong>
					</Stack>
				</Stack>
			</Modal.Body>
		</Modal>
	) : (
		<strong className="text-center">Please select (by clicking) two pictures first!</strong>
	);
}
