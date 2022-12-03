/*global chrome*/
import { Button } from "react-bootstrap";

export function DownloadButton(props) {
	return (
		<Button
			variant="primary"
			onClick={() => {
				downloadHandler(props.srcUrl);
			}}>
			DOWNLOAD
		</Button>
	);
}

const downloadHandler = url => {
	return chrome.downloads.download({
		url: url,
		conflictAction: "overwrite"
	});
};
