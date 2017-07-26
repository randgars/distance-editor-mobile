import { SET_ORIGIN_POINT } from './const'

function setOriginPoint(originPoint) {
	return {
    type: SET_ORIGIN_POINT,
    originPoint: originPoint
  } 
}

module.exports = setOriginPoint;