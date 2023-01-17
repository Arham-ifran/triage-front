import { BEFORE_WALLET, GET_WALLETS, GET_SYMBOLS, PAYMENT_STATUS,CREATE_WIRE_REQUEST,DELETE_WIRE_REQUEST,UPLOAD_RECEIPT,ADD_WITHDRAW_REQUEST,UPDATE_WITHDRAW_STATUS } from '../types';

const initialState = {
    wallets: null,
    getWalletsAuth: false,
    symbols: null,
    getSymbolsAuth: false,
    message: null,
    paymentStatus: null,
    currencyCaps: null,
    createRequestAuth: false,
    deleteWireRequest: false,
    receiptUploadAuth: false,
    addWithdrawRequest: false,
    withdrawStatusAuth: false


}

export default function (state = initialState, action) {
    switch (action.type) {
        
        case BEFORE_WALLET: 
            return {
                wallets: null,
                getWalletsAuth: false,
                createRequestAuth: false,
                deleteWireRequest: false,
                receiptUploadAuth: false,
                addWithdrawRequest: false,
                withdrawStatusAuth: false,
                message: null,
            }
        case GET_WALLETS: 
            return {
                ...state,
                getWalletsAuth: true,
                wallets: action.payload.wallets,
                currencyCaps: action.payload.currencyCaps,
                wireRequests: action.payload.wireRequests,
                timePeriod: action.payload.timePeriod,
                bronzeMinInvestment: action.payload.bronzeMinInvestment
            }
        case CREATE_WIRE_REQUEST: 
        return {
            ...state,
            createRequestAuth: true
        }
        case ADD_WITHDRAW_REQUEST: 
        return {
            ...state,
            addWithdrawRequest: true
        }
        case UPDATE_WITHDRAW_STATUS: 
        return {
            ...state,
            withdrawStatusAuth: true,
            withdrawStatus: action.payload
        }
        case DELETE_WIRE_REQUEST:
            return {
                ...state,
                deleteWireRequest: true
            } 
        case UPLOAD_RECEIPT: 
        return {
            ...state,
            receiptUploadAuth: true
        }
        case GET_SYMBOLS:
            return {
                ...state,
                symbols: action.payload.symbols,
                getSymbolsAuth: true
            }
        case PAYMENT_STATUS: 
            return { 
                ...state,
                paymentStatus: action.payload.paymentStatus
            }
        default:
            return {
                ...state
            }
    }
}