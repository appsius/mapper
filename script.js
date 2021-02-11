'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// ***********************************************************************//
// Get Current Location
// ******************************* 1 ************************************//
//class Workout {
//  date = new Date();
//  id = (Date.now() + '').slice(-10);

//  constructor(coords, distance, duration) {
//    this.coords = coords;
//    this.distance = distance;
//    this.duration = duration;
//  }
//}

//class Running extends Workout {
//  constructor(coords, distance, duration, cadence) {
//    super(coords, distance, duration);
//    this.cadence = cadence;

//    this.calcPace();
//  }

//  calcPace() {
//    this.pace = this.duration / this.distance;
//    return this.pace;
//  }
//}

//class Cycling extends Workout {
//  constructor(coords, distance, duration, elevationGain) {
//    super(coords, distance, duration);
//    this.elevationGain = elevationGain;

//    this.calcSpeed();
//  }

//  calcSpeed() {
//    this.speed = this.distance / (this.duration / 60); // --> km / (m/60 = h)
//    return this.speed;
//  }
//}

//const run1 = new Running([37, 38], 2, 100, 55);
//const cycling1 = new Cycling([37, 40], 4, 150, 55);
//console.log(run1, cycling1);

//// APPLICATION ARCHITECTURE
//class App {
//  #map;
//  #mapEvent;

//  constructor() {
//    this._getPosition();
//    form.addEventListener('submit', this._newWorkout.bind(this));
//    inputType.addEventListener('change', this._toggleElevation);
//  }

//  _loadMap(position) {
//    const { latitude } = position.coords;
//    const { longitude } = position.coords;
//    const coords = [latitude, longitude];
//    this.#map = L.map('map').setView(coords, 13);

//    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//      attribution:
//        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//    }).addTo(this.#map);

//    //Handling clicks on map
//    this.#map.on('click', this._showForm.bind(this));
//  }

//  _getPosition() {
//    if (navigator.geolocation)
//      navigator.geolocation.getCurrentPosition(
//        this._loadMap.bind(this),
//        function () {
//          alert('Your current position is not available!');
//        }
//      );
//  }

//  _showForm(mapEv) {
//    this.#mapEvent = mapEv;
//    form.classList.remove('hidden');
//    inputDistance.focus();
//  }

//  _toggleElevation() {
//    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//  }

//  _newWorkout(e) {
//    e.preventDefault();
//    //Clear input fields
//    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
//      '';
//    //Display marker
//    const { lat, lng } = this.#mapEvent.latlng;
//    L.marker([lat, lng])
//      .addTo(this.#map)
//      .bindPopup(
//        L.popup({
//          maxWidth: 250,
//          minWidth: 100,
//          autoClose: false,
//          closeOnClick: false,
//          className: 'running-popup',
//        })
//      )
//      .setPopupContent('Workout')
//      .openPopup();
//  }
//}
//const app = new App();

// ******************************* 2 ************************************//
//class Workout {
//  date = new Date();
//  id = (Date.now() + '').slice(-10);

//  constructor(coords, distance, duration) {
//    this.coords = coords;
//    this.distance = distance;
//    this.duration = duration;
//  }
//}

//class Running extends Workout {
//  constructor(coords, distance, duration, cadence) {
//    super(coords, distance, duration);
//    this.cadence = cadence;

//    this.calcPace();
//  }

//  calcPace() {
//    this.pace = this.duration / this.distance;
//    return this.pace;
//  }
//}

//class Cycling extends Workout {
//  constructor(coords, distance, duration, elevationGain) {
//    super(coords, distance, duration);
//    this.elevationGain = elevationGain;

//    this.calcSpeed();
//  }

//  calcSpeed() {
//    this.speed = this.distance / (this.duration / 60);
//    return this.speed;
//  }
//}

//const r1 = new Running([32, 34], 4, 144, 55);
//const c1 = new Cycling([21, 21], 1, 111, 22);
//console.log(r1);
//console.log(c1);

//// APPLICATION ARCHITECTURE
//class App {
//  #map;
//  #mapEvent;

//  constructor() {
//    this._getPosition();
//    form.addEventListener('submit', this._newWorkout.bind(this));
//    inputType.addEventListener('change', this._toggleElevation);
//  }

//  _loadMap(location) {
//    const { latitude } = location.coords;
//    const { longitude } = location.coords;
//    const coords = [latitude, longitude];

//    this.#map = L.map('map').setView(coords, 13);

//    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//      attribution:
//        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//    }).addTo(this.#map);

//    this.#map.on('click', this._showForm.bind(this));
//  }

//  _getPosition() {
//    if (navigator.geolocation)
//      navigator.geolocation.getCurrentPosition(
//        this._loadMap.bind(this),
//        function () {
//          alert('Position is not available!!!');
//        }
//      );
//  }

//  _showForm(mapEv) {
//    this.#mapEvent = mapEv;
//    form.classList.remove('hidden');
//    inputDistance.focus();
//  }

//  _toggleElevation() {
//    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//  }

//  _newWorkout(e) {
//    e.preventDefault();
//    //Clear fields
//    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
//      '';

//    //Display marker
//    const { lat, lng } = this.#mapEvent.latlng;
//    L.marker([lat, lng])
//      .addTo(this.#map)
//      .bindPopup(
//        L.popup({
//          maxWidth: 250,
//          minWidth: 100,
//          autoClose: false,
//          closeOnClick: false,
//          className: 'running-popup',
//        })
//      )
//      .setPopupContent('Workout')
//      .openPopup();
//  }
//}
//const app = new App();

// ******************************* 3 ************************************//
//class Workout {
//  date = new Date();
//  id = (Date.now() + '').slice(-10);

//  constructor(coords, distance, duration) {
//    this.coords = coords;
//    this.distance = distance;
//    this.duration = duration;
//  }
//}

//class Running extends Workout {
//  constructor(coords, distance, duration, cadence) {
//    super(coords, distance, duration);
//    this.cadence = cadence;

//    this.calcPace();
//  }

//  calcPace() {
//    this.pace = this.duration / this.distance;
//    return this.pace;
//  }
//}

//class Cycling extends Workout {
//  constructor(coords, distance, duration, elevationGain) {
//    super(coords, distance, duration);
//    this.elevationGain = elevationGain;

//    this.calcSpeed();
//  }

//  calcSpeed() {
//    this.speed = this.distance / (this.duration / 60);
//    return this.speed;
//  }
//}

//const r1 = new Running([43, 45], 2, 222, 22);
//const c1 = new Cycling([66, 11], 1, 55, 99);
//console.log(r1);
//console.log(c1);

////APPLICATION ARCHITECTURE
//class App {
//  #map;
//  #mapEvent;

//  constructor() {
//    this._getPosition();
//    form.addEventListener('submit', this._newWorkout.bind(this));
//    inputType.addEventListener('change', this._toggleElevation);
//  }

//  _getPosition() {
//    if (navigator.geolocation)
//      navigator.geolocation.getCurrentPosition(
//        this._loadMap.bind(this),
//        function () {
//          alert('Position not available!!!');
//        }
//      );
//  }

//  _loadMap(loc) {
//    const { latitude } = loc.coords;
//    const { longitude } = loc.coords;
//    //console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//    const coords = [latitude, longitude];
//    this.#map = L.map('map').setView(coords, 13);

//    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//      attribution:
//        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//    }).addTo(this.#map);

//    this.#map.on('click', this._showForm.bind(this));
//  }

//  _showForm(mapEv) {
//    this.#mapEvent = mapEv;
//    form.classList.remove('hidden');
//    inputDistance.focus();
//  }

//  _toggleElevation() {
//    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//  }

//  _newWorkout(e) {
//    e.preventDefault();
//    //Clear input fields
//    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
//      '';

//    //Display marker
//    const { lat, lng } = this.#mapEvent.latlng;
//    L.marker([lat, lng])
//      .addTo(this.#map)
//      .bindPopup(
//        L.popup({
//          maxWidth: 250,
//          minWidth: 100,
//          autoClose: false,
//          closeOnClick: false,
//          className: 'running-popup',
//        })
//      )
//      .setPopupContent('Workout')
//      .openPopup();
//  }
//}
//const app = new App();
