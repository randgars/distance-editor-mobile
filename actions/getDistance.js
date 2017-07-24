import { GET_DISTANCE } from './const'

function getDistance(waypoints) {
  let locations;
  for (let i = 0; i < waypoints.length; i++) {
    locations.push(waypoints[i].location.lat);
    locations.push(waypoints[i].location.lng);
  }
 
  fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y`)
  .then(function (response) {
    return response.json()
  })
  .then(function (responseJson) {
    debugger
    console.log(responseJson)
  })
  .catch(function (error) {
    console.log(error)
  })
	return {
    type: GET_DISTANCE,
    waypoint: waypoint
  } 
}

module.exports = getDistance;