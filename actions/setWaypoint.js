import { SET_WAYPOINT } from './const'

export default function setWaypoint(waypoint) {
	return {
    type: SET_WAYPOINT,
		waypoint: waypoint
  } 
}