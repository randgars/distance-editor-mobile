import { SET_ORIGIN_POINT, SET_DESTINATION_POINT } from '../actions/const'
const initialState = {
  originPoint: null,
  destinationPoint: null
}

export default function waypointsReducer (state = initialState, action) {
  switch (action.type) {
    case SET_ORIGIN_POINT:
      return {
        ...state,
        originPoint: action.originPoint
      }
    case SET_DESTINATION_POINT:
      return {
        ...state,
        destinationPoint: action.destinationPoint
      }
    
    default:
      return state
  }
}