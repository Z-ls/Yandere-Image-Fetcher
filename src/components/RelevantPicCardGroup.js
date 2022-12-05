import { useState } from "react";
import { CardGroup } from "react-bootstrap";
import { ImageCard } from "./ImageCard";

export function RelevantPicCardGroup(props) {
	const [showModal, setShowModal] = useState(false);
	return props.pics.length ? (
		<CardGroup>
			{props.pics.map(pic => {
				return (
					<ImageCard pic={pic} showModal={showModal} setShowModal={setShowModal} isParent={props.isParent} />
				);
			})}
		</CardGroup>
	) : (
		<p className="text-muted">
			No relevant pictures fetched. If you are sure about them, please refresh. And wait for all tabs to close.
		</p>
	);
}
