/* global chrome*/
{
	chrome.storage.local.set({ pageUrl: [window.location.href], parentPicUrl: [], childrenPageUrls: [] });
	const divStatusNotice = Array.from(document.getElementsByClassName("status-notice"));
	for (let div of divStatusNotice) {
		const a = Array.from(div.getElementsByTagName("a"));
		if (!a.length) continue;
		if (a[0].text.includes("parent")) {
			chrome.storage.local.set({ parentPicUrl: [a[0].href] });
		} else if (a[0].text.includes("child")) {
			chrome.storage.local.set({ childrenPageUrls: a.slice(1).map(a => a.href) });
		}
	}
}
