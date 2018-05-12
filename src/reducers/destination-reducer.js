import { DEFINE_DESTINATION } from '../actions/destination-action'

export default function destinationReducer(state = [], action) {
    switch (action.type) {
        case DEFINE_DESTINATION : 
            return action.payload
        default :
            return state
    }
}