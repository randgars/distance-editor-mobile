import { SET_WAYPOINT } from './const'

function setWaypoint(address, location) {
	let waypoint = {
		address: address,
		location: location
	}
	return {
    type: SET_WAYPOINT,
		waypoint: waypoint
  } 
}

module.exports = setWaypoint;