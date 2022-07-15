document.getElementById("save_btn").addEventListener("click", () => {
  const server_url = "http://localhost:8080/createPost"
  let postTitle = document.getElementById("title").value
  let postContent = document.getElementById("content").value.replaceAll('"', "")
  let postTags = document.getElementById("tags").value
  let postUrlCoverImage = document.getElementById("urlCoverImage").value
  let postAuthor = document.getElementById("author").value
  let postMinToRead = document.getElementById("minToRead").value
  let postAvatarAuthor = document.getElementById("avatarAuthor").value

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
    alert("Hay campos vacíos ó erróneos, favor de revisar.")
  } else {
    let today = new Date()
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes()

    let post = {
      title: postTitle,
      content: postContent,
      tags: postTags.split(","),
      urlCoverImage: postUrlCoverImage,
      author: postAuthor,
      //createdDate: date,
      minToRead: postMinToRead,
      authorAvatar: postAvatarAuthor
    }
    console.log(post)

    fetch(server_url, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((finalResponse) => {
        document.getElementById("postForm").reset()
        //console.log(finalResponse.data.createdPost._id)
        window.location.replace(
          `/viewPost.html?postId=${finalResponse.data.createdPost._id}`
        )
        //alert(`Post registrado exitosamente con el id ${finalResponse.name}`);
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

document.getElementById("btn_urlCoverImage").addEventListener("click", () => {
  document.getElementById("urlCoverImage").classList.toggle("hidden")
})

document.getElementById("cancel_btn").addEventListener("click", () => {
  window.location.pathname = `/index.html`
})
