import { GET_API_KEY_REQUEST, GET_API_KEY_SUCCESS, GET_API_KEY_FAILURE } from './const'
import { AsyncStorage } from 'react-native'

export default function getApiKey() {
  return (dispatch) => {
    dispatch({ type: GET_API_KEY_REQUEST })
    AsyncStorage.getItem('apiKey').then(
      response => {
        let apiKey;
        if (response && response.length > 0) {
          apiKey = response;
        } else {
          apiKey = 'AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y'
        }
        dispatch({ type: GET_API_KEY_SUCCESS, apiKey: apiKey })
      },
      error => {
        dispatch({ type: GET_API_KEY_FAILURE })
      }
    )
    .catch(error => {
      return console.log(error)
    })
  }
}