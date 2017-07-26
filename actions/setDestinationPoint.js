import { SET_DESTINATION_POINT } from './const'

function setDestinationPoint(destinationPoint) {
	return {
    type: SET_DESTINATION_POINT,
    destinationPoint: destinationPoint
  } 
}

module.exports = setDestinationPoint;