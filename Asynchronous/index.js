'use strict';

// Coding Challenge 1 
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// const renderCountry = function (data, className = '') {

//     const html = `        
//     <article class="country ${className}">
//         <img class="country__img" src="${data.flag}" />
//         <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//         </div>
//   </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
// }

// const whereAmI = function () {
//     getPosition()
//         .then(pos => {
//             const { latitude: lat, longitude: lng } = pos.coords;
//             return fetch(`https://api.opencagedata.com/geocode/v1/json?key=55d0bff4e74943198e1c78d5232484de&q=${lat}+${lng}&pretty=1&no_annotations=1`)
//         })
//         .then(response => {
//             if (!response.ok) throw new Error(`Problem with geocoding ${response.staus}`)
//             return response.json()
//         })
//         .then(data => {
//             console.log(data);
//             const select = data.results[0].components;
//             console.log(select.country);
//             !select.city ? console.log(`You are in ${select.country}`) : console.log(`You are in ${select.city}, ${select.country}`)
//             return fetch(`https://restcountries.com/v2/name/${select.country}`)
//         })
//         .then(response => {
//             if (!response.ok)
//                 throw new Error(`${response.status}`)
//             return response.json()
//         })
//         .then(data => {
//             console.log(data);
//             renderCountry(data[0])
//         })
//         .catch(err => console.error(`${err.message}`))
// }

// btn.addEventListener('click', function () {
//     whereAmI(19.037, 72.873)
//     whereAmI(52.508, 13.381)
// })

// // Coding Challenge 2
const imageBox = document.querySelector('.images');

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function (e) {
            imageBox.append(img)
            resolve(img)
        })
        img.addEventListener('error', function () {
            reject(new Error('Image not found'))
        })
    })
}

// let curImg;
// createImage('img/img-1.jpg')
//     .then(img => {
//         curImg = img;
//         console.log('Image 1 loaded')
//         return wait(2)
//     })
//     .then(() => {
//         curImg.style.display = "none"
//         return createImage('img/img-2.jpg')
//     })
//     .then((img) => {
//         curImg = img;
//         console.log('Image 2 loaded');
//         return wait(2);
//     })
//     .then(() => {
//         curImg.style.display = "none";
//         return createImage('img/img-3.jpg')
//     })
//     .then((img) => {
//         curImg = img;
//         console.log('Image 3 loaded');
//         return wait(2)
//     })
//     .then(() => {
//         curImg.style.display = 'none'
//     })
//     .catch(err => console.log(err))

// function wait(seconds) {
//     return new Promise(function (resolve) {
//         setTimeout(resolve, seconds * 1000);
//     })
// }


// Coding Challenge 3
// const loadPause = async function () {
//     try {
//         let img = await createImage('img/img-1.jpg');
//         console.log('img 1');
//         await wait(2)
//         img.style.display = "none"

//         img = await createImage('img/img-2.jpg')
//         console.log('img-2');
//         await wait(2);
//         img.style.display = "none"

//         img = await createImage('img/img-3.jpg')
//         console.log('img-3');
//         await wait(2);
//         img.style.display = 'none'

//     } catch (err) {
//         console.log(err.message);
//     }
// }
// loadPause();

const loadAll = async function (imgArr) {
    try {
        const imgs = await imgArr.map(async elem => await createImage(elem))
        console.log(imgs);

        const imgEl = await Promise.all(imgs);
        console.log(imgEl);
        imgEl.forEach(img => img.classList.add('parallel'))
    }
    catch (err) {
        console.log(err.message);
    }
}
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);