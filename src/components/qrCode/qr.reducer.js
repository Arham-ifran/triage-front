import { BEFORE_QR, GET_QR_CODE, OTP_VERIFIED } from '../../redux/types';

const initialState = {
    otpVerfied: null,
    otpVerfiedAuth: false,
    getQrCode: null,
    getQrCodeAuth: false,
    beforeQrAuth: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case OTP_VERIFIED:
            return {
                ...state,
                otpVerfied: action.payload,
                otpVerfiedAuth: true
            }
        case GET_QR_CODE:
            return {
                ...state,
                getQrCode: action.payload,
                getQrCodeAuth: true
            }
        case BEFORE_QR:
            return {
                ...state,
                otpVerfied: null,
                otpVerfiedAuth: false,
                getQrCode: null,
                getQrCodeAuth: false,
                beforeQrAuth: false
            }
        default:
            return {
                ...state
            }
    }
}