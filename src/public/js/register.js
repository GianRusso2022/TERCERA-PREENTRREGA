async function send(event) {
    event.preventDefault();
    const nombre = document.getElementById('form-name').value;
    const apellido = document.getElementById('form-last-name').value;
    const email = document.getElementById('form-email').value;
    const edad = document.getElementById('form-edad').value;
    const password = document.getElementById('form-password').value;
  
    api
      .post('/api/auth/register', {
        nombre,
        apellido,
        email,
        edad,
        password,
      })
      .then((d) => alert('Usuario Registrado'));
  }