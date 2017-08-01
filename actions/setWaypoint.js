import { SET_WAYPOINT } from './const'

export default function setWaypoint(keyValue, waypoint) {
	return {
    type: SET_WAYPOINT,
    keyValue: keyValue,
		waypoint: waypoint
  } 
}