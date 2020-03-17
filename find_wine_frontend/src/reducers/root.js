import { combineReducers } from 'redux';
import wines from "./wines.js"
import currentWine from './wines.js'



export default combineReducers({
  wines:wines,
  currentWine:currentWine
})