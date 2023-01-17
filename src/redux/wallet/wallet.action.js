import { toast } from 'react-toastify';
import { GET_ERRORS, BEFORE_WALLET, GET_WALLETS, GET_WALLET, GET_SYMBOLS, PAYMENT_STATUS,CREATE_WIRE_REQUEST,DELETE_WIRE_REQUEST,UPLOAD_RECEIPT,ADD_WITHDRAW_REQUEST,UPDATE_WITHDRAW_STATUS } from '../types';
import { emptyError } from '../shared/error/error.action';
import { ENV } from './../../config/config';

export const beforeWallets = () => {
    return {
        type: BEFORE_WALLET
    }
}

export const getWalletLists = (body, method = 'POST') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}wallet/list`;
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
                type: GET_WALLETS,
                payload: {
                    wallets: data.data.wallets,
                    currencyCaps: data.data.currencyCaps,
                    wireRequests: data.data.wireRequests,
                    timePeriod: data.data.timePeriod,
                    bronzeMinInvestment: data.data.bronzeMinInvestment
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

export const getSymbolsLists = (method = 'GET') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}wallet/symbol/list`;
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
                type: GET_SYMBOLS,
                payload: {
                    symbols: data.symbols
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

export const createPayment = (body, method = 'POST') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}paymentCreate`;
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
                type: PAYMENT_STATUS,
                payload: {
                    paymentStatus: "processing"
                }
            })
            window.location.replace(data.link)
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

export const createWireRequest = (body, method = 'POST') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}wirerequests/create`;
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
                type: CREATE_WIRE_REQUEST
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

export const cancelWireRequest = (requestId) => dispatch => {
    dispatch(emptyError());
    let url = `${ENV.url}wirerequests/delete/${requestId}`;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            toast.success(data.message)
            dispatch({
                type: DELETE_WIRE_REQUEST,
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
};

export const uploadReceipt = (body, method = 'POST') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}wirerequests/depositreceipt`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : ''
        },
        body
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: UPLOAD_RECEIPT
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


export const addWithdrawRequest = (body, method = 'POST') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}withdrawrequest/add`;
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
                type: ADD_WITHDRAW_REQUEST,
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

export const updateUserStatus = (body, method = 'POST') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}withdrawrequest/updatestatus`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'Content-Type': "application/json",
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : ''
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: UPDATE_WITHDRAW_STATUS,
                payload: data.status
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

