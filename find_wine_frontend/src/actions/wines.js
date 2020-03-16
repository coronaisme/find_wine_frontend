//action creator fn with dispatch

//async thunk action (returns a function) -> allows thunk to know that it 
//can wait for async to finish before dispatching

import { SET_ALL_WINES, SET_CURRENT_WINE_ID } from './types';
import { getWines } from '../api/api.js';



//all wines
export function setAllWines() {
  return function(dispatch) {
      getWines().then(data => {
        dispatch({
      type: SET_ALL_WINES, 
      payload: data.wines
    })
  })
  }
}

//getting a specific wine
export function setCurrentWineId(wine_id) {
  return {
    type: SET_CURRENT_WINE_ID,
    payload: wine_id
  }
}