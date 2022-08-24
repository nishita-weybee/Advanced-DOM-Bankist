const characterContainer = document.querySelector(".character-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const loader = document.querySelector(".loader");
const character = document.querySelectorAll(".character");

let details = [];
let curPage = 1;

function store(id, fullName, url, page) {
  const detail = {
    id,
    fullName,
    url,
    page,
  };
  details.push(detail);
}

const displayChar = function (url, name, id) {
  const html = `
      <div class="character front" onclick='toggle(id)' id="${id}">
        <img src=${url} alt="img" />
        <div class="name">${name}</div>
    </div>`;
  characterContainer.insertAdjacentHTML("beforeend", html);
};

const displayDetails = function (
  id,
  url,
  name,
  birthYear,
  gender,
  species,
  homeworld
) {
  const html = `
  <div class="info" id="info-${id}">
  <img src="${url}" class="image" />
  <div class="all-info">
    <div class="char-name">${name}</div>
    <div class="char-info">Birth Year: ${birthYear}</div>
    <div class="char-info">Gender: ${gender}</div>
    <div class="char-info">Species: ${species}</div>
    <div class="char-info">Homeworld: ${homeworld} </div>
  </div>
</div>
   `;
  document.getElementById(id).innerHTML = html;
  document.getElementById(id).style.transform = "rotateY(0deg)";
};

function displayCharAfter(id) {
  let path;

  if (id >= 16) {
    path = details[id - 1];
  } else {
    path = details[id + 1];
  }

  const html = `  
          <img src=${path.url} alt="img" />
          <div class="name">${path.fullName}</div>`;
  document.getElementById(id).innerHTML = html;
}

(async function getCharData() {
  let name;
  let i = 1;
  try {
    while (i != null) {
      const charData = await fetch(
        `https://swapi.dev/api/people/?page=${i}`
      ).then((res) => res.json());

      for (var j = 0; j < charData.results.length; j++) {
        url = charData.results[j].url.match(/(\d+)/)[0];
        name = charData.results[j].name;
        const imgURL = await fetch(
          `https://starwars-visualguide.com/assets/img/characters/${url}.jpg`
        ).then((data) => data.url);
        store(url, name, imgURL, +i);
      }

      if (i === 1) {
        characterContainer.innerHTML = "";
        renderChar(1);
      }

      if (charData.next === null) return;
      i = charData.next.match(/(\d+)/)[0];
    }
  } catch (err) {
    console.error(`${err.message}`);
  }
})();

function renderChar(page) {
  details
    .filter((elem) => elem.page === +page)
    .forEach((elem) => {
      displayChar(elem.url, elem.fullName, elem.id);
    });
  document.querySelector(".navigate").style.display = "block";
}

async function getModalData(id) {
  try {
    const imgURL = await fetch(
      `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
    ).then((data) => data.url);

    const charData = await fetch(`https://swapi.dev/api/people/${id}/`).then(
      (res) => res.json()
    );

    // Name, BirthYear, Gender
    const name = charData.name;
    const birthYear = charData.birth_year;
    const gender = charData.gender;

    // HomeWorld
    const homeworld = await fetch(charData.homeworld)
      .then((res) => res.json())
      .then((data) => data.name);

    // Speices
    const speciesArr = charData.species;
    let specie;
    if (speciesArr.length !== 0) {
      for (var i = 0; i < speciesArr.length; i++) {
        const species = await fetch(speciesArr[i])
          .then((res) => res.json())
          .then((data) => data.name);
        specie = species;
      }
    } else {
      specie = "unknown";
    }

    // Films
    const filmsArr = charData.films;
    let film = [];
    if (filmsArr !== 0) {
      for (var i = 0; i < filmsArr.length; i++) {
        const films = await fetch(filmsArr[i])
          .then((res) => res.json())
          .then((data) => data.title);
        film.push(films);
      }
    }

    displayDetails(
      id,
      imgURL,
      name,
      birthYear,
      gender,
      specie,
      homeworld,
      film.join(", ")
    );
  } catch (err) {
    console.error(`${err.message}`);
  }
}

async function toggle(id) {
  let ele1 = document.getElementById(id);
  console.log(ele1);

  if (!ele1.classList.contains("back")) {
    ele1.classList.add("back");
    ele1.classList.remove("front");
  }

  if ((document.getElementById(id).style.transform = "rotateY(0deg)")) {
    document.getElementById(id).style.transform = "rotateY(180deg)";
  }

  (function loader() {
    ele1.innerHTML = '<div class="loader"><img src="img/img.png" /></div>';
  })();

  await getModalData(id);
}

document.addEventListener("click", function (e) {
  let prev = document.querySelector(".active");
  if (e.target.classList.contains("dot")) {
    let elem = e.target.id;
    page = elem.charAt(elem.length - 1);
    characterContainer.innerHTML = "";
    prev.classList.remove("active");
    document.getElementById(elem).classList.add("active");
    renderChar(page);
  }
});
