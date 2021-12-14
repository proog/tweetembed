const pattern = /https:\/\/twitter.com\/(\w+\/status\/\d+)/i;
const form = document.querySelector("form");
const input = document.querySelector("#url");
const button = document.querySelector("button");

button.disabled = !isValidInput();

input.addEventListener("input", (event) => {
  button.disabled = !isValidInput();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isValidInput()) {
    return;
  }

  const path = input.value.match(pattern)[1];
  location.assign(path);
});

function isValidInput() {
  return pattern.test(input.value);
}
