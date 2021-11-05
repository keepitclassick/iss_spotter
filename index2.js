const request = require('request-promise-native');
const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index')

nextISSTimesForMyLocation()
.then((passTimes)=> {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log('No dice-', error.message)
});