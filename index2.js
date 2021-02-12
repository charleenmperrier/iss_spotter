const { nextISSTimesForMyLocation } = require('./iss_promised');


const logPassTimes = function(passTimes) {
  for (pass of passTimes) {
  const dateTime = new Date(0);
  dateTime.setUTCSeconds(pass.risetime);
  const duration = pass.duration;
  console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
.then((passTimes) => {
  logPassTimes(passTimes);
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});