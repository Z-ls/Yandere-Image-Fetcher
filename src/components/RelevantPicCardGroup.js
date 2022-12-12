import { Stack, CardGroup } from "react-bootstrap";
import { ImageCard } from "./ImageCard";

export function RelevantPicCardGroup(props) {
	if (props.isParent) {
		return props.pic ? <ImageCard {...props} pic={props.pic} /> : <NotFoundMessage isParent={props.isParent} />;
	} else {
		return props.pics.length ? (
			<Stack direction="horizontal" gap={0}>
				{props.pics.map(pic => {
					return <ImageCard {...props} pic={pic} />;
				})}
			</Stack>
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
