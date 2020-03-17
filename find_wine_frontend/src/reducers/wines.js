//in charge of wine state
import { SET_ALL_WINES, SET_CURRENT_WINE } from '../actions/types'


const initialState = {
  wines: [],
  currentWine : null
}

export default function wines(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_WINES:
      return {
        ...state,
        wines:action.payload 
      }
    case SET_CURRENT_WINE:
      return {
        ...state,
        currentWine: action.payload
      }
    default: return state
  }
}