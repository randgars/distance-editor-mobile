import { GET_ROUTE_SUCCESS } from './const'

export default function getDistance(dispatch, waypoints) {
  let parentWaypoints = [];
  for (let i = 0; i < waypoints.length; i++) {
    let tempWaypoints = Object.assign([], waypoints);
    tempWaypoints.splice(i, 1);
    let origin = 'place_id:' + waypoints[i].placeID;
    let destination;
    let destinations = [];
    for (let j = 0; j < tempWaypoints.length; j++) {
      destination = 'place_id:' + tempWaypoints[j].placeID;
      destinations.push(destination);
    }
    let destinationsStr = destinations.join('|');
    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destinationsStr}&key=AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y`)
    .then(function (response) {
      return response.json()
    })
    .then(function (responseJson) {
      let childWaypoints = [];
      for (let i = 0; i < responseJson.destination_addresses.length; i++) {
        childWaypoints.push({
          pointAddress: responseJson.destination_addresses[i],
          distance: responseJson.rows[0].elements[i].distance.value
        })
      }
      let currentWaypoint = {
        pointAddress: responseJson.origin_addresses[0],
        childWaypoints: childWaypoints
      }
      parentWaypoints.push(currentWaypoint);
      if (parentWaypoints.length == waypoints.length) {
        dispatch(findMinDistation(dispatch, parentWaypoints));
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}

function findMinDistation(dispatch, parentWaypoints) {
  let i = 0;
  let finalyWaypointsArray = [parentWaypoints[i].pointAddress];
  while (parentWaypoints.length > 0) {
    if (parentWaypoints[i].childWaypoints.length == 0) {
      break;
    }
    let tempChildWaypoints = parentWaypoints[i].childWaypoints;
    tempChildWaypoints.sort((originPoint, destinationPoint) => (originPoint.distance - destinationPoint.distance));
    let nextWaypoint = tempChildWaypoints[0].pointAddress;
    finalyWaypointsArray.push(nextWaypoint);
    let previousWaypoint = parentWaypoints[i].pointAddress;
    parentWaypoints.splice(i, 1);
    for (let j = 0; j < parentWaypoints.length; j++) {
      for (let k = 0; k < parentWaypoints[j].childWaypoints.length; k++) {
        if (parentWaypoints[j].childWaypoints[k].pointAddress == previousWaypoint) {
          parentWaypoints[j].childWaypoints.splice(k, 1);
        }
      }
      if (parentWaypoints[j].pointAddress == nextWaypoint) {
        i = j;
      }
    }
  }
  dispatch(getRoute(dispatch, finalyWaypointsArray))
}

function getRoute(dispatch, finalyWaypointsArray) {
  let parts = [];
  for (let i = 0, max = 24; i < finalyWaypointsArray.length; i = i + max) {
    parts.push(finalyWaypointsArray.slice(i, i + max + 1));
  }
  for (let k = 0; k < parts.length; k++) {
    let waypoints = [];
    for (let j = 1, point = ''; j < parts[k].length - 1; j++) {
      point = parts[k][j].replace(/,\s/g, ',');
      point = point.replace(/\s/g, '+');
      waypoints.push(point);
    }
    waypoints = waypoints.join('|');
    let origin = parts[k][0].replace(/,\s/g, ',');
    origin = origin.replace(/\s/g, '+');
    let destination = parts[k][parts[k].length - 1].replace(/,\s/g, ',');
    destination = destination.replace(/\s/g, '+');
    fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y`)
    .then(function (response) {
      return response.json()
    })
    .then(function (responseJson) {
      let pointLocations = [];
      let legs = responseJson.routes[0].legs
      // for (let i = 0; i < legs.length; i++) {
      //   for (let j = 0; j < legs[i].steps.length; j++) {
      //     pointLocations.push({start: legs[i].steps[j].start_location, end: legs[i].steps[j].end_location})
      //   }
      // }
      for (let i = 0; i < legs.length; i++) {
        for (let j = 0; j < legs[i].steps.length; j++) {
          pointLocations.push(legs[i].steps[j].start_location)
          if ((legs.length - 1) == i && (legs[i].steps.length - 1) == j) {
            pointLocations.push(legs[i].steps[j].end_location)
          }
        }
      }
      dispatch({ type: GET_ROUTE_SUCCESS, pointLocations: pointLocations })
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}