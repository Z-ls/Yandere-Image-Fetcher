/* global chrome*/

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "YIF-page-fetch",
		title: "Fetch images from this page",
		contexts: ["page"],
		targetUrlPatterns: ["https://yande.re/post*"]
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "YIF-page-fetch") {
		chrome.storage.local.set({ url: tab.url }, () => {
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
		});
	}
});
