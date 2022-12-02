/*global chrome*/
import { useState, useEffect } from "react";
import { Row, Col, CardGroup } from "react-bootstrap";
import { CardPicture } from "./CardPicture";

export function RelevantPicCardRow(props) {
	const [urls, setUrls] = useState([]);

	useEffect(() => {
		fetchRelevantPics(props.picId).then(urls => {
			setUrls(urls);
		});
	}, []);

	if (urls.length > 0) {
		return (
			<Row className="d-flex justify-content-center">
				<CardGroup>
					{urls.map(url => (
						<CardPicture src={url} title={url.split("/").at(-1)} />
					))}
				</CardGroup>
			</Row>
		);
	}
}

const fetchRelevantPics = async id => {
	const newTab = await chrome.tabs.create({ url: "https://yande.re/post?tags=parent%3A" + id });
	await chrome.scripting.executeScript({
		target: { tabId: newTab.id },
		files: ["getRelevantPicIds.js"]
	});
	await chrome.tabs.remove(newTab.id);
	const picUrls = await chrome.storage.sync.get(["childrenPicUrls"]);
	return picUrls.childrenPicUrls;
};
