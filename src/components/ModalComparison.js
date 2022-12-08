import { Modal, Image, Stack } from "react-bootstrap";

export function ModalComparison(props) {
	return props.selected.length === 2 ? (
		<Modal fullscreen show={props.showModal} onHide={() => props.setShowModal(false)}>
			<Modal.Header closeButton />
			<Modal.Body>
				<Stack direction="horizontal" gap={1}>
					<Stack gap={2}>
						<Image style={{ maxWidth: "54rem", "object-fit": "contain" }} rounded src={props.selected[0]} />
						<h3 className="text-start">{props.selected[0].split("%20").at(1)}</h3>
					</Stack>
					<Stack gap={2}>
						<Image style={{ maxWidth: "54rem", "object-fit": "contain" }} rounded src={props.selected[1]} />
						<h3 className="text-end">{props.selected[1].split("%20").at(1)}</h3>
					</Stack>
				</Stack>
			</Modal.Body>
		</Modal>
	) : (
		<strong className="text-center">Please select (by clicking) two pictures first!</strong>
	);
}
