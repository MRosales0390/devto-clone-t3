



// Kike Post 1

/*
 let post = {
    title: 'Mickey Mouse is in the house',
    content: 'Mickey Mouse, también llamado Ratón Mickey, es un personaje de dibujos animados y emblema de la compañía Disney. Creado el 18 de noviembre de 1928, este ratón tiene un origen disputado. La leyenda oficial explica que fue creado por Walt Disney durante un viaje en tren de vuelta a California tras descubrir que no poseía el copyright de Oswald, el conejo afortunado, por lo que concibió un ratoncito vivaz de orejas grandes que quiso llamar Mortimer. A Lilian, su esposa, le pareció un nombre demasiado pretencioso y le sugirió Mickey. Según Bob Thomas la leyenda del nombre es ficticia y cita el caso de un personaje llamado Mortimer Mouse que nació en 1936, tío de Minnie Mouse.',
    tags: 'develop, frontend, fullstack',
    urlCoverImage: 'https://lumiere-a.akamaihd.net/v1/images/eu_mickey-and-friends_hero-bw_m_0b4a88b1.jpeg',
    author: 'Mickey Mouse',
    createdDate: '2022-06-20',
    mintoread: 7,
    avatarAuthor: 'https://thumbs.dreamstime.com/z/ilustraci%C3%B3n-vectorial-disney-de-mickey-mouse-aislado-en-fondo-blanco-vector-que-se-r%C3%ADe-colgado-sonr%C3%ADe-con-grandes-ojos-y-orejas-165067930.jpg'
}
*/



// Kike Post 2

/*
 let post = {
    title: 'Wiki Disney',
    content: 'Pluto is Mickey Mouse's pet dog that first appeared as a nameless bloodhound in 1930's The Chain Gang. Named by Walt Disney, Pluto is unique for a character in Mickey's world, in that he is not anthropomorphic beyond showing a broad range of facial expressions; he is actually represented as a normal dog, lacking speech and the ability to walk upright.',
    tags: 'develop, frontend, fullstack',
    urlCoverImage: 'https://static.wikia.nocookie.net/disney/images/5/56/Pluto_Mouse_Works.jpg',
    author: 'Pluto',
    createdDate: '2022-06-20',
    mintoread: 2,
    avatarAuthor: 'https://static.wikia.nocookie.net/disney/images/7/7b/Pluto.PNG'
}
*/


// Kike Post 3

/*
 let post = {
    title: 'Monsters Inc',
    content: 'Michael -Mike- Wazowski is the deuteragonist of the 2001 Disney, Pixar animated film Monsters, Inc. and the protagonist of its 2013 prequel. He is an employee of Monsters Incorporated, where he works closely with his longtime partner Sulley.',
    tags: 'develop, frontend, fullstack',
    urlCoverImage: 'https://static.wikia.nocookie.net/disney/images/6/6f/Monsters%2C_Inc._poster.jpeg',
    author: 'Mike Wazowski',
    createdDate: '2022-06-20',
    mintoread: 9,
    avatarAuthor: 'https://static.wikia.nocookie.net/disney/images/9/9e/Mike_KHIII.png'
}
*/




document.getElementById("save_btn").addEventListener("click", () => {
  let postTitle = document.getElementById("title").value;
  let postContent = document.getElementById("content").value;
  let postTags = document.getElementById("tags").value;
  let postUrlCoverImage = document.getElementById("urlCoverImage").value;
  let postAuthor = document.getElementById("author").value;
  let postMinToRead = document.getElementById("minToRead").value;
  let postAvatarAuthor = document.getElementById("avatarAuthor").value;

  if (
    postTitle === "" ||
    postContent === "" ||
    postTags === "" ||
    postUrlCoverImage === "" ||
    postAuthor === "" ||
    postMinToRead === "" ||
    postAvatarAuthor === "" ||
    isNaN(postMinToRead)
  ) {
    alert("Hay campos vacíos ó erróneos, favor de revisar.");
  } else {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes();

    let post = {
      title: postTitle,
      content: postContent,
      tags: postTags,
      urlCoverImage: postUrlCoverImage,
      author: postAuthor,
      createdDate: date,
      mintoread: postMinToRead,
      avatarAuthor: postAvatarAuthor,
    };

    fetch("https://devto-clone-team3-default-rtdb.firebaseio.com/posts/.json"
      // Base de datos de Marco-Repo
      //     

      // mi Base de datos para Prueba
      //https://practica19gjs-default-rtdb.firebaseio.com/Reto/.json


    , {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((finalResponse) => {
        document.getElementById("postForm").reset();

        alert(`Post registrado exitosamente con el id ${finalResponse.name}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
