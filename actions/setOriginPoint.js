import { SET_ORIGIN_POINT } from './const'

export default function setOriginPoint(originPoint) {
	return {
    type: SET_ORIGIN_POINT,
    originPoint: originPoint
  } 
}