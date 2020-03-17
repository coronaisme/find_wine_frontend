import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';
// rootReducer comes from combineReducers in root
import { composeWithDevTools } from 'redux-devtools-extension';
import wines from './reducers/wines'

const store = createStore(wines, composeWithDevTools(applyMiddleware(thunk)))

export default store