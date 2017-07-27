import { GET_CURRENT_LOCATION_REQUEST, GET_CURRENT_LOCATION_SUCCESS, GET_CURRENT_LOCATION_FAILURE } from './const'

export default function getCurrentLocation() {
  return (dispatch) => {
    dispatch({ type: GET_CURRENT_LOCATION_REQUEST })
    fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y', { method: 'POST' }).then(
      response => {
        return response.json()
      },
      error => {
        return console.log(error)
      }
    )
    .then(
      responseJson => {
        let currentLocation = { latitude: responseJson.location.lat, longitude: responseJson.location.lng }
        dispatch({ type: GET_CURRENT_LOCATION_SUCCESS, currentLocation: currentLocation })
      },
      error => {
        dispatch({ type: GET_CURRENT_LOCATION_FAILURE })
      }
    )
    .catch(error => {
      console.log(error)
    })
  }
}