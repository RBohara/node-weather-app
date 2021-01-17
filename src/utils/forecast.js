const request = require("request");

const forecast = (location, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6c019565d2754023c24d76a050a2be98&query=" +
    location;

  request({ url }, (error, response) => {
    const data = JSON.parse(response.body);
    if (error) {
      callback("Unable to connect to the internet", undefined);
    } else if (data.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        temp: data.current.temperature,
        precip: data.current.precip,
      });
    }
  });
};

module.exports = forecast;
