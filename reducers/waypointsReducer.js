import { SET_WAYPOINT, GET_ROUTE_SUCCESS, CLEAR_WAYPOINTS } from '../actions/const'
const initialState = {
  waypoints: [],
  pointLocations: null,
  parentWaypoints: null
}

export default function waypointsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WAYPOINT:
      return {
        ...state,
        waypoints: [ ...state.waypoints, action.waypoint ]
      }
    case GET_ROUTE_SUCCESS:
      return {
        ...state,
        pointLocations: action.pointLocations
      }
    case CLEAR_WAYPOINTS:
      return {
        ...state,
        waypoints: [],
        pointLocations: null
      }
    default:
      return state
  }
}