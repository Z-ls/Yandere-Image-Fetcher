/* global chrome*/
chrome.contextMenus.create(
	{
		id: "savimages",
		title: "Open a New Tab for this picture",
		contexts: ["video", "image"]
	},
	() => {
		chrome.contextMenus.onClicked.addListener((info, tab) => {
			console.log(info.srcUrl);
			chrome.tabs.create({ url: info.srcUrl });
		});
	}
);
