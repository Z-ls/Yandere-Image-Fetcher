/* global chrome*/

const relevantPics = document.getElementById("post-list-posts");
const relevantPicsIds = Array.from(relevantPics.children).map(li => li.id.replace("p", ""));
if (window.location.href.includes("parent")) {
	chrome.storage.sync.set({ parentPicIds: relevantPicsIds });
} else if (window.location.href.includes("children")) {
	chrome.storage.sync.set({ childrenPicIds: relevantPicsIds });
} else throw new Error("Error when trying fetch relevant pictures");
