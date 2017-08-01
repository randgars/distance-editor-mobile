import { ADD_WAYPOINT_INPUT } from './const'

export default function addWaypointInput(item) {
	return {
    type: ADD_WAYPOINT_INPUT,
    item: item
  } 
}