import { DELETE_WAYPOINT_INPUT } from './const'

export default function deleteWaypointInput(keyValue, point) {
	return {
    type: DELETE_WAYPOINT_INPUT,
    keyValue: keyValue,
    point: point
  } 
}