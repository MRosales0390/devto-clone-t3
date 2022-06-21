document.addEventListener("DOMContentLoaded", () => {
  let postId = window.location.search.substring(8);
  let postUrl = `https://devto-clone-team3-default-rtdb.firebaseio.com/posts/${postId}.json`;

  fetch(postUrl, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        let err = new Error(
          `Algo salio mal, status: ${response.status} ${response.statusText} type: ${response.type}`
        );
        throw err;
      } else {
        return response.json();
      }
    })
    .then((post) => {
      let postForm = document.getElementById("postForm");
      console.log(post);

      postForm["title"].value = post.title;
      postForm["content"].value = post.content;
      postForm["tags"].value = post.tags;
      postForm["urlCoverImage"].value = post.urlCoverImage;
      postForm["author"].value = post.author;
      postForm["minToRead"].value = post.mintoread;
      postForm["avatarAuthor"].value = post.avatarAuthor;
      postForm["cancel_btn"].setAttribute(
        "onclick",
        `window.location.href='./viewPost.html?postId=${postId}'`
      );
    })
    .catch((err) => {
      console.log(err);
    });
});

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
    let post = {
      title: postTitle,
      content: postContent,
      tags: postTags,
      urlCoverImage: postUrlCoverImage,
      author: postAuthor,
      mintoread: postMinToRead,
      avatarAuthor: postAvatarAuthor,
    };

    let postId = window.location.search.substring(8);
    let postUrl = `https://devto-clone-team3-default-rtdb.firebaseio.com/posts/${postId}.json`;

    fetch(postUrl, {
      method: "PATCH",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          let err = new Error(
            `Algo salio mal, status: ${response.status} ${response.statusText} type: ${response.type}`
          );
          throw err;
        } else {
          return response.json();
        }
      })
      .then((finalResponse) => {
        //console.log(finalResponse);
        alert(`Post con el id ${postId} modificado exitosamente`);
        window.location.replace(`/viewPost.html?postId=${postId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

document.getElementById("delete_btn").addEventListener("click", () => {
  let postId = window.location.search.substring(8);
  let postUrl = `https://devto-clone-team3-default-rtdb.firebaseio.com/posts/${postId}.json`;

  fetch(postUrl, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        let err = new Error(
          `Algo salio mal, status: ${response.status} ${response.statusText} type: ${response.type}`
        );
        throw err;
      } else {
        return response.json();
      }
    })
    .then((finalResponse) => {
      window.location.pathname = "/index.html";
      //alert(`Post con el id ${finalResponse.name} eliminado exitosamente`);
    })
    .catch((err) => {
      console.log(err);
    });
});

document.getElementById("btn_urlCoverImage").addEventListener("click", () => {
  document.getElementById("urlCoverImage").classList.toggle("hidden");
});
