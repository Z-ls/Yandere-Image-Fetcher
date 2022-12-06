/*global chrome*/

{
	const image = document.getElementById("image");
	const pngLink = document.getElementById("png");
	const pngHref = pngLink ? pngLink.href : undefined;
	chrome.storage.local.set({
		childPic: {
			src: pngHref ?? image.src,
			extension: image.src.split(".").pop(),
			large_height: image.getAttribute("large_height"),
			large_width: image.getAttribute("large_width")
		}
	});
}
