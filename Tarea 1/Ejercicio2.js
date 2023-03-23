//Usando este userID, obtener las publicaciones asociadas a este usuario y verificar que contienen ID de 
//publicación válido (un entero entre 1 y 100).

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    
    const user = users.find(user => user.name === 'Clementina DuBuque');
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
  })
  .then(response => response.json())
  .then(posts => {
    
    const validPosts = posts.filter(post => post.id >= 1 && post.id <= 100);
    console.log(validPosts);
  })
  .catch(error => console.error(error));
