//Hacer una publicación usando el mismo userID con un título y cuerpo no vacíos, verificar que se devuelve la respuesta correcta 
//(como esta es una API simulada, es posible que no devuelva el código de respuesta 200, por lo que debe verificar la documentación).

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    
    const user = users.find(user => user.name === 'Clementina DuBuque');
    const newPost = {
      title: 'Nuevo post',
      body: 'Cuerpo del nuevo post',
      userId: user.id,
    };
    
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error al crear la publicación. Código de estado HTTP: ${response.status}`);
    }
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
