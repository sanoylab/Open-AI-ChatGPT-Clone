function onSubmit(e) {
  e.preventDefault();
  document.querySelector('#chat-window').style.display = 'none';
  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const prompt = document.querySelector('#prompt').value;
  const input = document.querySelector('#input');
  const chat = document.querySelector('#chat-window');
  const size = 'medium';//document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
    input.textContent = prompt;

    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    // console.log(data);

    const imageUrl = data.data;

    document.querySelector('#image').src = imageUrl;
    document.querySelector('#chat-window').style.display = 'block';
    document.querySelector('#prompt').value= '';
    document.querySelector('#prompt').focus();

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
