import { toast } from 'react-toastify';
import { GET_ERRORS, BEFORE_ADDRESS, ADD_ADDRESS, EDIT_ADDRESS, DELETE_ADDRESS, GET_ADDRESS_LIST, GET_ADDRESS,GET_USER_PROFIT } from '../types';
import { emptyError } from '../shared/error/error.action';
import { ENV } from './../../config/config';

export const beforeAddress = () => {
    return {
        type: BEFORE_ADDRESS
    }
}

export const getAddressList = (method = 'GET') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}address/list`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_ADDRESS_LIST,
                payload: {
                    cryptoAddressList: data.data.cryptoAddressList,
                    bankAddressList: data.data.bankAddressList,
                    message: data.message
                }
            })
        } else {
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
};

export const getAddress = (addressId, method = 'GET') => dispatch => {
    dispatch(emptyError());
    let url = `${ENV.url}addres/get/${addressId}`;

    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_ADDRESS,
                payload: { address: data.address, message: data.message }
            })
        } else {
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
};

export const addAddress = (body, method = 'POST') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}address/create`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: ADD_ADDRESS,
                payload: { address: data.address, message: data.message }
            })
        } else {
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
};

export const editAddress = (body, method = 'PUT') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}address/edit`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: EDIT_ADDRESS,
                payload: { address: data.address, message: data.message }
            })
        } else {
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
};

export const deleteAddress = (addressId, method = 'DELETE') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}address/delete/${addressId}`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: DELETE_ADDRESS,
                payload: { address: data.address, message: data.message }
            })
        } else {
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
};

export const getUserProfit = (method = 'GET') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}stake/fetch-profit`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_USER_PROFIT,
                payload: {
                   data: data.data
                }
            })
        } else {
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
};