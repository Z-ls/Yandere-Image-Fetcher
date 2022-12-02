import { Card } from "react-bootstrap";

export function CardPicture(props) {
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Img variant="top" src={props.src} />
			<Card.Body>
				<Card.Title>{props.title.split("%20")[1] ?? "Child"}</Card.Title>
				<Card.Text>{props.src.split("/")[4]}</Card.Text>
			</Card.Body>
		</Card>
	);
}
