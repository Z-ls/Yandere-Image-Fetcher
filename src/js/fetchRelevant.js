/*global chrome*/

export function fetchMainPic(mainPicUrl, setMainPic, setHighQual) {
	if (!mainPicUrl) return undefined;
	chrome.tabs.create({ url: mainPicUrl, active: false }, tab => {
		chrome.scripting.executeScript(
			{
				target: { tabId: tab.id },
				files: ["getMainPicObj.js"]
			},
			() => {
				chrome.storage.local.get(["mainPic"], data => {
					setMainPic(() => data.mainPic);
					setHighQual(() => data.mainPic.pngUrl);
					chrome.tabs.remove(tab.id);
				});
			}
		);
	});
}

export function fetchParentPic(parentPicUrl) {
	let parentPic = [];
	if (parentPicUrl.length === 0) return [];
	chrome.tabs.create({ url: parentPicUrl[0], active: false }, tab => {
		chrome.scripting.executeScript(
			{
				target: { tabId: tab.id },
				files: ["getParentPicObj.js"]
			},
			() => {
				chrome.storage.local.get(["parentPic"], data => {
					parentPic.push(data.parentPic);
					chrome.storage.local.remove(["parentPic"]);
					chrome.tabs.remove(tab.id);
				});
			}
		);
	});
	return parentPic;
}

export function fetchChildrenPics(childrenPicUrls) {
	let childrenPicObjs = [];
	if (childrenPicUrls.length === 0) {
		return [];
	}
	childrenPicUrls.forEach(url => {
		chrome.tabs.create({ url: url, active: false }, tab => {
			chrome.scripting.executeScript(
				{
					target: { tabId: tab.id },
					files: ["getChildPicObjs.js"]
				},
				() => {
					chrome.storage.local.get(["childPic"], data => {
						childrenPicObjs.push(data.childPic);
						chrome.storage.local.remove(["childPic"]);
						chrome.tabs.remove(tab.id);
					});
				}
			);
		});
	});
	return childrenPicObjs;
}
