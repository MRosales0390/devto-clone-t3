const token = localStorage.getItem("token") || ""

document.addEventListener("DOMContentLoaded", () => {
  let postId = window.location.search.substring(8)
  let postUrl = `http://localhost:8080/post/${postId}`

  fetch(postUrl, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => {
      if (!response.ok) {
        let err = new Error(
          `Algo salio mal, status: ${response.status} ${response.statusText} type: ${response.type}`
        )
        throw err
      } else {
        return response.json()
      }
    })
    .then((postObject) => {
      let postForm = document.getElementById("postForm")
      console.log(postObject)
      const post = postObject.data.getPost

      postForm["title"].value = post.title
      postForm["content"].value = post.content
      postForm["tags"].value = post.tags
      postForm["urlCoverImage"].value = post.urlCoverImage
      postForm["author"].value = post.author
      postForm["minToRead"].value = post.minToRead
      postForm["avatarAuthor"].value = post.authorAvatar
      postForm["cancel_btn"].setAttribute(
        "onclick",
        `window.location.href='./viewPost.html?postId=${postId}'`
      )
    })
    .catch((err) => {
      console.log(err)
    })
})

document.getElementById("save_btn").addEventListener("click", async () => {
  let postTitle = document.getElementById("title").value
  let postContent = document.getElementById("content").value
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
    const post = {
      title: postTitle,
      content: postContent,
      tags: postTags.split(","),
      urlCoverImage: postUrlCoverImage,
      author: postAuthor,
      minToRead: postMinToRead,
      authorAvatar: postAvatarAuthor
    }

    const postId = window.location.search.substring(8)
    const postUrl = `http://localhost:8080/post/${postId}`

    try {
      const data = fetch(postUrl, {
        method: "PATCH",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`
        }
      })

      const postObject = await data
      const response = await postObject
      if (!response.ok) {
        let err = new Error(
          `Algo salio mal, status: ${response.status} ${response.statusText} type: ${response.type}`
        )
        throw err
      } else {
        alert(`Post con el id ${postId} modificado exitosamente`)
        window.location.replace(`/viewPost.html?postId=${postId}`)
      }
    } catch (error) {
      window.alert("Debes ingresar antes de poder editar un post")
      window.location.replace(`/login.html`)
    }
  }
})

document.getElementById("delete_btn").addEventListener("click", async () => {
  let postId = window.location.search.substring(8)
  let postUrl = `http://localhost:8080/post/${postId}`

  try {
    const data = fetch(postUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const postObject = await data
    const response = await postObject

    console.log(response)
    if (!response.ok) {
      let err = new Error(
        `Algo salio mal, status: ${response.status} ${response.statusText} type: ${response.type}`
      )
      throw err
    } else {
      window.location.pathname = "/index.html"
    }
  } catch (error) {
    window.alert("Debes ingresar antes de poder editar un post")
    window.location.replace(`/login.html`)
  }
})

document.getElementById("btn_urlCoverImage").addEventListener("click", () => {
  document.getElementById("urlCoverImage").classList.toggle("hidden")
})
