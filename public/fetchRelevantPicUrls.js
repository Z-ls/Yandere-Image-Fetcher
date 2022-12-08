/* global chrome*/
{
	chrome.storage.local.set({ pageUrl: window.location.href, parentPicUrl: [], childrenPageUrls: [] });
	const divPostView = document.getElementById("post-view");
	const divStatusNotice = Array.from(divPostView.getElementsByClassName("status-notice"));
	for (let div of divStatusNotice) {
		const a = Array.from(div.getElementsByTagName("a"));
		if (a[0].text.includes("parent")) {
			chrome.storage.local.set({ parentPicUrl: [a[0].href] });
		} else if (a[0].text.includes("child")) {
			chrome.storage.local.set({ childrenPageUrls: a.slice(1).map(a => a.href) });
		}
	}
}
