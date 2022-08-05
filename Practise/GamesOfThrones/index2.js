"use strict";
// 2.
// To get characters of game of thrones by name

const btn = document.querySelector(".btn-character");
const charactersContainer = document.querySelector(".characters");
const listContainer = document.querySelector(".list");
const input = document.querySelector("input");

let arr = [];

const renderData = function (data, id) {
  const html = `<article class="character" id="${id}-character">
    <img class="character__img" src="${data.imageUrl}" />
    <div class="character__data">
    <h3 class="character__name">${data.fullName}</h3>
    <p class="character__row"><span>Title:</span>${data.title}</p>
    <p class="character__row"><span>Family:</span>${data.family}</p>
    </div>
</article>`;
  charactersContainer.insertAdjacentHTML("beforeend", html);
  charactersContainer.style.opacity = 1;
};

async function getData(id) {
  try {
    const res = await fetch(
      `https://thronesapi.com/api/v2/Characters/${id - 1}`
    );
    const result = await res.json();
    renderData(result, id);
  } catch (err) {
    console.log(`${err.message}`);
  }
}

function showData() {
  const enterId = +input.value;

  if (arr.indexOf(enterId) === -1) {
    if (enterId >= 1 && enterId <= 53) {
      arr.push(enterId);
      getData(enterId);
      btn.style.backgroundColor = "#0a6772c7";
      const listItem = document.getElementById(enterId);
      listItem.classList.add("focus");
    } 
    else {
      alert("Enter number between 1 to 53");
    }
  } else {
    alert("Already Displayed");
  }

  input.value = "";
}

btn.addEventListener("click", function () {
  showData();
});

input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    showData();
  }
});

input.addEventListener("click", function () {
  btn.style.backgroundColor = "#88888880";
});

const renderList = function (name, i) {
  const html = `<li class ="list-element" id="${i}" > ${i}  ${name} </li>`;
  listContainer.insertAdjacentHTML("afterbegin", html);
};

(async function characterName() {
  const res = await fetch(`https://thronesapi.com/api/v2/Characters`);
  const names = await res.json();
  for (var i = 52; i >= 0; i--) {
    renderList(names[i].fullName, i + 1);
  }

  listContainer.addEventListener("click", function (e) {
    const i = +e.target.id;
    const listItem = document.getElementById(i);
    listItem.classList.add("focus");

    if (arr.indexOf(i) === -1) {
      arr.push(i);
      console.log(arr);
      getData(i);
      btn.style.backgroundColor = "#0a6772c7";
    } else {
      const character = document.getElementById(`${i}-character`);

      charactersContainer.removeChild(character);
      console.log(character);
      listItem.classList.remove("focus");

      const index = arr.indexOf(i);

      arr.splice(index, 1);
      console.log(arr);
    }
  });
})();
