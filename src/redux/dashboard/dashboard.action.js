import { toast } from 'react-toastify';
import { GET_STAKE_AMOUNT, BEFORE_STAKE_AUTH, CREATE_STAKE_AUTH, GET_ERRORS, BEFORE_CURRENCIES_CAPS, GET_CURRENCIES_CAPS, GET_SAVING_PLANS, BEFORE_SAVING_PLANS, GET_PLANS_PROFIT, BEFORE_PLANS_PROFIT, BEFORE_STAKE_AMOUNT, LIST_CURRENCY_STATS, BEFORE_CURRENCT_STATS } from '../types';
import { emptyError } from '../shared/error/error.action';
import { ENV } from './../../config/config';

export const beforeCurrencyCaps = () => {
    return {
        type: BEFORE_CURRENCIES_CAPS
    }
}

export const beforeCurrencyStats = () => {
     return {
        type: BEFORE_CURRENCT_STATS
    }
}

export const beforeSavingPlans = () => {
    return {
        type: BEFORE_SAVING_PLANS
    }
}

export const beforePlansProfit = () => {
    return {
        type: BEFORE_PLANS_PROFIT
    }
}

export const beforeStakeAuth = () => {
    return {
        type: BEFORE_STAKE_AUTH
    }
}

export const getCurrencyCaps = (method = 'GET') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}currencyCap/get`;
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
                type: GET_CURRENCIES_CAPS,
                payload: { currencyCap: data.data.currencyCap, walletList: data.data.walletList }
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

export const getCurrencyStats = (qs = '') => dispatch => {
    dispatch(emptyError());

    let url = `${ENV.url}currencyCap/listStats`;
    url += `?${qs}`

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: LIST_CURRENCY_STATS,
                payload: data.data
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

export const getSavingPlans = (qs = '', method = 'GET') => dispatch => {
    dispatch(emptyError());
    let url = `${ENV.url}criteria/plans`;

    if (qs) {
        url += `?${qs}`
    }

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
                type: GET_SAVING_PLANS,
                payload: { plans: data.data.plans }
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


export const getPlansProfit = (qs = '', method = 'GET') => dispatch => {
    dispatch(emptyError());

    let url = `${ENV.url}criteria/plans-profit`;

    if (qs) {
        url += `?${qs}`
    }

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
                type: GET_PLANS_PROFIT,
                payload: { plans: data.data.profitPlans }
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

// stake the currency model
export const createStake = (data, method = 'POST') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}stake/create`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: CREATE_STAKE_AUTH,
                payload: data.stakedCurrencyData
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
