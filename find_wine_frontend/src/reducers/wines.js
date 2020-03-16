//in charge of wine state
import { SET_ALL_WINES, SET_CURRENT_WINE_ID } from '../actions/types'


const initialState = {
  wines: [],
  currentWineId : null
}

export default function wines(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_WINES:
      return {
        ...state,
        wines:action.payload
      }
    case SET_CURRENT_WINE_ID:
      return {
        ...state,
        currentWineId: action.payload
      }
    default: return state
  }
}