/*global chrome*/

{
	const image = document.getElementById("image");
	chrome.storage.local.set(
		{
			parentPic: {
				src: image.src,
				extension: image.src.split(".").pop(),
				large_height: image.getAttribute("large_height"),
				large_width: image.getAttribute("large_width")
			}
		},
		() => {
			return;
		}
	);
}
