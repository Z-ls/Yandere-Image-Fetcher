import { Card, Stack, Badge } from "react-bootstrap";
import { DownloadButton } from "./DownloadButton";
import { toggleSelected } from "../js/commonFunctions";

export function MainImageCard(props) {
	return (
		<Card
			className={props.selected.includes(props.pic.src) && "shadow"}
			onClick={ev => {
				ev.preventDefault();
				toggleSelected(props.selected, props.setSelected, props.pic.src);
			}}>
			<Card.Header className="text-muted">
				<Stack direction="horizontal" gap={2}>
					<DownloadButton srcUrl={props.pic.src} />
					{props.pic.extension === "png" && <Badge bg="success">PNG</Badge>}
					<Badge bg="primary" text="light">
						{props.pic.large_width + " X " + props.pic.large_height}
					</Badge>
				</Stack>
			</Card.Header>
			<Card.Img
				rounded
				thumbnail
				variant="Bottom"
				style={{ maxHeight: "45rem", maxWidth: "54rem" }}
				src={props.pic.sampleSrc}
			/>
		</Card>
	);
}
