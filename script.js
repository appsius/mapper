'use strict';

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
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
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
    return this.pace;
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
    this.speed = this.distance / (this.duration / 60); // --> km / (m/60 = h)
    return this.speed;
  }
}

// APPLICATION ARCHITECTURE
class App {
  #map;
  #mapEvent;
  #zoomLevel = 13;
  #workouts = [];

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevation);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#zoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Your current position is not available!');
        }
      );
  }

  _showForm(mapEv) {
    this.#mapEvent = mapEv;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    //clear inputs and set to initial value
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
      '';
    inputType.value = 'running';
    form.style.display = 'none';
    form.classList.add('hidden');
    form.style.display = 'grid';
  }

  _toggleElevation() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    const validNumber = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    //Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If running object ...
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if valid
      if (
        !validNumber(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('All inputs must be positive numbers!');
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If cycling object ...
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validNumber(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('All inputs must be numbers!');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Push workout object into array
    this.#workouts.push(workout);

    //Hide form and clear input fields
    this._hideForm();

    //render workout in the list
    this._renderWorkout(workout);

    // Inser workout object on map
    this._renderWorkoutMarker(workout);
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
	   <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
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
				<span class="workout__value">${workout.pace.toFixed(1)}</span>
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
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;

    const workout = this.#workouts.find(w => w.id === workoutEl.dataset.id);
    this.#map.setView(workout.coords, this.#zoomLevel, {
      animation: true,
      pan: {
        duration: 1,
      },
    });
  }
}
const app = new App();

// NOTE -2 ******************************* 2 ************************************//
//class Workout {
//  date = new Date();
//  id = (Date.now() + '').slice(-10);

//  constructor(coords, distance, duration) {
//    this.coords = coords;
//    this.distance = distance;
//    this.duration = duration;
//  }

//  _setDesc() {
//    // prettier-ignore
//    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
//      months[this.date.getMonth()]
//    } ${this.date.getDate()}`;
//  }
//}

//class Running extends Workout {
//  type = 'running';

//  constructor(coords, distance, duration, cadence) {
//    super(coords, distance, duration);
//    this.cadence = cadence;

//    this.calcPace();
//    this._setDesc();
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
//    this._setDesc();
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
//  #zoomLevel = 13;
//  #workouts = [];

//  constructor() {
//    this._getPosition();
//    form.addEventListener('submit', this._newWorkout.bind(this));
//    inputType.addEventListener('change', this._toggleElevation);
//    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
//  }

//  _loadMap(location) {
//    const { latitude } = location.coords;
//    const { longitude } = location.coords;
//    const coords = [latitude, longitude];

//    this.#map = L.map('map').setView(coords, this.#zoomLevel);

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

//  _hideForm() {
//    //clear input fields
//    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
//      '';
//    inputType.value = 'running';
//    form.style.display = 'none';
//    form.classList.add('hidden');
//    form.style.display = 'grid';
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
//    this._hideForm();

//    //render workout marker
//    this._renderWorkoutMarker(workout);

//    //render workout on list
//    this._renderWorkout(workout);
//  }

//  _renderWorkoutMarker(workout) {
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
//      .setPopupContent(
//        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
//      )
//      .openPopup();
//  }

//  _renderWorkout(workout) {
//    let html = `
//		<li class="workout workout--${workout.type}" data-id=${workout.id}>
//          <h2 class="workout__title">${workout.description}</h2>
//          <div class="workout__details">
//            <span class="workout__icon">${
//              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
//            }</span>
//            <span class="workout__value">${workout.distance}</span>
//            <span class="workout__unit">km</span>
//          </div>
//		  <div class="workout__details">
//            <span class="workout__icon">⏱</span>
//            <span class="workout__value">${workout.duration}</span>
//            <span class="workout__unit">min</span>
//          </div>`;

//    if (workout.type === 'running')
//      html += `
//	  	  <div class="workout__details">
//            <span class="workout__icon">⚡️</span>
//            <span class="workout__value">${workout.pace.toFixed(1)}</span>
//            <span class="workout__unit">min/km</span>
//          </div>
//          <div class="workout__details">
//            <span class="workout__icon">🦶🏼</span>
//            <span class="workout__value">${workout.cadence}</span>
//            <span class="workout__unit">spm</span>
//          </div>
//        </li>`;

//    if (workout.type === 'cycling')
//      html += `<div class="workout__details">
//            <span class="workout__icon">⚡️</span>
//            <span class="workout__value">${workout.speed.toFixed(1)}</span>
//            <span class="workout__unit">km/h</span>
//          </div>
//          <div class="workout__details">
//            <span class="workout__icon">⛰</span>
//            <span class="workout__value">${workout.elevationGain}</span>
//            <span class="workout__unit">m</span>
//          </div>
//        </li>`;

//    form.insertAdjacentHTML('afterend', html);
//  }

//  _moveToPopup(e) {
//    const workEl = e.target.closest('.workout');
//    if (!workEl) return;

//    const workout = this.#workouts.find(w => w.id === workEl.dataset.id);
//    this.#map.setView(workout.coords, this.#zoomLevel, {
//      animation: true,
//      pan: {
//        duration: 1.2,
//      },
//    });
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

//  _setDesc() {
//    // prettier-ignore
//    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//    this.desc = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
//      months[this.date.getMonth()]
//    } ${this.date.getDate()}`;
//  }
//}

//class Running extends Workout {
//  type = 'running';

//  constructor(coords, distance, duration, cadence) {
//    super(coords, distance, duration);
//    this.cadence = cadence;

//    this.calcPace();
//    this._setDesc();
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
//    this._setDesc();
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
//  #zoomLevel = 13;
//  #workouts = [];

//  constructor() {
//    this._getPosition();
//    form.addEventListener('submit', this._newWorkout.bind(this));
//    inputType.addEventListener('change', this._toggleElevation);
//    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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
//    this.#map = L.map('map').setView(coords, this.#zoomLevel);

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

//  _hideForm() {
//    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
//      '';
//    inputType.value = 'running';
//    form.style.display = 'none';
//    form.classList.add('hidden');
//    form.style.display = 'grid';
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
//    this._hideForm();

//    //render workout on list
//    this._renderWorkout(workout);

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
//      .setPopupContent(
//        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.desc}`
//      )
//      .openPopup();
//  }

//  _renderWorkout(workout) {
//    let html = `
//	  	<li class="workout workout--${workout.type}" data-id="${workout.id}">
//          <h2 class="workout__title">${workout.desc}</h2>
//          <div class="workout__details">
//            <span class="workout__icon">${
//              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
//            }</span>
//            <span class="workout__value">${workout.distance}</span>
//            <span class="workout__unit">km</span>
//          </div>
//          <div class="workout__details">
//            <span class="workout__icon">⏱</span>
//            <span class="workout__value">${workout.duration}</span>
//            <span class="workout__unit">min</span>
//          </div>
//	  `;

//    if (workout.type === 'running')
//      html += `
//		  <div class="workout__details">
//            <span class="workout__icon">⚡️</span>
//            <span class="workout__value">${workout.pace.toFixed(1)}</span>
//            <span class="workout__unit">min/km</span>
//          </div>
//          <div class="workout__details">
//            <span class="workout__icon">🦶🏼</span>
//            <span class="workout__value">${workout.cadence}</span>
//            <span class="workout__unit">spm</span>
//          </div>
//        </li>
//	  `;

//    if (workout.type === 'cycling')
//      html += `
//	  	  <div class="workout__details">
//            <span class="workout__icon">⚡️</span>
//            <span class="workout__value">${workout.speed.toFixed(1)}</span>
//            <span class="workout__unit">km/h</span>
//          </div>
//          <div class="workout__details">
//            <span class="workout__icon">⛰</span>
//            <span class="workout__value">${workout.elevationGain}</span>
//            <span class="workout__unit">m</span>
//          </div>
//        </li>`;

//    form.insertAdjacentHTML('afterend', html);
//  }

//  _moveToPopup(e) {
//    const workEl = e.target.closest('.workout');
//    if (!workEl) return;

//    const workout = this.#workouts.find(w => w.id === workEl.dataset.id);

//    this.#map.setView(workout.coords, this.#zoomLevel, {
//      animation: true,
//      pan: {
//        duration: 1,
//      },
//    });
//  }
//}
//const app = new App();
