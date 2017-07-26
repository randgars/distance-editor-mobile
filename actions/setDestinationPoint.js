import { SET_DESTINATION_POINT } from './const'

export default function setDestinationPoint(destinationPoint) {
	return {
    type: SET_DESTINATION_POINT,
    destinationPoint: destinationPoint
  } 
}