import { GET_ROUTE } from './const'

function getRoute() {
	let waypoint = {
		address: address,
		location: location
	}
	return {
    type: GET_ROUTE,
		waypoint: waypoint
  } 
}

module.exports = getRoute;