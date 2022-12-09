import { CardGroup } from "react-bootstrap";
import { ImageCard } from "./ImageCard";

export function RelevantPicCardGroup(props) {
	if (props.isParent) {
		return props.pics ? <ImageCard {...props} pic={props.pics} /> : <NotFoundMessage isParent={props.isParent} />;
	} else {
		return props.pics.length ? (
			<CardGroup>
				{props.pics
					.filter(pic => !!pic)
					.map(pic => {
						return <ImageCard {...props} pic={pic} />;
					})}
			</CardGroup>
		) : (
			<NotFoundMessage isParent={props.isParent} />
		);
	}
}

const NotFoundMessage = props => {
	return (
		<p className="text-muted text-center">
			No {props.isParent ? "parent" : "children"} pictures fetched. If you are sure about them, please refresh,
			and wait for all tabs to close.
		</p>
	);
};
