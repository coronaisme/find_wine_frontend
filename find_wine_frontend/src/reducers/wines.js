//in charge of wine state
import { SET_ALL_WINES, SET_CURRENT_WINE, SET_SEARCH_WINES, SET_CART, GET_CART, ADD_TO_QUANTITY } from '../actions/types'


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
    case ADD_TO_QUANTITY:     
      let updatedWine = action.payload
      let oldCart;

      if(updatedWine.quantity < 1) {
         oldCart = state.cart.filter(wine => wine.id !== updatedWine.id)
      } else { oldCart = state.cart.map(wine => {
            if(wine.id === updatedWine.id) {
              wine.quantity = updatedWine.quantity
            } 
            return wine
        }) 
      }
    
      let newCart = [...oldCart]
      localStorage.setItem('testCart', JSON.stringify(newCart))  
      return {
        ...state,
        cart: newCart
      }
      default: return state
  }
}

