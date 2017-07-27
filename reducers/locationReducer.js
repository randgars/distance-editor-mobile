import { GET_CURRENT_LOCATION_SUCCESS } from '../actions/const'
const initialState = {
  currentLocation: null
}

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_LOCATION_SUCCESS:
      return {
        ...state,
        currentLocation: action.currentLocation
      }
    
    default:
      return state
  }
}