import { GET_ROUTE_SUCCESS, CLEAR_ROUTE, SELECTED_MODE, GET_ROUTE_FAILURE } from '../actions/const'
const initialState = {
  pointLocations: [],
  routeInfo: [],
  directionMode: 'driving',
  routeError: null
}

export default function routeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROUTE_SUCCESS:
      let clonePointLocations = Object.assign([], state.pointLocations, action.pointLocations);
      let cloneRouteInfo = Object.assign([], state.routeInfo, action.routeInfo);
      return {
        ...state,
        pointLocations: clonePointLocations,
        routeInfo: cloneRouteInfo,
        routeError: null
      }
    case GET_ROUTE_FAILURE:
      return {
        ...state,
        routeError: action.error
      }
    case CLEAR_ROUTE:
      return {
        ...state,
        pointLocations: [],
        routeInfo: [],
        directionMode: 'driving',
        routeError: null
      }
    case SELECTED_MODE:
      return {
        ...state,
        directionMode: action.directionMode
      }
    default:
      return state
  }
}