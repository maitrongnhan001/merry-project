import  { combineReducers } from 'redux'
import user from './user'


const root = combineReducers({
    user: user
})

export default root