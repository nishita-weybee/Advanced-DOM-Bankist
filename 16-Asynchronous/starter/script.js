'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


// Using XML 
const renderCountry = function (data, className = '') {

    const html = `        
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
  </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {
//         // console.log(this.responseText);
//         const [data] = JSON.parse(this.responseText);
//         // console.log(data);
//         renderCountry(data);
//     })
// }
// // getCountryData('australia');
// // getCountryData('usa');

// const getCountryAndNeighbour = function (country) {

//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {
//         // console.log(this.responseText);
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
//         // Render Country 1
//         renderCountry(data);
//         // Get neighbour country 2 
//         const [neighbour] = data.borders;
//         // console.log(neighbour);
//         if (!neighbour) return;

//         // AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function () {
//             // console.log(this.responseText);
//             const data2 = JSON.parse(this.responseText);
//             // console.log(data2);
//             renderCountry(data2, 'neighbour');
//         })
//     })
// }
// // getCountryAndNeighbour('usa');


// Using Promises 

// const request = fetch('https://restcountries.com/v2/name/usa');
// console.log(request);

const getCountryData = function (country) {

    fetch(`https://restcountries.com/v2/name/${country}`)

        .then(response => response.json())

        .then(data => {
            renderCountry(data[0]);
            
            const neighbour = data[0].borders[0];
            if (!neighbour) return;
            return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
        })
        .then(response => response.json())
        .then(data => renderCountry(data, 'neighbour'));
};

getCountryData('germany');
// getCountryData('japan')