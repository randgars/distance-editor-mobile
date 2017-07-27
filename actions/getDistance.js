import { FIND_MIN_DISTATION,
  GET_DISTANCE_REQUEST, GET_DISTANCE_SUCCESS, GET_DISTANCE_FAILURE,
  GET_ROUTE_REQUEST, GET_ROUTE_SUCCESS, GET_ROUTE_FAILURE
} from './const'
import polyline from '@mapbox/polyline'

export default function getDistance(originPoint, waypoints, destinationPoint) {
  return (dispatch) => {
    let parentWaypoints = [];
    if (!waypoints || waypoints.length == 0) {
      let origin = originPoint.address.replace(/,\s/g, ',');
      origin = origin.replace(/\s/g, '+');
      let destination = destinationPoint.address.replace(/,\s/g, ',');
      destination = destination.replace(/\s/g, '+');
      dispatch(getRoute(origin, destination))
      return;
    }
    for (let i = 0; i < waypoints.length; i++) {
      let tempWaypoints = Object.assign([], waypoints);
      tempWaypoints.splice(i, 1);
      let origin = 'place_id:' + waypoints[i].placeID;
      let destinationsStr;
      if (waypoints.length > 1) {
        let destination;
        let destinations = [];
        for (let j = 0; j < tempWaypoints.length; j++) {
          destination = 'place_id:' + tempWaypoints[j].placeID;
          destinations.push(destination);
        }
        destinationsStr = destinations.join('|');
      } else {
        destinationsStr = origin;
      }
      dispatch({ type: GET_DISTANCE_REQUEST })
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destinationsStr}&key=AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y`).then(
        response => {
          return response.json()
        },
        error => {
          return console.log(error)
        }
      )
      .then(
        responseJson => {
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
            dispatch({ type: GET_DISTANCE_SUCCESS, parentWaypoints: parentWaypoints })
            findMinDistation(dispatch, originPoint, parentWaypoints, destinationPoint)
          }
        },
        error => {
          dispatch({ type: GET_DISTANCE_FAILURE })
        }
      )
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}

function findMinDistation(dispatch, originPoint, parentWaypoints, destinationPoint) {
  let i = 0;
  let finalyWaypointsArray = [parentWaypoints[i].pointAddress];
  while (parentWaypoints.length > 0) {
    if (parentWaypoints[i].childWaypoints.length == 0) {
      break;
    }
    let tempChildWaypoints = parentWaypoints[i].childWaypoints;
    tempChildWaypoints.sort((firstPoint, secondPoint) => (firstPoint.distance - secondPoint.distance));
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
  finalyWaypointsArray.unshift(originPoint.address);
  if(destinationPoint) {
    finalyWaypointsArray.push(destinationPoint.address);
  }
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
    dispatch(getRoute(origin, destination, waypoints))
  }
}

function getRoute(origin, destination, waypoints) {
  return (dispatch) => {
    let waypointsChecked;
    dispatch({ type: GET_ROUTE_REQUEST })
    if (waypoints) {
      waypointsChecked = `&waypoints=${waypoints}`
    } else {
      waypointsChecked = ''
    }    
    fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}${waypointsChecked}&key=AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y`).then(
      response => {
        return response.json()
      },
      error => {
        return console.log(error)
      }
    )
    .then(
      responseJson => {
        let decodePolyline = polyline.decode(responseJson.routes[0].overview_polyline.points);
        let pointLocations = decodePolyline.map(point => ( {latitude: point[0], longitude: point[1]} ))
        dispatch({ type: GET_ROUTE_SUCCESS, pointLocations: pointLocations })
      },
      error => {
        dispatch({ type: GET_ROUTE_FAILURE })
      }
    )
    .catch(function (error) {
      console.log(error)
    })
  }
}