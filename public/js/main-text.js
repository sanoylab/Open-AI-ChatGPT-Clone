function onSubmit(e) {
  e.preventDefault();
  document.querySelector('#chat-window').style.display = 'none';

  document.querySelector('.msg').textContent = '';
  document.querySelector('#answer').textContent = '';

  const prompt = document.querySelector('#prompt').value;
  const input = document.querySelector('#input');
  const chat = document.querySelector('#chat-window');
  const size = 'medium';//document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateTextRequest(prompt, size);
}

async function generateTextRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch('/openai/generatetext', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt
        
      }),
    });
    input.textContent = prompt;

    if (!response.ok) {
      removeSpinner();
      throw new Error('That answer could not be generated');
    }

    const data = await response.json();
    // console.log(data);

    const answer = data.data;
    console.log(answer)

   // document.querySelector('#answer').innerHTML = answer.replace(/\n/g, '<br />');

    var app = document.getElementById('answer');

    var typewriter = new Typewriter(app, {
      loop: false,
      delay: 15,
    });
    
    typewriter
      .pauseFor(25)
      .typeString(answer.replace(/\n/g, '<br />'))
     
      .start();




    document.querySelector('#chat-window').style.display = 'block';
    document.querySelector('#prompt').value= '';
    document.querySelector('#prompt').focus();
    //prompt.focus()

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
