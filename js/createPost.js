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

        window.location.replace(`/viewPost.html?postId=${finalResponse.name}`);
        //alert(`Post registrado exitosamente con el id ${finalResponse.name}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

document.getElementById("btn_urlCoverImage").addEventListener("click", () => {
  document.getElementById("urlCoverImage").classList.toggle("hidden");
});

document.getElementById("cancel_btn").addEventListener("click", () => {
  window.location.pathname = `/index.html`;
});
