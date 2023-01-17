import { BEFORE_ADDRESS, ADD_ADDRESS, EDIT_ADDRESS, DELETE_ADDRESS, GET_ADDRESS_LIST, GET_ADDRESS,GET_USER_PROFIT } from '../types';

const initialState = {
    cryptoAddressList: null,
    bankAddressList: null,
    address: null,
    getAddressListAuth: false,
    getAddressAuth: false,
    addAddressAuth: false,
    editAddressAuth: false,
    deleteAddressAuth: false,
    getUserProfitAuth: false,
    message: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        
        case GET_ADDRESS_LIST: 
            return {
                ...state,
                cryptoAddressList: action.payload.cryptoAddressList,
                bankAddressList: action.payload.bankAddressList,
                getAddressListAuth: true,
                message: action.payload.message
            }
            case GET_USER_PROFIT: 
            return {
                ...state,
                getUserProfitAuth: true,
                userProfit: action.payload
            }
        case GET_ADDRESS: 
            return {
                ...state,
                address: action.payload.address,
                getAddressAuth: true,
                message: action.payload.message
            }
        case ADD_ADDRESS: 
            return {
                ...state,
                address: action.payload.address,
                addAddressAuth: true,
                message: action.payload.message
            }
        case EDIT_ADDRESS: 
            return {
                ...state,
                address: action.payload.address,
                editAddressAuth: true,
                message: action.payload.message
            }
        case DELETE_ADDRESS: 
            return {
                ...state,
                address: action.payload.address,
                deleteAddressAuth: true,
                message: action.payload.message
            }    
        case BEFORE_ADDRESS:
            return {
                ...state,
                addressList: null,
                address: null,
                getAddressListAuth: false,
                getAddressAuth: false,
                addAddressAuth: false,
                editAddressAuth: false,
                deleteAddressAuth: false,
                getUserProfitAuth: false,
                message: false
            }
        default:
            return {
                ...state
            }
    }
}