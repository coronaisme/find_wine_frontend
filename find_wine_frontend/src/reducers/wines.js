import { SET_ALL_WINES } from '../actions/types'


const initialState = {
  wines: []
}

export default function wines(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_WINES:
      return {
        ...state,
        wines:action.payload
      }
    default: return state
  }
}