const API_URL = "http://localhost:8080/login";
const button = document.querySelector("#login-btn")
const emailElement = document.querySelector("#inputmail")
const passwordElement = document.querySelector("#inputpass")

button.addEventListener("click", async (event) => {
    console.log("hi")
//   event.preventDefault()

  const email = emailElement.value
  const password = passwordElement.value
  console.log("email", email)
  console.log("password", password)

  const dataForBackend = {
    email,
    password
  }

  const data = await fetch(API_URL, {
    method: "Post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataForBackend)
  })

  const response = await data.json()
  const token = response.token

  localStorage.setItem("token", token)
  window.location.href = "/index.html"
})