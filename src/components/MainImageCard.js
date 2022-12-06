import { Card, Stack } from "react-bootstrap";
import { DownloadButton } from "./DownloadButton";

export function MainImageCard(props) {
	const src = props.png ? props.pic : props.pic.src;
	return (
		<Card
			border={props.selected.includes(src) ? "warning" : ""}
			onClick={ev => {
				ev.preventDefault();
				props.toggleSelected(props.selected, props.setSelected, src);
			}}>
			<Card.Header className="text-muted justify-content-between">
				<Stack direction="horizontal" gap={2}>
					<DownloadButton srcUrl={src} />
					{props.png
						? "PNG Found for " + props.pic.split("%20").at(1)
						: props.pic.large_width + " X " + props.pic.large_height}
				</Stack>
			</Card.Header>
			<Card.Img
				rounded
				thumbnail
				variant="Bottom"
				style={{ maxHeight: "45rem", maxWidth: "45rem", "object-fit": "cover" }}
				src={src}
			/>
		</Card>
	);
}
