import { Card, Stack } from "react-bootstrap";
import { DownloadButton } from "./DownloadButton";

export function HQImageCard(props) {
	return (
		<Card border="success">
			<Card.Header className="text-muted  justify-content-between">
				<Stack direction="horizontal" gap={2}>
					<DownloadButton srcUrl={props.highQual} />
					{props.highQual.split("%20").at(1)}
				</Stack>
			</Card.Header>
			<Card.Img
				rounded
				thumbnail
				variant="bottom"
				style={{ maxHeight: "45rem", maxWidth: "45rem", "object-fit": "cover" }}
				src={props.highQual}
			/>
		</Card>
	);
}
