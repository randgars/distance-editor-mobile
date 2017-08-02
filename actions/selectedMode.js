import { SELECTED_MODE } from './const'

export default function selectedMode(mode) {
	return {
    type: SELECTED_MODE,
    directionMode: mode
  } 
}