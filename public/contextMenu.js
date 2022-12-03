/* global chrome*/

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "savimages-pic",
		title: "Open a New Tab for this picture",
		contexts: ["image"]
	});
	chrome.contextMenus.create({
		id: "savimages-page",
		title: "Analyze this page",
		contexts: ["page"]
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "savimages-pic") {
		chrome.storage.local.set({ srcUrl: info.srcUrl, pageUrl: tab.url }, () => {
			chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
		});
	} else if (info.menuItemId === "savimages-page") {
		chrome.tabs.create({ url: info.pageUrl, active: false }, tab => {
			chrome.scripting.executeScript(
				{
					target: { tabId: tab.id },
					files: ["fetchRelevantPicUrls.js"]
				},
				() => {
					chrome.tabs.remove(tab.id, () => {
						chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
					});
				}
			);
		});
	}
});
