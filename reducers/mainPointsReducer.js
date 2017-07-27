import { SET_ORIGIN_POINT, SET_DESTINATION_POINT, CLEAR_MAIN_POINTS } from '../actions/const'
const initialState = {
  originPoint: null,
  destinationPoint: null
}

export default function mainPointsReducer(state = initialState, action) {
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
    case CLEAR_MAIN_POINTS:
      return {
        ...state,
        originPoint: null,
        destinationPoint: null
      }
    default:
      return state
  }
}