const submitButton = document.getElementById("submitButton");
const reviewMessage = document.getElementById("reviewMessage");
const displayMessage = document.getElementById("displayMessage");

const path = "/rate";
const submitReviewHandler = async (event) => {
  event.preventDefault();
  const userMessage = reviewMessage.value.trim();

  const response = await fetch(`http://localhost:8000/api${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review: userMessage }),
  });

  if (!response.ok) {
    console.error("Couldn't send the review");
    return;
  }

  const data = await response.json();

  if (!reviewMessage.value) {
    const errorResponse = await fetch(`http://localhost:8000/api${path}`);
    // const data = await errorResponse.json();
    console.log(errorResponse);

    // displayMessage.textContent = errorResponse.errorMessage;
    // setTimeout(() => {
    //   displayMessage.textContent = "";
    // }, 5000);
  }

  displayMessage.classList.toggle("display");
  displayMessage.textContent = data.message;
  setTimeout(() => {
    displayMessage.classList.add("display");
    displayMessage.textContent = "";
  }, 5000);
  reviewMessage.value = "";
};

submitButton?.addEventListener("submit", submitReviewHandler);
