/*
let post = {
    title: 'titulo del post',
    content: 'contenido del post ....',
    tags: 'lorem, lorem, lorem',
    urlCoverImage: 'https://res.cloudinary.com/practicaldev/image/fetch/s--f9PeJcAd--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/52ohyn4pzhpehxxq2s55.jpg',
    author: 'Cris',
    createdDate: '2022-06-16',
    mintoread: 3,
    avatarAuthor: 'https://res.cloudinary.com/practicaldev/image/fetch/s--3xRt7osW--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/395121/4dd73e99-88c7-4886-b485-cd246beaaf92.jpg'
}
*/
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://devto-clone-team3-default-rtdb.firebaseio.com/posts/.json", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((posts) => {
      //todo
      //console.log(posts);
      let postsLayout = "";
      let postsSection = document.getElementById("relevant");
      for (post in posts) {
        postsLayout += `
            <div class="card mb-3">
                <img src=${posts[post].urlCoverImage} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${posts[post].title}</h5>
                    <p class="card-text"><small class="text-muted">${posts[post].createdDate}</small></p>
                    <p class="card-text">${posts[post].content}</p>
                    <p class="card-text"><small class="text-muted">${posts[post].mintoread} min read</small></p>
                </div>
            </div>
        `;
      }

      postsSection.innerHTML = postsLayout;
    })
    .catch((err) => {
      console.log(err);
    });
});
