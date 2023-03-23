//Obtener un usuario aleatorio (userID), e imprimir su dirección de correo electrónico de la API proporcionada

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
  
    const user = users[Math.floor(Math.random() * users.length)];
    console.log(`Correo electrónico del usuario ${user.name}: ${user.email}`);
  })
  .catch(error => console.error(error));
