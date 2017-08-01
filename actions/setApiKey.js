import { SET_API_KEY_REQUEST, SET_API_KEY_SUCCESS, SET_API_KEY_FAILURE } from './const'
import { AsyncStorage } from 'react-native'

export default function setApiKey(apiKey) {
  return (dispatch) => {
    dispatch({ type: SET_API_KEY_REQUEST })
    AsyncStorage.setItem('apiKey', `${apiKey}`).then(
      response => {
        dispatch({ type: SET_API_KEY_SUCCESS })
      },
      error => {
        dispatch({ type: SET_API_KEY_FAILURE })
      }
    )
    .catch(error => {
      return console.log(error)
    })
  }
}