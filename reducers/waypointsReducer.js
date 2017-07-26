import { SET_WAYPOINT, GET_ROUTE_SUCCESS } from '../actions/const'
const initialState = {
  waypoints: [],
  pointLocations: null
}

export default function waypointsReducer (state = initialState, action) {
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
    
    default:
      return state
  }
}