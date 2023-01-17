import { BEFORE_FOOTER, GET_FOOTER, SUBMIT_FOOTER, SUBMIT_CONTACT,GET_CURRENCIES_DATA,GET_DYNAMIC_PAGES_DATA } from '../../../redux/types';

const initialState = {
    getFooter: {},
    submitRes: {},
    getFooterAuth: false,
    submitAuth: false,
    submitContactAuth: false,
    getCurrencyAuth: false,
    getDynamicPageDataAuth: false

}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FOOTER:
            return {
                ...state,
                getFooter: action.payload,
                getFooterAuth: true
            }
        case GET_CURRENCIES_DATA: 
        return {
            ...state, 
            currencyList: action.payload,
            getCurrencyAuth: true
        } 
        case SUBMIT_FOOTER:
            return {
                ...state,
                submitAuth: true,
                submitRes: action.payload
            }
        case GET_DYNAMIC_PAGES_DATA:
            return {
                ...state, 
                dynamicPagesData: action.payload,
                getDynamicPageDataAuth: true
            }
        case SUBMIT_CONTACT:
            return {
                ...state,
                submitContactAuth: true
            }
        case BEFORE_FOOTER:
            return {
                ...state,
                getFooter: {},
                submitRes: {},
                getFooterAuth: false,
                submitAuth: false,
                getCurrencyAuth: false,
                getDynamicPageDataAuth: false,
                submitContactAuth: false
            }
        default:
            return {
                ...state
            }
    }
}