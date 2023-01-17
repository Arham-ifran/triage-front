import { toast } from 'react-toastify';
import { emptyError } from '../../redux/shared/error/error.action';
import { BEFORE_PROMO_CODE, VERIFY_PROMO_CODE, GET_ERRORS, USED_PROMOS } from '../../redux/types';
import { ENV } from './../../config/config';

export const beforePromoCode = () => {
    return {
        type: BEFORE_PROMO_CODE
    }
}

export const verifyPromoCode = (promoCode) => dispatch => {
    dispatch(emptyError());
    let url = `${ENV.url}promocode/get/${promoCode}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        dispatch({
            type: VERIFY_PROMO_CODE,
            payload: data
        })
    }).catch(error => {
        if (error.response && error.response.data) {
            const { data } = error.response
            if (data.message)
                toast.error(data.message)
        }
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    })
};

export const usedPromos = (_id) => dispatch => {
    dispatch(emptyError());
    let url = `${ENV.url}promocode/list/${_id}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        dispatch({
            type: USED_PROMOS,
            payload: data.data
        })
    }).catch(error => {
        if (error.response && error.response.data) {
            const { data } = error.response
            if (data.message)
                toast.error(data.message)
        }
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    })
};