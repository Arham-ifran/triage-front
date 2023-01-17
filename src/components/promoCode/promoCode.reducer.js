import { BEFORE_PROMO_CODE, VERIFY_PROMO_CODE, USED_PROMOS } from '../../redux/types';

const initialState = {
    verifyPromoCodeAuth: false,
    usedPromoCodesAuth: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case VERIFY_PROMO_CODE:
            return {
                ...state,
                promoCode: action.payload,
                verifyPromoCodeAuth: true
            }
        case BEFORE_PROMO_CODE:
            return {
                ...state,
                verifyPromoCodeAuth: false,
                usedPromoCodesAuth: false

            }
        case USED_PROMOS:
            return {
                ...state,
                usedpromocodesData: action.payload,
                usedPromoCodesAuth: true
            }
        default:
            return {
                ...state
            }
    }
}