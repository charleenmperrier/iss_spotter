const request = require('request');

const fetchMyIP = function(callback) {
  const URL = 'https://api.ipify.org?format=json';
 
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const ip = JSON.parse(body).ip;

    callback(null, ip);

  });

};


const fetchCoordsByIP = function(ip, callback) {
  const URL = `https://freegeoip.app/json/${ip}`;

  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const lat = JSON.parse(body).latitude;
    const long = JSON.parse(body).longitude;
    const obj = {
      latitude: lat,
      longitude: long
    };
    callback(null, obj);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {

  const URL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const result = JSON.parse(body).response;
    callback(null, result);
  });
};



const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, latLon) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(latLon, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
  
};
module.exports = { nextISSTimesForMyLocation };