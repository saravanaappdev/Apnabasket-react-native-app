import { ERROR, SUCCESS } from '../actions/eventTypes.js';
const initialState = {
    userData: '',
}

export default function async(state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return { ...state, error: action.payload }
        case SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        default:
            return { ...state }
    }
}