/* global chrome*/

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "savimages",
		title: "Open a New Tab for this picture",
		contexts: ["image"]
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	chrome.storage.sync.set({ picSrcUrl: info.srcUrl, pageUrl: tab.url });
	chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
});
