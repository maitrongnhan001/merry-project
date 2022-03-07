import  { combineReducers } from 'redux'
import user from './user'
import taskbar from './taskbar'
import friends from './friends'
import groups from './groups'
import extension from './extension'
import message from './message'
import email from '../actions/email'
import notification from './notification'


const root = combineReducers({
    user: user,
    taskbar: taskbar,
    friends: friends,
    groups: groups,
    extension: extension,
    message: message,
    email: email,
    notification: notification
})

export default root