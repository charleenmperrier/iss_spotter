const { nextISSTimesForMyLocation } = require('./iss');

const logPassTimes = function(passTimes) {
  for (pass of passTimes) {
  const dateTime = new Date(0);
  dateTime.setUTCSeconds(pass.risetime);
  const duration = pass.duration;
  console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("Thumbs Down: ", error);
  }
  // success, print out the deets!
  
  logPassTimes(passTimes);
});




