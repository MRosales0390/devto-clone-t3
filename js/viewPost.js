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
const getFormattedDate = (postOriginalDate) => {
  let currentDate = new Date();
  let postDate = new Date(postOriginalDate);
  //let monthShortNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let printDate = "";

  printDate = `Posted on ${postDate.getDate()} ${postDate
    .toLocaleString("en-US", {
      month: "short",
    })
    .toLowerCase()}`;

  return printDate;
};

const getTagsList = (listOfTags) => {
  let formattedTags = "";
  if (getTagsList) {
    let tagsArray = listOfTags.split(",");

    formattedTags = tagsArray.reduce((tagsList, currentTag) => {
      tagsList += `#${currentTag} `;

      return tagsList;
    }, "");
  }

  return formattedTags;
};

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
      let postsLayout = "";
      let relevantPostsSection = document.getElementById("postBody");
      let printDate = getFormattedDate(post.createdDate);
      let tagList = getTagsList(post.tags);

      postsLayout = `
            <div class="card mb-3">
                <img src="${post.urlCoverImage}" class="card-img-top" alt="...">
                <div class="card-header bg-white border-0 ms-3">
                  <div class="d-inline-flex">
                    <span>
                      <img src="${post.avatarAuthor}" class="rounded-circle img-thumbnail" alt="...">
                    </span>
                    <span class="ms-2">
                      <p class="card-text">${post.author}</p>
                      <p class="card-text"><small class="text-muted smaller-text">${printDate}</small></p>
                    </span>
                  </div>
                </div>
                <div class="card-body ms-3">
                    <h1 class="card-title">${post.title}</h1>
                    <p class="card-text mb-3"><small class="text-muted">${tagList}</small></p>
                    <p class="card-text">${post.content}</p>
                </div>
                <div class="card-footer bg-white border-0 mb-2">
                <div class="card-text">
                  <div class="row">
                    <div class="col-12 text-end">
                      <a href="/editPost.html?postId=${postId}" class="btn btn-secondary btn-save-custom">Edit Post</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      `;

      relevantPostsSection.innerHTML = postsLayout;
    })
    .catch((err) => {
      console.log(err);
    });
});
