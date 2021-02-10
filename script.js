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

//let map, mapEvent;

// ***********************************************************************//
// Get Current Location
// ******************************* 1 ************************************//
//if (navigator.geolocation)
//  navigator.geolocation.getCurrentPosition(
//    function (position) {
//      const { latitude } = position.coords;
//      const { longitude } = position.coords;
//      const coords = [latitude, longitude];
//      map = L.map('map').setView(coords, 13);

//      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//        attribution:
//          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//      }).addTo(map);

//      //Handling clicks on map
//      map.on('click', function (mapEv) {
//        mapEvent = mapEv;
//        form.classList.remove('hidden');
//        inputDistance.focus();
//      });
//    },
//    function () {
//      alert('Your current position is not available!');
//    }
//  );

//form.addEventListener('submit', function (e) {
//  e.preventDefault();
//  //Clear input fields
//  inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
//    '';
//  //Display marker
//  console.log(mapEvent);
//  const { lat, lng } = mapEvent.latlng;
//  L.marker([lat, lng])
//    .addTo(map)
//    .bindPopup(
//      L.popup({
//        maxWidth: 250,
//        minWidth: 100,
//        autoClose: false,
//        closeOnClick: false,
//        className: 'running-popup',
//      })
//    )
//    .setPopupContent('Workout')
//    .openPopup();
//});

//inputType.addEventListener('change', function () {
//  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//});

// ******************************* 2 ************************************//
//let map, mapEvent;

//if (navigator.geolocation)
//  navigator.geolocation.getCurrentPosition(
//    function (location) {
//      const { latitude } = location.coords;
//      const { longitude } = location.coords;

//      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//      const coords = [latitude, longitude];
//      map = L.map('map').setView(coords, 13);

//      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//        attribution:
//          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//      }).addTo(map);

//      map.on('click', function (mapEv) {
//        mapEvent = mapEv;
//        form.classList.remove('hidden');
//        inputDistance.focus();
//      });
//    },
//    function () {
//      alert('Position is not available!!!');
//    }
//  );

//form.addEventListener('submit', function (e) {
//  e.preventDefault();

//  //Clear fields
//  inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
//    '';

//  //Display marker
//  console.log(mapEvent);
//  const { lat, lng } = mapEvent.latlng;
//  L.marker([lat, lng])
//    .addTo(map)
//    .bindPopup(
//      L.popup({
//        maxWidth: 250,
//        minWidth: 100,
//        autoClose: false,
//        closeOnClick: false,
//        className: 'running-popup',
//      })
//    )
//    .setPopupContent('Workout')
//    .openPopup();
//});

//inputType.addEventListener('change', function () {
//  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//});

// ******************************* 3 ************************************//
let map, mapEvent;

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (loc) {
      const { latitude } = loc.coords;
      const { longitude } = loc.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];
      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (mapEv) {
        mapEvent = mapEv;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    function () {
      alert('Position not available!!!');
    }
  );

form.addEventListener('submit', function (e) {
  e.preventDefault();

  //Clear input fields
  inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
    '';

  //Display marker
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});
