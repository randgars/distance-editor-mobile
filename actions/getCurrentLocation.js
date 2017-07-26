import { GET_CURRENT_LOCATION } from './const'

export default function getCurrentLocation(dispatch) {
  fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y', { method: 'POST' })
  .then(response => {
    return response.json()
  })
  .then(responseJson => {
    let currentLocation = { latitude: responseJson.location.lat, longitude: responseJson.location.lng }
    dispatch({ type: GET_CURRENT_LOCATION, currentLocation: currentLocation })
  })
  .catch(error => {
    console.log(error)
  })
}