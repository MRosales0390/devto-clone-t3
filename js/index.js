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
      tagsList += `#${currentTag} `;

      return tagsList;
    }, "");
  }

  return formattedTags;
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
      let latestPostsSection = document.getElementById("latest");
      let topPostsSection = document.getElementById("top");

      for (post in posts) {
        let printDate = getFormattedDate(posts[post].createdDate);
        let tagsList = getTagsList(posts[post].tags);

        postsLayout += `
            <div class="card mb-3">
                <div class="card-header bg-white border-0">
                    <div class="row">
                        <div class="col-2">
                            <img src="${posts[post].avatarAuthor}" class="rounded-circle img-thumbnail" alt="...">
                        </div>
                        <div class="col-10">
                            <p class="card-text">${posts[post].author}</p>
                            <p class="card-text "><small class="text-muted">${printDate}</small></p>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center"><a href="/viewPost.html?postId=${post}" class="link-title">${posts[post].title}</a></h5>
                    <p class="card-text text-center"><small class="text-muted">${tagsList}</small></p>
                </div>
                <div class="card-footer bg-white border-0">
                    <p class="card-text text-end"><small class="text-muted">${posts[post].mintoread} min read</small></p>
                </div>
            </div>
        `;
      }

      relevantPostsSection.innerHTML = postsLayout;
      latestPostsSection.innerHTML = postsLayout;
      topPostsSection.innerHTML = postsLayout;
    })
    .catch((err) => {
      console.log(err);
    });
});