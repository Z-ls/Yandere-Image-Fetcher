/* global chrome*/
chrome.contextMenus.create(
	{
		id: "savimages",
		title: "Open a New Tab for this picture",
		contexts: ["video", "image"]
	},
	() => {
		chrome.contextMenus.onClicked.addListener((info, tab) => {
			chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
		});
	}
);
