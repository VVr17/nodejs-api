window.addEventListener('load', onLoad);

function onLoad() {
  const username = prompt(`What is you name?`, 'Anonym');

  const socket = io(); // web-socket initialization on client

  const form = document.getElementById('form');
  const messagesList = document.getElementById('messagesList');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let message = null;

    for (let [_, value] of formData.entries()) {
      message = value;
    }

    if (message) {
      socket.emit('CHAT_MESSAGE', { message, username });
    }

    event.target.reset();
  });

  socket.on('CHAT_UPDATE', ({ message, username }) => {
    const item = document.createElement('li');
    item.innerHTML = ` ${username}: ${message}`;
    messagesList.appendChild(item);

    window.scrollTo(0, document.body.scrollHeight);
  });
}
