const buttons = document.querySelectorAll('.btn');
const outputDiv = document.querySelector('.output');

// Load the JSON file
fetch('data/data.json')
  .then(response => response.json())
  .then(data => {
    // Create a function to retrieve points based on name
    function getPoints(name) {
      return data[name];
    }

    // Add event listeners to buttons
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const nameLabel = button.querySelector('.nameLabel');
        const labelText = nameLabel.textContent;
        const points = getPoints(labelText);
        var output = labelText + ": " + points;
        deleteText(outputDiv, output);
      });
    });
  });

function deleteText(element, text, i = element.textContent.length - 1) {
  if (i >= 0) {
    element.textContent = element.textContent.substring(0, i);
    setTimeout(() => deleteText(element, text, i - 1), 125);
  } else {
    typingEffect(element, text, 0);
  }
}

function typingEffect(element, text, i = 0) {
  element.textContent += text[i];
  if (i === text.length - 1) return;
  setTimeout(() => typingEffect(element, text, i + 1), 125);
}