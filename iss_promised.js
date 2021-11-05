const request = require('request-promise-native');
const { printPassTimes } = require('./index');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};


const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request('https://api.freegeoip.app/json/?apikey=9dfd4fa0-3dcf-11ec-ba1c-ab8e3e673e36');
};

const fetchISSFlyOverTimes = function(body){
  const { latitude, longitude } = JSON.parse(body);
  const url =`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  return request(url);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const  { response } = JSON.parse(data);
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation };
