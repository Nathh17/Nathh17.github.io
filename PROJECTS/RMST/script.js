const buttons = document.querySelectorAll('.btn');
const outputDiv = document.querySelector('.output');
const decreaseBtn = document.querySelector('.decrease');
const increaseBtn = document.querySelector('.increase');
const increaseValue = document.querySelector('.increaseValue');

let currentName = "";
let counterValue = 0;

decreaseBtn.addEventListener('click', () => {
  counterValue--;
  increaseValue.textContent = counterValue;
});

increaseBtn.addEventListener('click', () => {
  counterValue++;
  increaseValue.textContent = counterValue;
});

let deletingText = false; // Flag per controllare se deleteText è in esecuzione

// Load the JSON file
fetch('https://api.jsonsilo.com/public/778d05f8-39f4-41bf-9a93-7bb384286bb3')
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
        currentName = nameLabel.textContent;
        const points = getPoints(labelText);
        const output = labelText + ": " + points;
        // Se deleteText non è in esecuzione, chiamala
        if (!deletingText) {
          deletingText = true;
          deleteText(outputDiv, output);
        }
      });
    });
  });

function deleteText(element, text, i = element.textContent.length - 1) {
  if (i >= 0) {
    element.textContent = element.textContent.substring(0, i);
    setTimeout(() => deleteText(element, text, i - 1), 75);
  } else {
    typingEffect(element, text, 0);
    deletingText = false; // Imposta la flag a false dopo che deleteText è completata
  }
}

function typingEffect(element, text, i = 0) {
  element.textContent += text[i];
  if (i === text.length - 1) return;
  setTimeout(() => typingEffect(element, text, i + 1), 75);
}

function updateRegister() {
  const url = 'https://api.jsonsilo.com/public/778d05f8-39f4-41bf-9a93-7bb384286bb3';
  const headers = {
    'Content-Type': 'application/json'
  };

  axios.get(url, { headers: headers })
   .then(response => {
      const data = response.data;
      if (data[currentName]) {
        data[currentName] += counterValue;
      } else {
        data[currentName] = counterValue;
      }
      axios.put(url, data, { headers: headers })
       .then(response => {
          console.log('Updated register:', response.data);
        })
       .catch(error => {
          console.error('Error updating register:', error);
        });
    })
   .catch(error => {
      console.error('Error fetching register:', error);
    });
}