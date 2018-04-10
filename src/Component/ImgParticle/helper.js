export function renderWithAspect(canvas, imgCanvas) {
	var ctx = canvas.getContext("2d");
	var imageAspectRatio = imgCanvas.width / imgCanvas.height;
	var canvasAspectRatio = canvas.width / canvas.height;
	var renderableHeight, renderableWidth, xStart, yStart;

	// If image's aspect ratio is less than canvas's we fit on height
	// and place the image centrally along width
	if (imageAspectRatio < canvasAspectRatio) {
		renderableHeight = canvas.height;
		renderableWidth = imgCanvas.width * (renderableHeight / imgCanvas.height);
		xStart = (canvas.width - renderableWidth) / 2;
		yStart = 0;
	} else if (imageAspectRatio > canvasAspectRatio) {
		// If image's aspect ratio is greater than canvas's we fit on width
		// and place the image centrally along height
		renderableWidth = canvas.width;
		renderableHeight = imgCanvas.height * (renderableWidth / imgCanvas.width);
		xStart = 0;
		yStart = (canvas.height - renderableHeight) / 2;
	} else {
		// Happy path - keep aspect ratio
		renderableHeight = canvas.height;
		renderableWidth = canvas.width;
		xStart = 0;
		yStart = 0;
	}
	ctx.drawImage(imgCanvas, xStart, yStart, renderableWidth, renderableHeight);

	// for (var op = 0; op < 10; op++) {
	// 	ctx.beginPath();
	// 	ctx.fillStyle = "red";
	// 	ctx.arc(op, 3, 1, 0, 2 * Math.PI);
	// 	ctx.fill();
	// }

	// ctx.beginPath();
	// ctx.fillStyle = "blue";
	// ctx.arc(111, 110, 1, 0, 2 * Math.PI);
	// ctx.fill();
}

export function getRGB(
	canvas,
	x,
	y,
	width,
	height,
	imageCanvas,
	imageWidth,
	imageHeight
) {
	// renderWithAspect(canvas, imageCanvas);
	var context = canvas.getContext("2d");
	context.drawImage(
		imageCanvas,
		canvas.width / 2 - imageWidth / 2,
		canvas.height / 2 - imageHeight / 2,
		imageWidth,
		imageHeight
	);

	var coorArr = [];
	var data = context.getImageData(x, y, canvas.width, canvas.height).data;
	for (var i = 0; i < data.length; i += 4) {
		var tempData = [];
		if (data[i + 3] !== 0) {
			tempData.x = (i / 4) % canvas.width;
			tempData.y = Math.floor(i / 4 / canvas.width);
			tempData.alpha = data[i + 3];
		}

		if (tempData.x !== undefined) {
			coorArr.push(tempData);
		}
	}
	var final = coorArr;
	while (final.length > 7000) {
		final = deleteOdd(final);
	}
	return final;
}

function deleteOdd(array) {
	return array.filter(function(data, index) {
		return index % 2 !== 1;
	});
}
