const fileInput = document.getElementById("imageInput");
const canvas = document.getElementById("imageCanvas");
const croppedCanvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const croppedCtx = croppedCanvas.getContext("2d");
let image = new Image();
let capturedImage = null; // משתנה לשמירת התמונה המקורית
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
  capturedImage = ctx.getImageData(0, 0, canvas.width, canvas.height); // Save the initial state
};

// Start drawing rectangle
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
});

// Draw rectangle dynamically
canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;

  // Restore the original image before drawing the rectangle
  ctx.putImageData(capturedImage, 0, 0);

  // Draw the rectangle dynamically
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  const currentWidth = e.offsetX - startX;
  const currentHeight = e.offsetY - startY;
  ctx.strokeRect(startX, startY, currentWidth, currentHeight);
});

// End drawing and finalize rectangle
canvas.addEventListener("mouseup", (e) => {
  isDrawing = false;
  endX = e.offsetX;
  endY = e.offsetY;

  // Restore the original image and finalize the rectangle
  ctx.putImageData(capturedImage, 0, 0);
  const finalWidth = endX - startX;
  const finalHeight = endY - startY;
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.strokeRect(startX, startY, finalWidth, finalHeight);
});

// Crop and Process
document
  .getElementById("cropAndProcessButton")
  .addEventListener("click", () => {
    const cropWidth = Math.abs(endX - startX);
    const cropHeight = Math.abs(endY - startY);
    const cropStartX = Math.min(startX, endX);
    const cropStartY = Math.min(startY, endY);

    if (cropWidth > 0 && cropHeight > 0) {
      // Crop the selected area
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

      // Replace the canvas content with the cropped image
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(croppedCanvas, 0, 0);

      // Convert cropped area to Base64
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

      // Send the cropped area to Google Vision API
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          const detectedText =
            data.responses[0]?.fullTextAnnotation?.text || "No text found";

          // Display detected text in the editable textarea
          const editableText = document.getElementById("editableText");
          editableText.value = detectedText;
          editableText.focus();
          alertify.success("הקבלה הומרה בהצלחה");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alertify.error("נסו שוב");
    }
  });

// Reset the canvas
document.getElementById("resetButton").addEventListener("click", () => {
  if (capturedImage) {
    canvas.width = capturedImage.width;
    canvas.height = capturedImage.height;
    ctx.putImageData(capturedImage, 0, 0);
  }
  croppedCanvas.width = 0;
  croppedCanvas.height = 0;
});

// Save the manually edited text
document.getElementById("saveButton").addEventListener("click", () => {
  const editedText = document.getElementById("editableText").value;
  const uploadedListPrompt = `זו רשימת הקניות שלי${editedText}, תן לי 3 מתכונים מבוססים על הרשימה`;
  const uploadedList = editedText;

  localStorage.setItem("uploadedListPrompt", uploadedListPrompt);
  localStorage.setItem("uploadedList", uploadedList);
  console.log("uploadedList", uploadedList);
  alertify.success("!הקבלה נשמרה בהצלחה");
});

// Camera functionalities
const startCameraButton = document.getElementById("startCameraButton");
const captureButton = document.getElementById("captureButton");
const cameraFeed = document.getElementById("cameraFeed");
let cameraStream;

// Start the camera
startCameraButton.addEventListener("click", () => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      cameraStream = stream;
      cameraFeed.srcObject = stream;
      cameraFeed.style.display = "block";
      captureButton.style.display = "inline-block";
    })
    .catch((error) => {
      console.error("Camera access error:", error);
      alertify.error("לא ניתן להפעיל את המצלמה");
    });
});

// Capture an image from the camera
captureButton.addEventListener("click", () => {
  const videoWidth = cameraFeed.videoWidth;
  const videoHeight = cameraFeed.videoHeight;
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  // Draw the current frame from the video feed onto the canvas
  ctx.drawImage(cameraFeed, 0, 0, videoWidth, videoHeight);

  // Save the captured image to restore later
  capturedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Stop the camera feed
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
  }

  cameraFeed.style.display = "none";
  captureButton.style.display = "none";
  alertify.success("התמונה צולמה בהצלחה");
});
