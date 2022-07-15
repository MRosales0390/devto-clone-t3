const token = localStorage.getItem("token")

const API_URL = "http://localhost:8080/user";
const button = document.querySelector("")

button.addEventListener("click", async (event) => {
  event.preventDefault()

  const data = fetch(API_URL, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  const user = await data
  console.log("user", await user.json())
})