import { Card, Stack } from "react-bootstrap";
import { DownloadButton } from "./DownloadButton";
import { toggleSelected } from "../js/commonFunctions";

export function MainImageCard(props) {
	const src = props.png ? props.pic : props.pic.src;

	return (
		<Card
			className={props.selected.includes(src) && "shadow"}
			onClick={ev => {
				ev.preventDefault();
				toggleSelected(props.selected, props.setSelected, src);
			}}>
			<Card.Header className="text-muted justify-content-between">
				<Stack direction="horizontal" gap={2}>
					<DownloadButton srcUrl={src} />
					{props.png
						? "PNG Found for " + props.pic.split("%20").at(1)
						: props.pic.large_width + " X " + props.pic.large_height}
				</Stack>
			</Card.Header>
			<Card.Img rounded thumbnail variant="Bottom" style={{ maxHeight: "45rem", maxWidth: "45rem" }} src={src} />
		</Card>
	);
}
