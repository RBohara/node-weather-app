const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmFodWxib2hhcmEiLCJhIjoiY2tqczluODVwMXpjdzJ6bGUzOXpudmczayJ9.PmfjRw503qlsdlwbtgDP2g&limit=1";

  request({ url }, (error, response) => {
    const data = JSON.parse(response.body);
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (data.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: data.features[0].center[0],
        longitude: data.features[0].center[1],
        location: data.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
