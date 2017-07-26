import { SET_WAYPOINT } from './const'

function setWaypoint(waypoint) {
	return {
    type: SET_WAYPOINT,
		waypoint: waypoint
  } 
}

module.exports = setWaypoint;