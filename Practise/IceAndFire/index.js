"use strict";
// 1.
// To display characters from Ice And Fire

const btn = document.querySelector(".btn-character");
const charactersContainer = document.querySelector(".characters");
const loader = document.getElementById("loader");
const heading = document.querySelector(".heading");

const renderData = function (data) {
  const html = `<article class="character animate-bottom">
    <img class="character__img" src="${data.imageUrl}" />
    <div class="character__data">
    <h3 class="character__name">${data.fullName}</h3>
    <p class="character__row"><span>Title:</span>${data.title}</p>
    <p class="character__row"><span>Family:</span>${data.family}</p>
    </div>
</article>`;
  charactersContainer.insertAdjacentHTML("beforeend", html);
};

// const getCharacter = function (n) {
//   fetch(`https://thronesapi.com/api/v2/Characters/${n}`);
//   Promise.resolve("Data from Api").then((res) => res.json());
//   Promise.resolve("Convert To Json")
//     .then((data) => renderData(data))
//     .catch((err) => console.error(err.message));
// };

const getCharacter = function (n) {
  return new Promise((resolve, reject) => {
    fetch(`https://thronesapi.com/api/v2/Characters/${n}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

btn.addEventListener("click", function () {
  loader.style.display = "block";
  btn.style.display = "none";
  heading.style.display = "none";

  setTimeout(function () {
    loader.style.display = "none";
    heading.classList.add("animate-bottom");
    heading.style.display = "block";

    for (var n = 0; n < 51; n++) {
      getCharacter(n)
        .then((res) => res.json())
        .then((data) => renderData(data))
        .catch((err) => console.log(err.message));
    }
  }, 2000);
});

