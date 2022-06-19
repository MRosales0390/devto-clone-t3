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
    postAvatarAuthor === ""
  ) {
    alert("Hay campos vacíos, favor de revisar.");
  } else {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

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

    fetch("https://devto-clone-team3-default-rtdb.firebaseio.com/posts/.json", {
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
