import { CardGroup } from "react-bootstrap";
import { ImageCard } from "./ImageCard";

export function RelevantPicCardGroup(props) {
	return (
		<CardGroup>
			{props.isParent ? (
				props.pic ? (
					<ImageCard {...props} pic={props.pic} />
				) : (
					<NotFoundMessage isParent={props.isParent} />
				)
			) : props.pics.length ? (
				props.pics
					.filter(pic => !!pic)
					.map(pic => {
						return <ImageCard {...props} pic={pic} />;
					})
			) : (
				<NotFoundMessage isParent={props.isParent} />
			)}
		</CardGroup>
	);
}

const NotFoundMessage = props => {
	<p className="text-muted text-center">
		No {props.isParent ? "parent" : "children"} pictures fetched. If you are sure about them, please refresh, and
		wait for all tabs to close.
	</p>;
};
