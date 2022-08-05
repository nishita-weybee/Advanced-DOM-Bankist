'use strict';

class Workout {
    date = new Date();
    id = Date.now();
    checked = false;

    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${ months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
}

class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }
    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace
    }
}

class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }
    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class App {
    #map;
    #mapZoomlevel = 13;
    #mapEvent;
    #workouts = [];
    #newLayerGroup;

    constructor() {


        this._getPosition();

        this._getLocaleStorage();

        form.addEventListener('submit', this._newWorkout.bind(this))
        inputType.addEventListener('change', this._toggleElevationField)
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this))
    }
    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert('Could find your location')
            })
    }
    _loadMap(pos) {
        const { latitude } = pos.coords;
        const { longitude } = pos.coords;
        const coords = [latitude, longitude];
        console.log(coords);
        this.#map = L.map('map').setView(coords, this.#mapZoomlevel);
        this.#newLayerGroup = L.layerGroup().addTo(this.#map)
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        this.#map.on('click', this._showForm.bind(this))

        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work)
        })
    }
    _showForm(mapE) {
        this.#mapEvent = mapE
        form.classList.remove('hidden');
        inputDistance.focus()
    }

    _hideForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => {
            form.style.display = 'grid';
        }, 1000);
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    }
    _newWorkout(e) {
        e.preventDefault();

        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;

        if (type === 'running') {
            const cadence = +inputCadence.value;
            if (
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            ) return alert('Inputs have to be positive numbers!');
            workout = new Running([lat, lng], distance, duration, cadence);
        }

        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            if (
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration)
            ) return alert('Inputs have to be positive numbers!');
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        this.#workouts.push(workout);

        this._renderWorkoutMarker(workout);
        this._renderWorkout(workout);
        this._hideForm();
        this._setLocaleStorage();
          
    }

    _renderWorkoutMarker(workout) {

        const newMarker = L.marker(workout.coords)
        this.#newLayerGroup.addLayer(newMarker)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,
            }))
            .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
            .openPopup(workout.coords);

        // const overlay = {'markers': this.#newLayerGroup};
        // L.control.layers(null, overlay).addTo(this.#map);

        // console.log(newLayerGroup);
        // newLayerGroup.eachLayer((layer) => {
        //     if (deletedDocID === layer.options.uniqueID) {
        //         newLayerGroup.removeLayer(layer);
        //     }
        // });

        // L.marker(workout.coords)
        //     .addTo(this.#map)
        //     .bindPopup(L.popup({
        //         maxWidth: 250,
        //         minWidth: 100,
        //         autoClose: false,
        //         closeOnClick: false,
        //         className: `${workout.type}-popup`,
        //     }))
        //     .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
        //     .openPopup();
    }

    _renderWorkout(workout) {
        console.log(workout.id);
        let html = `
        <li class="workout workout--${workout.type}" data-id='${workout.id}'>
        <h2 class="workout__title"></h2>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>`;

        if (workout.type === 'running')
            html += `
                <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            </li>`;

        if (workout.type === 'cycling')
            html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed}</span>
            <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
        </div>
        </li> `;

        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');

        if (!workoutEl) return;
        const workout = this.#workouts.find(
            work => work.id == workoutEl.dataset.id
        );
        this.#map.setView(workout.coords, this.#mapZoomlevel, {
            aniamte: true,
            pan: {
                duration: 1
            }
        })
    }

    _setLocaleStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }

    _getLocaleStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));
        if (!data) return;

        this.#workouts = data;
        this.#workouts.forEach(work => this._renderWorkout(work)
        )
    }

    reset() {
        localStorage.removeItem('workouts');
        location.reload();
    }

    // editWorkout() {

    // }

    // deleteWorkout() {

    // }

    // deleteAllWorkout() {

    // }

    // sortWorkout() {

    // }

}
const app = new App();
