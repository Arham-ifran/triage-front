import { SET_ACTIVE_KEY, SET_KYC_DATA, UNSET_KYC_DATA, UPDATE_KYC_DOC, BEFORE_KYC, GET_Personal_Doc } from '../../redux/types';

const initialState = {
    activeKey: 'first',
    kycData: {},
    kycDataAuth: false,
    updateAuth: false,
    personalDoc: {},
    personalDocAuth: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_KEY:
            return {
                ...state,
                activeKey: action.payload
            }
        case SET_KYC_DATA:
            return {
                ...state,
                kycData: action.payload,
                kycDataAuth: true
            }
        case UNSET_KYC_DATA:
            return {
                ...state,
                kycDataAuth: false
            }
        case UPDATE_KYC_DOC:
            return {
                ...state,
                updateAuth: true
            }
        case GET_Personal_Doc:
            return {
                ...state,
                personalDoc: action.payload,
                personalDocAuth: true
            }
        case BEFORE_KYC:
            return {
                ...state,
                updateAuth: false,
                personalDoc: {},
                personalDocAuth: false
            }
        default:
            return {
                ...state
            }
    }
}