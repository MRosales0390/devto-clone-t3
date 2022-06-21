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

  if (
    currentDate.getFullYear() != postDate.getFullYear() ||
    currentDate.getMonth() != postDate.getMonth() ||
    currentDate.getDate() != postDate.getDate()
  ) {
    //printDate = `${monthShortNameList[postDate.getMonth()]} ${postDate.getDay()} '${}`
    printDate = `${postDate.toLocaleString("en-US", {
      month: "short",
    })} ${postDate.getDate()} '${postDate.getFullYear().toString().slice(-2)}`;
  } else {
    printDate = `${postDate.toLocaleString("en-US", {
      month: "short",
    })} ${postDate.getDate()} (${
      currentDate.getHours() != postDate.getHours()
        ? currentDate.getHours() - postDate.getHours() + " hour(s) ago"
        : currentDate.getMinutes() - postDate.getMinutes() + " minute(s) ago"
    })`;
  }

  return printDate;
};

const getTagsList = (listOfTags) => {
  let formattedTags = "";
  if (getTagsList) {
    let tagsArray = listOfTags.split(",");

    formattedTags = tagsArray.reduce((tagsList, currentTag) => {
      tagsList += `#${currentTag.trim()} `;

      return tagsList;
    }, "");
  }

  return formattedTags;
};

const getCardTemplate = (post, currentId = 0, includeImageOnHeader = false) => {
  let printDate = getFormattedDate(post.createdDate);
  let tagsList = getTagsList(post.tags);

  let postLayout = `
      <div class="card mb-3">
          ${
            includeImageOnHeader
              ? `<img src="${post.urlCoverImage}" class="card-img-top" alt="..."></img>`
              : ""
          }
          <div class="card-header bg-white border-0 pt-4">
              <div class="d-inline-flex">
                <span>
                  <img src="${
                    post.avatarAuthor
                  }" class="rounded-circle img-thumbnail" alt="...">
                </span>
                <span class="ms-2">
                  <p class="card-text">${post.author}</p>
                  <p class="card-text"><small class="text-muted smaller-text">${printDate}</small></p>
                </span>
              </div>
          </div>
          <div class="card-body">
              <h5 class="card-title text-start ps-4"><a href="/viewPost.html?postId=${currentId}" class="link-title">${
    post.title
  }</a></h5>
              <p class="card-text text-start ps-4"><small class="text-muted">${tagsList}</small></p>
          </div>
          <div class="card-footer bg-white border-0 mb-2">
            <div class="card-text">
              <div class="row">
                <div class="col-7 text-start">
                <small class="text-muted smaller-text ps-4">
                  <i class="fa-regular fa-heart p-1"></i> ${
                    Math.floor(Math.random() * 100) + 1
                  } reactions</small>
                  <small class="text-muted smaller-text"><i class="fa-regular fa-comments p-1"></i> Add Comment</small>
                </div>
                <div class="col-5 text-end">
                  <small class="text-muted smaller-text">${
                    post.mintoread
                  } min read</small>
                  <button type="button" class="btn btn-secondary btn-save-custom">Save</button>
                </div>
              </div>
            </div>
          </div>
      </div>
  `;

  return postLayout;
};

const getPosts = (filter = "") => {
  return new Promise(function (resolve, reject) {
    fetch("https://devto-clone-team3-default-rtdb.firebaseio.com/posts/.json", {
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
      .then((posts) => {
        let postsLayout = "";
        let firstPost = true;
        let topPosts = {};

        if (filter === "") {
          topPosts = posts;
        } else {
          topPosts = Object.fromEntries(
            Object.entries(posts).filter(([key, value]) => {
              return value.tags.replaceAll(" ", "").split(",").includes(filter);
            })
          );
        }

        for (post in topPosts) {
          postsLayout += getCardTemplate(posts[post], post, firstPost);
          firstPost = false;
        }

        resolve(postsLayout);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://devto-clone-team3-default-rtdb.firebaseio.com/posts/.json", {
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
    .then((posts) => {
      let postsLayout = "";
      let relevantPostsSection = document.getElementById("relevant");
      let firstPost = true;

      for (post in posts) {
        postsLayout += getCardTemplate(posts[post], post, firstPost);
        firstPost = false;
      }

      relevantPostsSection.innerHTML = postsLayout;
    })
    .catch((err) => {
      console.log(err);
    });
});

document
  .querySelector("#top-tab")
  .addEventListener("shown.bs.tab", function () {
    let topPostsSection = document.getElementById("top");
    let test = getPosts("top").then(
      (response) => (topPostsSection.innerHTML = response)
    );
    /*
    fetch("https://devto-clone-team3-default-rtdb.firebaseio.com/posts/.json", {
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
      .then((posts) => {
        let postsLayout = "";
        let topPostsSection = document.getElementById("top");
        let firstPost = true;

        const topPosts = Object.fromEntries(
          Object.entries(posts).filter(([key, value]) => {
            return value.tags.replaceAll(" ", "").split(",").includes("top");
          })
        );

        for (post in topPosts) {
          postsLayout += getCardTemplate(posts[post], post, firstPost);
          firstPost = false;
        }

        topPostsSection.innerHTML = postsLayout;
      })
      .catch((err) => {
        console.log(err);
      });*/
  });

document
  .querySelector("#latest-tab")
  .addEventListener("shown.bs.tab", function () {
    let topPostsSection = document.getElementById("latest");
    let test = getPosts("latest").then(
      (response) => (topPostsSection.innerHTML = response)
    );
  });