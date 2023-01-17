import { BEFORE_HISTORY, LIST_HISTORY, CREATE_HISTORY } from '../../redux/types';

const initialState = {
    listHistory: {},
    listHistoryAuth: false,

    createHistoryAuth: false,
    history: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LIST_HISTORY:
            return {
                ...state,
                listHistory: action.payload,
                listHistoryAuth: true
            }
        case BEFORE_HISTORY:
            return {
                ...state,
                listHistory: {},
                listHistoryAuth: false
            }
        case CREATE_HISTORY:
            return { 
                ...state,
                history: action.payload.history,
                createHistoryAuth: true
            }
        default:
            return {
                ...state
            }
    }
}