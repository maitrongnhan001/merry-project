import {createStore} from 'redux'
import root from './reducers/index'

const store = createStore(root)

export default store