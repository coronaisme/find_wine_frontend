//in charge of wine state
import { SET_ALL_WINES, SET_CURRENT_WINE, SET_SEARCH_WINES, SET_CART, GET_CART } from '../actions/types'


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
      let testCart = [...state.cart, action.payload]
      localStorage.setItem('testCart', JSON.stringify(testCart));
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    case GET_CART:
      let cart;
        if(localStorage.getItem('testCart')){
          let nonParsed = localStorage.getItem('testCart')
          cart = JSON.parse(nonParsed)
        } else {
          cart = []
        }
      return {
        ...state,
        cart: cart
      }
      default: return state
  }
}

