import { SET_WAYPOINT } from './const'

function setWaypoint(address, location, id) {
	let waypoint = {
		address: address,
		location: location,
		placeID: id
	}
	return {
    type: SET_WAYPOINT,
		waypoint: waypoint
  } 
}

module.exports = setWaypoint;