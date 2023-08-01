import thunk from 'redux-thunk'
import {
  exerciseCreateReducers,
  exerciseDeleteReducers,
  exerciseDetailsReducers,
  exerciseListReducers,
  exerciseUpdateReducers
} from './reducers/exerciseReducers'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  exerciseCreate: exerciseCreateReducers,
  exerciseList: exerciseListReducers,
  exerciseUpdate: exerciseUpdateReducers,
  exerciseDetails: exerciseDetailsReducers,
  exerciseDelete: exerciseDeleteReducers
})
const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
