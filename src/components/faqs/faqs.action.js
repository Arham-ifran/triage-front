import { toast } from 'react-toastify';
import { BEFORE_FAQ_CAT, LIST_FAQ_CAT, GET_ERRORS, BEFORE_FAQ, LIST_FAQ } from '../../redux/types';
import { emptyError } from '../../redux/shared/error/error.action';
import { ENV } from './../../config/config';

export const beforeFaqCats = () => {
    return {
        type: BEFORE_FAQ_CAT
    }
}

export const listFaqCats = () => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}faq/list-faq-categories`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: LIST_FAQ_CAT,
                payload: data
            })
        } else {
            toast.error(data.message)
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
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
}

export const beforeFaqs = () => {
    return {
        type: BEFORE_FAQ
    }
}

export const listFaqs = (catId) => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}faq/list/${catId}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: LIST_FAQ,
                payload: data.data
            })
        } else {
            toast.error(data.message)
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
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
}
