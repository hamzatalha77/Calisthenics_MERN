import thunk from 'redux-thunk'
import {
  exerciseCreateReducers,
  exerciseListReducers
} from './reducers/exerciseReducers'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  exerciseCreate: exerciseCreateReducers,
  exerciseList: exerciseListReducers
})
const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
