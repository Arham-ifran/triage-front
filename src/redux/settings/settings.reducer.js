import { GET_SETTINGS, BEFORE_SETTINGS, GET_ERRORS,GET_BANK_DETAILS } from '../../redux/types';

const initialState = {
    settings: null,
    settingsAuth: false,
    getBankDetailsAuth: false

}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SETTINGS:
            return {
                ...state,
                settings: action.payload,
                settingsAuth: true
            }
            case GET_BANK_DETAILS: 
            return {
                ...state,
                bankDetailsList: action.payload,
                getBankDetailsAuth: true
            }
        case BEFORE_SETTINGS:
            return {
                ...state,
                settings: null,
                settingsAuth: false,
                getBankDetailsAuth: false
            }
        default:
            return {
                ...state
            }
    }
}