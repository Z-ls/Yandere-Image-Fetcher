/* global chrome*/
chrome.contextMenus.create({
	id: "savimages",
	title: "Open a New Tab for this picture",
	contexts: ["image"]
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
	await chrome.storage.sync.set({ picSrcUrl: info.srcUrl });
	await chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
});
