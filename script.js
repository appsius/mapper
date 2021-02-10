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
//navigator.geolocation.getCurrentPosition(
//  function (position) {
//    const { latitude } = position.coords;
//    const { longitude } = position.coords;
//    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
//  },
//  function () {
//    alert('Your current position is not available!');
//  }
//);

// ******************************* 2 ************************************//
//navigator.geolocation.getCurrentPosition(
//  function (location) {
//    const { latitude } = location.coords;
//    const { longitude } = location.coords;
//    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
//  },
//  function () {
//    alert('Position is not available!!!');
//  }
//);

// ******************************* 3 ************************************//
navigator.geolocation.getCurrentPosition(
  function (loc) {
    const { latitude } = loc.coords;
    const { longitude } = loc.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
  },
  function () {
    alert('Position not available!!!');
  }
);
