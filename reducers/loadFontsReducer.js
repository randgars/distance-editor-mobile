import { LOAD_FONTS } from '../actions/const'
const initialState = {
  fontsStatus: false
}

export default function loadFontsReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_FONTS:
      return {
        ...state,
        fontsStatus: true
      }
    
    default:
      return state
  }
}