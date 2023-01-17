import { toast } from 'react-toastify';
import { LIST_ACCOUNT_LEVELS, BEFORE_ACCOUNT_LEVELS, GET_ERRORS, SEARCH_LEVEL_DETAILS, SEARCH_LEVEL_ANNUALIZED, MIN_INVESTMENT } from '../../redux/types';
import { emptyError } from '../../redux/shared/error/error.action';
import { ENV } from './../../config/config';

export const beforeLevels = () => {
    return {
        type: BEFORE_ACCOUNT_LEVELS
    }
}

export const listLevels = () => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}account-levels/list-levels`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: LIST_ACCOUNT_LEVELS,
                payload: data.data.accountLevels
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

export const searchLevelsDetails = (qs) => dispatch => {
    dispatch(emptyError());
    let url = `${ENV.url}account-levels/account-levels-detail`;
    if (qs)
        url += `?${qs}`
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            if(data.key == "accountlevel"){
                dispatch({
                    type: SEARCH_LEVEL_DETAILS,
                    payload: data.data
                })
            }
            else{
                dispatch({
                    type: SEARCH_LEVEL_ANNUALIZED,
                    payload: data.data
                })
            }
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

export const levelsInvestments = (balance) => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}account-levels/min-investment/${balance}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: MIN_INVESTMENT,
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