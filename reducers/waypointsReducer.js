import { SET_WAYPOINT, CLEAR_WAYPOINTS, ADD_WAYPOINT_INPUT, DELETE_WAYPOINT_INPUT } from '../actions/const'
const initialState = {
  waypoints: [],
  parentWaypoints: null,
  waypointInputs: []
}

export default function waypointsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WAYPOINT:
      let cloneWaypoints = Object.assign([], state.waypoints)
      for (let i = 0; i < cloneWaypoints.length; i++) {
        if (cloneWaypoints[i].keyValue == action.keyValue) {
          cloneWaypoints[i].waypoint = action.waypoint
          return {
            ...state,
            waypoints: cloneWaypoints
          }
        }
      }
      cloneWaypoints.push({ waypoint: action.waypoint, keyValue: action.keyValue })
      return {
        ...state,
        waypoints: cloneWaypoints
      }
    case CLEAR_WAYPOINTS:
      return {
        ...state,
        waypoints: [],
        waypointInputs: []
      }
    case ADD_WAYPOINT_INPUT:
      return {
        ...state,
        waypointInputs: [ ...state.waypointInputs, action.item ]
      }
    case DELETE_WAYPOINT_INPUT:
      let tempWaypointInputs = Object.assign([], state.waypointInputs)
      let tempWaypoints = Object.assign([], state.waypoints)
      for (let i = 0; i < tempWaypointInputs.length; i++) {
        if (+tempWaypointInputs[i] == action.keyValue) {
          tempWaypointInputs.splice(i, 1);
          tempWaypoints.splice(i, 1)
        }
      }
      return {
        ...state,
        waypoints: tempWaypoints,
        waypointInputs: tempWaypointInputs
      }
    default:
      return state
  }
}