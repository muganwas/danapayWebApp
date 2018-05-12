import { DEFINE_AMOUNT } from '../actions/amount-action'

export default function destinationReducer(state = [], action) {
    switch (action.type) {
        case DEFINE_AMOUNT : 
            return action.payload
        default :
            return state
    }
}