/*global chrome*/

{
	const image = document.getElementById("image");
	const pngLink = document.getElementById("png");
	const pngHref = pngLink ? pngLink.href : "";
	chrome.storage.local.set({
		mainPic: {
			src: image.src,
			pngUrl: pngHref,
			extension: image.src.split(".").pop(),
			large_height: image.getAttribute("large_height"),
			large_width: image.getAttribute("large_width")
		}
	});
}
