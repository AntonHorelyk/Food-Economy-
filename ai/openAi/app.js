//OPEN_AI
const API_OPENAI =
  "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";

const API_URL = "https://api.openai.com/v1/chat/completions";

const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");

const generate = async (prompt, from) => {
  console.log(prompt);
  console.log(from);
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_OPENAI} `,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (from === "chatbot") {
      resultText.textContent = data.choices[0].message.content.trim();
    }
  } catch (error) {
    resultText.textContent = "An error occurred. Please try again.";
  }
};

generateBtn.addEventListener("click", function () {
  generate(promptInput.value, "chatbot");
});

promptInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    generate(promptInput.value, "chatbot");
  }
});
