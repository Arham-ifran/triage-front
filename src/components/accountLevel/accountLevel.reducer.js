import { LIST_ACCOUNT_LEVELS, BEFORE_ACCOUNT_LEVELS, SEARCH_LEVEL_DETAILS,SEARCH_LEVEL_ANNUALIZED, MIN_INVESTMENT } from '../../redux/types';

const initialState = {
    listLevel: {},
    listLevelAnnualized: {},
    listLevelAuth: false,
    searchLevelAuth: false,
    searchLevelAnnualizedAuth: false,
    minInvestmentAuth: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LIST_ACCOUNT_LEVELS:
            return {
                ...state,
                listLevel: action.payload,
                listLevelAuth: true
            }
        case SEARCH_LEVEL_DETAILS:
            return {
                ...state,
                listLevels: action.payload,
                searchLevelAuth: true
            }
        case SEARCH_LEVEL_ANNUALIZED:
            return {
                ...state,
                listLevelAnnualized: action.payload,
                searchLevelAnnualizedAuth: true
            }
        case MIN_INVESTMENT:
            return {
                ...state,
                accountsInvestments: action.payload,
                minInvestmentAuth: true
            }
        case BEFORE_ACCOUNT_LEVELS:
            return {
                ...state,
                listLevel: {},
                listLevelAnnualized: {},
                searchLevelAnnualizedAuth: false,
                listLevelAuth: false,
                searchLevelAuth: false,
                minInvestmentAuth: false
            }
        default:
            return {
                ...state
            }
    }
}