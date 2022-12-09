/*global chrome*/

export function fetchRelevantPics(type, urlList) {
	urlList.forEach(url => {
		chrome.tabs.create({ url: url, active: false }, tab => {
			chrome.scripting.executeScript(
				{ target: { tabId: tab.id }, func: fetchRelPicsFromPage, args: [type] },
				() => {
					chrome.tabs.remove(tab.id);
				}
			);
		});
	});
}

function fetchRelPicsFromPage(type) {
	const pageUrl = window.location.href;
	const image = document.getElementById("image");
	const pngLink = document.getElementById("png");
	const pngHref = pngLink ? pngLink.href : "";
	const src = !!pngHref ? pngHref : image.src;
	const hasDeeperRelatives = findDeeperRelatives(pageUrl);
	const properties = {
		pageUrl,
		src,
		hasDeeperRelatives,
		extension: src.split(".").pop(),
		large_height: image.getAttribute("large_height"),
		large_width: image.getAttribute("large_width")
	};
	let picObj = {};
	switch (type) {
		case "parent": {
			picObj.parentPic = properties;
			break;
		}
		case "child": {
			picObj.childPic = properties;
			break;
		}
		case "main": {
			picObj.mainPic = properties;
			break;
		}
		default: {
			break;
		}
	}
	chrome.runtime.sendMessage(undefined, picObj);
}

export const fetchByPageUrl = pageUrl => {
	chrome.tabs.create({ url: pageUrl, active: false }, tab => {
		chrome.scripting.executeScript(
			{
				target: { tabId: tab.id },
				files: ["fetchRelevantPicUrls.js"]
			},
			() => {
				chrome.tabs.remove(tab.id);
				chrome.tabs.reload(chrome.tabs.getCurrent().id, { bypassCache: true });
			}
		);
	});
};

function findDeeperRelatives(pageUrl) {
	let result = { hasParent: false, hasChildren: false };
	const divPostView = document.getElementById("post-view");
	const divStatusNotice = Array.from(divPostView.getElementsByClassName("status-notice"));
	for (let div of divStatusNotice) {
		const a = Array.from(div.getElementsByTagName("a"));
		if (a[0].text.includes("parent")) {
			result.hasParent = true;
		} else if (a[0].text.includes("child")) {
			result.hasChildren = true;
		}
	}
	return result;
}
