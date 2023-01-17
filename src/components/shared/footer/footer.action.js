import { toast } from 'react-toastify';
import { BEFORE_FOOTER, GET_FOOTER, SUBMIT_FOOTER, GET_ERRORS, SUBMIT_CONTACT,GET_CURRENCIES_DATA,GET_DYNAMIC_PAGES_DATA} from '../../../redux/types';
import { emptyError } from '../../../redux/shared/error/error.action';
import { ENV } from '../../../config/config';

export const beforeFooter = () => {
    return {
        type: BEFORE_FOOTER
    }
}

export const getFooter = () => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}footer/get`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : ''
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_FOOTER,
                payload: data.footer
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

export const submitEmail = (body) => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}footer/submit`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : ''
        },
        body
    }).then(res => res.json()).then(data => {
        if (data.message) {
            dispatch({
                type: SUBMIT_FOOTER,
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

export const contactUs = (body) => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}contact/submit`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.message) {
            dispatch({
                type: SUBMIT_CONTACT,
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

export const getCurrencyList = () => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}footer/cryptocurrency`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_CURRENCIES_DATA,
                payload: data.currenciesData
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

export const getDynamicPagesData = () => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}footer/dynamic-pages`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : ''
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_DYNAMIC_PAGES_DATA,
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