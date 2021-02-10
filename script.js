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
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];
      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    },
    function () {
      alert('Your current position is not available!');
    }
  );

// ******************************* 2 ************************************//
//if (navigator.geolocation)
//  navigator.geolocation.getCurrentPosition(
//    function (location) {
//      const { latitude } = location.coords;
//      const { longitude } = location.coords;

//      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//      const coords = [latitude, longitude];
//      const map = L.map('map').setView(coords, 13);

//      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//        attribution:
//          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//      }).addTo(map);
//      L.marker(coords)
//        .addTo(map)
//        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//        .openPopup();
//    },
//    function () {
//      alert('Position is not available!!!');
//    }
//  );

// ******************************* 3 ************************************//
//if (navigator.geolocation)
//  navigator.geolocation.getCurrentPosition(
//    function (loc) {
//      const { latitude } = loc.coords;
//      const { longitude } = loc.coords;
//      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//      const coords = [latitude, longitude];

//      const map = L.map('map').setView(coords, 13);

//      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//        attribution:
//          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//      }).addTo(map);

//      L.marker(coords)
//        .addTo(map)
//        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//        .openPopup();
//    },
//    function () {
//      alert('Position not available!!!');
//    }
//  );
