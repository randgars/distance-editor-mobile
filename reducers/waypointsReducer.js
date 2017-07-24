import { SET_WAYPOINT } from '../actions/const'
const initialState = {
  waypoints: []
}

export default function waypointsReducer (state = initialState, action) {
  switch (action.type) {
    case SET_WAYPOINT:
      return {
        ...state,
        waypoints: [ ...state.waypoints, action.waypoint ]
      }
    
    default:
      return state
  }
}