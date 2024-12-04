const fileInput = document.getElementById("imageInput");
const canvas = document.getElementById("imageCanvas");
const croppedCanvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const croppedCtx = croppedCanvas.getContext("2d");
let image = new Image();
let isDrawing = false;
let startX, startY, endX, endY;

// Load image into canvas
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

image.onload = () => {
  canvas.width = image.width / 2; // Scale down for display
  canvas.height = image.height / 2;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

// Start drawing rectangle
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
});

// Draw rectangle
canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;

  // Redraw the image and overlay the cropping rectangle
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.strokeRect(startX, startY, e.offsetX - startX, e.offsetY - startY);
});

// End drawing
canvas.addEventListener("mouseup", (e) => {
  isDrawing = false;
  endX = e.offsetX;
  endY = e.offsetY;
});

// Crop the selected area
document.getElementById("cropButton").addEventListener("click", () => {
  const cropWidth = Math.abs(endX - startX);
  const cropHeight = Math.abs(endY - startY);
  const cropStartX = Math.min(startX, endX);
  const cropStartY = Math.min(startY, endY);

  if (cropWidth > 0 && cropHeight > 0) {
    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;
    croppedCtx.drawImage(
      canvas,
      cropStartX,
      cropStartY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    console.log("Crop successful!");
    alert("Cropped area ready for upload!");
  } else {
    alert("Invalid cropping area!");
  }
});

// Upload cropped area and process with Google Vision API
document.getElementById("uploadButton").addEventListener("click", () => {
  const base64Image = croppedCanvas.toDataURL("image/png").split(",")[1];
  const apiKey = "AIzaSyA0zBj3kXMpPR0uqwTtpwkEsdC_EKDjeP0";
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  const requestBody = {
    requests: [
      {
        image: { content: base64Image },
        features: [{ type: "TEXT_DETECTION" }],
      },
    ],
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      const text =
        data.responses[0]?.fullTextAnnotation?.text || "No text found";
      document.getElementById("textOutput").innerText = text;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Reset the canvas
document.getElementById("resetButton").addEventListener("click", () => {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  croppedCanvas.width = 0;
  croppedCanvas.height = 0;
});
