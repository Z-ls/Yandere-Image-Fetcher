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
	const highRes = document.getElementById("highres");
	const highResText = highRes ? highRes.text : "";
	const jpgFileSize = !!highResText
		? highResText.split("(").at(-1).replace(")", "").split(" ").at(0) +
		  " " +
		  highResText.split("(").at(-1).replace(")", "").split(" ").at(1)
		: "";
	const pngLink = document.getElementById("png");
	const pngHref = pngLink ? pngLink.href : "";
	const pngText = pngLink ? pngLink.text : "";
	const pngFileSize = !!pngText
		? pngText.split("(").at(-1).replace(")", "").split(" ").at(0) +
		  " " +
		  pngText.split("(").at(-1).replace(")", "").split(" ").at(1)
		: "";
	const src = !!pngHref ? pngHref : image.src;
	const fileSize = !!pngHref ? pngFileSize : jpgFileSize;
	const sampleSrc = getSampleSrc(image.src);
	const hasDeeperRelatives = findDeeperRelatives();
	const properties = {
		pageUrl,
		src,
		hasDeeperRelatives,
		sampleSrc,
		fileSize,
		extension: src.split(".").pop(),
		large_height: image.getAttribute("large_height"),
		large_width: image.getAttribute("large_width")
	};
	console.log(properties);
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
				chrome.tabs.reload(chrome.tabs.getCurrent().id);
			}
		);
	});
};

function findDeeperRelatives() {
	let result = { hasParent: false, hasChildren: false };
	const divStatusNotice = Array.from(document.getElementsByClassName("status-notice"));
	for (let div of divStatusNotice) {
		const a = Array.from(div.getElementsByTagName("a"));
		if (!a.length) continue;
		if (a[0].text.includes("parent")) {
			result.hasParent = true;
		} else if (a[0].text.includes("child")) {
			result.hasChildren = true;
		}
	}
	return result;
}

function getSampleSrc(src) {
	return src
		.replace(src.split("/").at(5).split("%20").at(1), src.split("/").at(5).split("%20").at(1).concat("%20sample"))
		.replace("image", "sample");
}
