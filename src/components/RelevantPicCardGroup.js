import { useState } from "react";
import { CardGroup } from "react-bootstrap";
import { ImageCard } from "./ImageCard";

export function RelevantPicCardGroup(props) {
	const [showModal, setShowModal] = useState(false);
	return props.pics.length ? (
		<CardGroup>
			{props.pics.map(pic => {
				return <ImageCard {...props} pic={pic} showModal={showModal} setShowModal={setShowModal} />;
			})}
		</CardGroup>
	) : (
		<p className="text-muted text-center">
			No {props.isParent ? "parent" : "children"} pictures fetched. If you are sure about them, please refresh,
			and wait for all tabs to close.
		</p>
	);
}
