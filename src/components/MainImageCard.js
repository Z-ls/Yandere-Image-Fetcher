import { Card, Stack } from "react-bootstrap";
import { DownloadButton } from "./DownloadButton";

export function MainImageCard(props) {
	return (
		<Card>
			<Card.Header className="text-muted justify-content-between">
				<Stack direction="horizontal" gap={2}>
					<DownloadButton srcUrl={props.mainPic.src} />
					{props.mainPic.large_width + " X " + props.mainPic.large_height}
				</Stack>
			</Card.Header>
			<Card.Img
				rounded
				thumbnail
				variant="Bottom"
				style={{ maxHeight: "45rem", maxWidth: "45rem","object-fit": "cover" }}
				src={props.mainPic.src}
			/>
		</Card>
	);
}
