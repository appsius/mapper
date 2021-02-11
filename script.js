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
//  type = 'running';

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
//  type = 'cycling';

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

//// APPLICATION ARCHITECTURE
//class App {
//  #map;
//  #mapEvent;
//  #workouts = [];

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

//    const validNumber = (...inputs) =>
//      inputs.every(inp => Number.isFinite(inp));
//    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

//    //Get data from form
//    const type = inputType.value;
//    const distance = +inputDistance.value;
//    const duration = +inputDuration.value;
//    const { lat, lng } = this.#mapEvent.latlng;
//    let workout;

//    // If running object ...
//    if (type === 'running') {
//      const cadence = +inputCadence.value;
//      // Check if valid
//      if (
//        !validNumber(distance, duration, cadence) ||
//        !allPositive(distance, duration, cadence)
//      )
//        return alert('All inputs must be positive numbers!');
//      workout = new Running([lat, lng], distance, duration, cadence);
//    }

//    // If cycling object ...
//    if (type === 'cycling') {
//      const elevation = +inputElevation.value;
//      if (
//        !validNumber(distance, duration, elevation) ||
//        !allPositive(distance, duration)
//      )
//        return alert('All inputs must be numbers!');
//      workout = new Cycling([lat, lng], distance, duration, elevation);
//    }

//    // Push workout object into array
//    this.#workouts.push(workout);

//    //Hide form and clear input fields
//    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
//      '';
//    inputType.value = 'running';

//    // Inser workout object on map
//    this.renderWorkoutMarker(workout);
//  }

//  renderWorkoutMarker(workout) {
//    L.marker(workout.coords)
//      .addTo(this.#map)
//      .bindPopup(
//        L.popup({
//          maxWidth: 250,
//          minWidth: 100,
//          autoClose: false,
//          closeOnClick: false,
//          className: `${workout.type}-popup`,
//        })
//      )
//      .setPopupContent('Workout')
//      .openPopup();
//  }
//}
//const app = new App();

// NOTE -2 ******************************* 2 ************************************//
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
//  type = 'running';

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
//  type = 'cycling';

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

//// APPLICATION ARCHITECTURE
//class App {
//  #map;
//  #mapEvent;
//  #workouts = [];

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
//    //validation methods
//    const validNumber = (...inputs) =>
//      inputs.every(inp => Number.isFinite(inp));
//    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

//    //get data from form
//    const type = inputType.value;
//    const distance = +inputDistance.value;
//    const duration = +inputDuration.value;
//    const { lat, lng } = this.#mapEvent.latlng;
//    let workout;

//    //if running workout, validate and generate obj.
//    if (type === 'running') {
//      const cadence = +inputCadence.value;

//      if (
//        !validNumber(distance, duration, cadence) ||
//        !allPositive(distance, duration, cadence)
//      )
//        return alert('All inputs must be numbers!');

//      workout = new Running([lat, lng], distance, duration, cadence);
//    }

//    //if cycling workout, validate and generate obj.
//    if (type === 'cycling') {
//      const elevation = +inputElevation.value;

//      if (
//        !validNumber(distance, duration, elevation) ||
//        !allPositive(distance, duration)
//      )
//        return alert('All inputs must be numbers!');

//      workout = new Cycling([lat, lng], distance, duration, elevation);
//    }

//    //push workout into workouts array
//    this.#workouts.push(workout);

//    //hide form and clear inputs
//    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
//      '';
//    inputType.value = 'running';

//    //render workout marker
//    this.renderWorkoutMarker(workout);
//  }

//  renderWorkoutMarker(workout) {
//    L.marker(workout.coords)
//      .addTo(this.#map)
//      .bindPopup(
//        L.popup({
//          maxWidth: 250,
//          minWidth: 100,
//          autoClose: false,
//          closeOnClick: false,
//          className: `${workout.type}-popup`,
//        })
//      )
//      .setPopupContent('Workout')
//      .openPopup();
//  }
//}
//const app = new App();

// NOTE 3 ******************************* 3 ************************************//
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
//  type = 'running';

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
//  type = 'cycling';

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

////APPLICATION ARCHITECTURE
//class App {
//  #map;
//  #mapEvent;
//  #workouts = [];

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

//    //validation methods
//    const validNumber = (...inputs) =>
//      inputs.every(inp => Number.isFinite(inp));
//    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

//    //get data from form
//    const type = inputType.value;
//    const distance = +inputDistance.value;
//    const duration = +inputDuration.value;
//    const { lat, lng } = this.#mapEvent.latlng;
//    let workout;

//    //if running generate r. obj
//    if (type === 'running') {
//      const cadence = +inputCadence.value;
//      if (
//        !validNumber(distance, duration, cadence) ||
//        !allPositive(distance, duration, cadence)
//      )
//        return alert('All input values must be number!');
//      workout = new Running([lat, lng], distance, duration, cadence);
//    }

//    //if cycling generate c. obj
//    if (type === 'cycling') {
//      const elevation = +inputElevation.value;
//      if (
//        !validNumber(distance, duration, elevation) ||
//        !allPositive(distance, duration)
//      )
//        return alert('All input values must be numbers!');
//      workout = new Cycling([lat, lng], distance, duration, elevation);
//    }

//    //push into array
//    this.#workouts.push(workout);

//    //hide form and clear input fields
//    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
//      '';
//    inputType.value = 'running';

//    //render workout marker
//    this.renderWorkoutMarker(workout);
//  }

//  renderWorkoutMarker(workout) {
//    L.marker(workout.coords)
//      .addTo(this.#map)
//      .bindPopup(
//        L.popup({
//          maxWidth: 250,
//          minWidth: 100,
//          autoClose: false,
//          closeOnClick: false,
//          className: `${workout.type}-popup`,
//        })
//      )
//      .setPopupContent('Workout')
//      .openPopup();
//  }
//}
//const app = new App();
