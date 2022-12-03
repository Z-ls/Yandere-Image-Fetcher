import { Row, Col, CardGroup, Card, Button } from "react-bootstrap";
import { DownloadButton } from "./DownloadButton";

export function RelevantPicCardGroup(props) {
	return (
		<CardGroup>
			{props.pics.map(pic => {
				return <CardPicture pic={pic} />;
			})}
		</CardGroup>
	);
}

function CardPicture(props) {
	return (
		<Card className="mx-1" style={{ maxWidth: "40rem", maxHeight: "40rem" }}>
			<Card.Img
				style={{ maxHeight: "20rem", "object-fit": "cover" }}
				variant="bottom"
				bg={props.pic.extension === "png" ? "success" : "light"}
				src={props.pic.src}
			/>
			<Card.Body>
				<Card.Title>{props.pic.src.split("/")[4]}</Card.Title>
				<Card.Text>
					<Row>
						<text>{props.pic.extension}</text>
					</Row>
					<Row>
						<text>{props.pic.large_width + " * " + props.pic.large_height}</text>
					</Row>
					<Row className="d-flex justify-content-center">
						<Col className="d-flex justify-content-end">
							<Button variant="success" href={props.pic.src}>
								PREVIEW
							</Button>
						</Col>
						<Col className="d-flex justify-content-start">
							<DownloadButton srcUrl={props.pic.src} />
						</Col>
					</Row>
				</Card.Text>
			</Card.Body>
		</Card>
	);
}
