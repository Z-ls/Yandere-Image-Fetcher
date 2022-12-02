/* global chrome*/

{
	const relevantPics = document.getElementById("post-list-posts");
	const relevantPicsIds = Array.from(relevantPics.children).map(li => li.id.replace("p", ""));
	const relevantPicUrls = Array.from(relevantPics.children).map(item => item.children[1].href);
	if (window.location.href.includes("parent")) {
		chrome.storage.sync.set({ childrenPicIds: relevantPicsIds });
		chrome.storage.sync.set({ childrenPicUrls: relevantPicUrls });
	} else if (window.location.href.includes("children")) {
		chrome.storage.sync.set({ parentPicIds: relevantPicsIds });
		chrome.storage.sync.set({ parentPicUrls: relevantPicUrls });
	} else throw new Error("Error when trying fetch relevant pictures");
}
