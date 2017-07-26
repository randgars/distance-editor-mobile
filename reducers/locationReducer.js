import { GET_CURRENT_LOCATION } from '../actions/const'
const initialState = {
  currentLocation: null
}

export default function waypointsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.currentLocation
      }
    
    default:
      return state
  }
}