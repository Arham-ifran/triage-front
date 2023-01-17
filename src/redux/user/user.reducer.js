import { BEFORE_USER, LOGIN_USER, GET_USER_VERIFY, BEFORE_USER_VERIFY, UPDATE_PASSWORD, FORGOT_PASSWORD, RESET_PASSWORD, REGISTER_USER, SET_USER, UPDATE_PROFILE, ENABLE_SECURITY, GET_SECURITY, BEFORE_SECURITY, SEND_REQUEST, BEFORE_REQUEST, SET_WALLET_ERROR, UPDATE_BANNER, GET_USER, GET_USER_REFERRALS, GET_USER_HISTORY, GET_CRITERIA_LIST,SET_USER_BALANCE } from '../types';

const initialState = {
    user: null,
    loginUserAuth: false,
    registerUserAuth: false,
    updateProfileAuth: false,
    updatePasswordAuth: false,
    forgotPassword: null,
    forgotPasswordAuth: false,
    resetPasswordAuth: false,
    forgotMsg: null,
    resetMsg: null,
    userVerifyRes: {},
    userVerifyAuth: false,
    userReferralAuth: false,
    updateProfileMsg: null,
    security: null,
    getSecurityAuth: false,
    createSecurityAuth: false,
    createSecurityAuthMessage: null,
    sendRequestAuth: false,
    sendRequestMessage: null,
    userHistoryAuth: false,
    walletError: null,
    updateBannerAuth: false,
    getUserData: {},
    getUserAuth: false,
    criteriaListAuth: false,
    userBalance: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_WALLET_ERROR:
            return {
                ...state,
                walletError: action.payload
            }
        case BEFORE_REQUEST:
            return {
                ...state,
                sendRequestAuth: false,
                sendRequestMessage: null
            }
        case SEND_REQUEST:
            return {
                ...state,
                sendRequestAuth: true,
                sendRequestMessage: action.payload.message
            }
        case BEFORE_SECURITY:
            return {
                ...state,
                security: null,
                getSecurityAuth: false,
                createSecurityAuth: false,
            }
        case ENABLE_SECURITY:
            return {
                ...state,
                security: action.payload.security,
                createSecurityAuthMessage: action.payload.message,
                createSecurityAuth: true,
            }
        case GET_USER_REFERRALS:
            return {
                ...state,
                referrals: action.payload,
                userReferralAuth: true,
            }
        case GET_USER_HISTORY:
            return {
                ...state,
                history: action.payload,
                userHistoryAuth: true,
            }
        case GET_CRITERIA_LIST:
            return {
                ...state,
                criteriaList: action.payload,
                criteriaListAuth: true
            }
        case GET_SECURITY: {
            return {
                ...state,
                security: action.payload.security,
                getSecurityAuth: true,
            }
        }
        case UPDATE_PROFILE:
            return {
                ...state,
                user: action.payload.user,
                updateProfileMsg: action.payload.message,
                updateProfileAuth: true
            }
        case UPDATE_BANNER:
            return {
                ...state,
                updateBannerAuth: true
            }
        case UPDATE_PASSWORD:
            return {
                ...state,
                updateProfileMsg: action.payload.message,
                updatePasswordAuth: true
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
            case SET_USER_BALANCE:
                return {
                    ...state,
                    userBalance: action.payload
                }
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                loginUserAuth: true
            }
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload,
                registerUserAuth: true
            }
        case FORGOT_PASSWORD:
            return {
                ...state,
                forgotPasswordAuth: true,
                forgotMsg: action.msg
            }
        case RESET_PASSWORD:
            return {
                ...state,
                resetPasswordAuth: true,
                resetMsg: action.msg
            }

        case GET_USER_VERIFY:
            return {
                ...state,
                userVerifyRes: action.admin,
                userVerifyAuth: true
            }
        case BEFORE_USER_VERIFY:
            return {
                ...state,
                userVerifyAuth: false,
            }
        case GET_USER:
            return {
                ...state,
                getUserData: action.payload,
                kycStatus: action.kyc,
                walletData: action.walletData,
                getUserAuth: true
            }
        case BEFORE_USER:
            return {
                ...state,
                user: null,
                loginUserAuth: false,
                registerUserAuth: false,
                updateProfileAuth: false,
                updatePasswordAuth: false,
                forgotPassword: null,
                forgotPasswordAuth: false,
                resetPasswordAuth: false,
                forgotMsg: null,
                resetMsg: null,
                userVerifyRes: {},
                userReferralAuth: false,
                userVerifyAuth: false,
                updateProfileMsg: null,
                updateBannerAuth: false,
                getUserData: {},
                getUserAuth: false,
                userHistoryAuth: false,
                criteriaListAuth: false
            }
        default:
            return {
                ...state
            }
    }
}