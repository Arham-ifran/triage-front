import { BEFORE_ADDRESS, BEFORE_STAKE_AUTH, GET_CURRENCIES_CAPS, BEFORE_CURRENCIES_CAPS, GET_SAVING_PLANS, BEFORE_SAVING_PLANS, BEFORE_PLANS_PROFIT, GET_PLANS_PROFIT, CREATE_STAKE_AUTH, GET_STAKE_AMOUNT, BEFORE_STAKE_AMOUNT, LIST_CURRENCY_STATS, BEFORE_CURRENCT_STATS } from '../types';

const initialState = {
    currencyCapsList: null,
    walletList: null,
    getCurrencyCapAuth: false,

    plans: null,
    getPlansAuth: false,

    profitPlans: null,
    getProfitPlansAuth: false,

    stakeData: null,
    createStakeAuth: false,

    listStatsData: null,
    listStatsAuth: false,
    listStatsGraphAuth:false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case BEFORE_CURRENCIES_CAPS:
            return {
                ...state,
                currencyCapsList: null
            }
        case BEFORE_CURRENCT_STATS:
            return {
                ...state,
                listStatsGraphAuth: false
            }
        case GET_CURRENCIES_CAPS:
            return {
                ...state,
                currencyCapsList: action.payload.currencyCap,
                walletList: action.payload.walletList,
                getCurrencyCapAuth: true
            }
        case BEFORE_SAVING_PLANS:
            return {
                ...state,
                plans: null,
                getPlansAuth: false,
            }
        case GET_SAVING_PLANS:
            return {
                ...state,
                plans: action.payload.plans,
                getPlansAuth: true
            }
        case BEFORE_PLANS_PROFIT:
            return {
                ...state,
                profitPlans: null,
                getProfitPlansAuth: false
            }
        case GET_PLANS_PROFIT:
            return {
                ...state,
                profitPlans: action.payload.plans,
                getProfitPlansAuth: true
            }
        case CREATE_STAKE_AUTH:
            return {
                ...state,
                createStakeAuth: true,
                stakeData: action.payload
            }
        case BEFORE_STAKE_AUTH: 
            return {
                ...state,
                createStakeAuth: false,
            }
        case LIST_CURRENCY_STATS:
            return {
                ...state,
                listStatsGraphAuth: true,
                listStatsData: action.payload
            }
        default:
            return {
                ...state
            }
    }
}