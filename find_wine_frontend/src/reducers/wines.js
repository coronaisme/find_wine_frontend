//in charge of wine state
import { SET_ALL_WINES, SET_CURRENT_WINE, SET_SEARCH_WINES, SET_CART } from '../actions/types'


const initialState = {
  wines: [],
  currentWine : null,
  searchInput: "",
  cart:[]
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
    case SET_SEARCH_WINES: 
      return {
        ...state,
        searchInput: action.payload
      }
    case SET_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    default: return state
  }
}