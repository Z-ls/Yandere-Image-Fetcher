/* global chrome*/
{
	chrome.storage.local.set({ childrenPageUrls: [], parentPicUrl: [] });
	const divPostView = document.getElementById("post-view");
	const divStatusNotice = Array.from(divPostView.getElementsByClassName("status-notice"));
	let childrenPageUrls = [];
	for (let div of divStatusNotice) {
		const a = Array.from(div.getElementsByTagName("a"));
		if (a[0].text.includes("parent")) {
			chrome.storage.local.set({ parentPicUrl: [a[0].href] });
		} else if (a[0].text.includes("child")) {
			a.slice(1).forEach(a => {
				childrenPageUrls.push(a.href);
			});
			chrome.storage.local.set({ childrenPageUrls: childrenPageUrls });
		}
	}
}
