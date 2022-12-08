/* global chrome*/

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "YIF-page-fetch",
		title: "Fetch images from this page",
		contexts: ["page"],
		targetUrlPatterns: ["https://yande.re/post/*"]
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "YIF-page-fetch") {
		chrome.scripting.executeScript(
			{
				target: { tabId: tab.id },
				files: ["fetchRelevantPicUrls.js"]
			},
			() => {
				chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
			}
		);
	}
});
