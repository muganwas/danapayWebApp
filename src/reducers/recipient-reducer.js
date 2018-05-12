import { DEFINE_RECIPIENT } from '../actions/recipient-action'

export default function recipientReducer(state = [], action) {
    switch (action.type) {
        case DEFINE_RECIPIENT : 
            return action.payload
        default :
            return state
    }
}