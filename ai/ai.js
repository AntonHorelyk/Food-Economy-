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
  console.log(e);
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

// Combined Crop and Process Functionality
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
          editableText.focus(); // Focus the textarea for user convenience
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
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
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
  console.log("uploadedListPrompt", uploadedListPrompt);
  console.log("uploadedList", uploadedList);
  alertify.success("!הקבלה נשמרה בהצלחה");
});
