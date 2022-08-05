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

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1;
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
// getCountryData('australia');
// getCountryData('usa');

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
// getCountryAndNeighbour('usa');


// Using Promises 

const request = fetch('https://restcountries.com/v2/name/usa');
console.log(request);

const getJSON = function (url) {

    return fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error(`${errorMsg} ${response.status}`)
            return response.json();
        })
}

const getCountryData = function (country) {

    getJSON(`https://restcountries.com/v2/name/${country}`, 'Country Not Found')

        .then(data => {
            console.log(data);
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            if (!neighbour) throw new Error('No neighbour found');

            return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found');
        })

        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
            console.log(`${err} 💥💥💥`)
            renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`)
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        })
};



btn.addEventListener('click', function () {
    whereAmI(19.037, 72.873);
    whereAmI(52.508, 13.381)
    getCountryData('germany');
})

// api key : 55d0bff4e74943198e1c78d5232484de

// Learning API
console.log('TEST START')
setTimeout(() => console.log('0 sec timer'), 0)
Promise.resolve('Resolved Promise 1').then(res => console.log(res))

Promise.resolve('Resolved Promise 2').then(res => {
    for (var i = 0; i < 10000; i++) {
        console.log(res)
    }
})
console.log('test end')

// Build promise
const lotteryPromise = new Promise(function (resolve, reject) {
    console.log('Lottery draw is happening');
    setTimeout(function () {
        if (Math.random() >= 0.5) {
            resolve('You win')
        } else {
            reject(new Error('You lost'))
        }
    }, 2000)
})

lotteryPromise.then(res => console.log(res))
    .catch(err => console.error(err))

function wait(seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    })
}

wait(2).then(() => {
    console.log('i waited for 2 seconds')
    return wait(1);
}).then(() => console.log('i waited for 1 sec'))

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

getPosition().then(pos => console.log(pos));





// Consuming Promises with async/await

// const getPosition = function () {
//     return new Promise(function (resolve, reject) {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     })
// }

const whereAmI = async function () {
    try {
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;
        const resGeo = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=55d0bff4e74943198e1c78d5232484de&q=${lat}+${lng}&pretty=1&no_annotations=1`)

        const dataGeo = await resGeo.json();
        let country = dataGeo.results[0].components.country
        // console.log(country);

        const res = await fetch(`https://restcountries.com/v2/name/${country}`)
        const data = await res.json();
        // console.log(data);
        renderCountry(data[0]);


        return `You are in ${dataGeo.results[0].components.city}, ${country}  `
    } catch (err) {
        console.log(err);
        renderError(`Something went wrong ${err.message}`)
    }
}



    (async function () {
        try {
            const city = await whereAmI()
            console.log(`2: ${city}`)
        } catch (err) {
            console.log(`2:${err.message}`)
        }
        console.log(`3: finish`)
    });


const get3countries = async function (C1, C2, C3) {
    try {
        // const [data1] = await getJSON(`https://restcountries.com/v2/name/${C1}`),
        // const [data2] = await getJSON(`https://restcountries.com/v2/name/${C2}`),
        // const [data3] = await getJSON(`https://restcountries.com/v2/name/${C3}`)

        const data = await Promise.all([
            getJSON(`https://restcountries.com/v2/name/${C1}`),
            getJSON(`https://restcountries.com/v2/name/${C2}`),
            getJSON(`https://restcountries.com/v2/name/${C3}`)])

        console.log(data);

    } catch (err) {
        console.log(err.message);
    }
}

// get3countries('india', 'canada', 'australia')




// (async function () {
//     const data = await Promise.race([
//         getJSON(`https://restcountries.com/v2/name/india`),
//         getJSON(`https://restcountries.com/v2/name/canada`),
//         getJSON(`https://restcountries.com/v2/name/australia`)])

//     console.log(data[0])
// })();

// takes an iterable of promises as an input
// Promise.any => returns 1st fulfilled promise
Promise.any([
    Promise.resolve('success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
    .then(res => console.log(res))
    .catch(err => console.log(err))


// Promise.all => returns if all promise are fulfilled 
Promise.all([
    Promise.resolve('success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
    .then(res => console.log(res))
    .catch(err => console.log(err))

// Promise.settledAll => returns all the promise - rejected and resolved
Promise.allSettled([
    Promise.resolve('success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
    .then(res => console.log(res))
    .catch(err => console.log(err))
