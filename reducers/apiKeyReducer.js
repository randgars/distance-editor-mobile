import { GET_API_KEY_SUCCESS, SET_API_KEY_SUCCESS } from '../actions/const'

const initialState = {
  apiKey: 'AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y',
  isChangedKey: false
}

export default function apiKeyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_API_KEY_SUCCESS:
      return {
        ...state,
        apiKey: action.apiKey
      }
    case SET_API_KEY_SUCCESS:
      return {
        ...state,
        isChangedKey: true
      }
    
    default:
      return state
  }
}