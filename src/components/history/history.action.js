import { toast } from 'react-toastify';
import { BEFORE_HISTORY, LIST_HISTORY, GET_ERRORS, CREATE_HISTORY } from '../../redux/types';
import { emptyError } from '../../redux/shared/error/error.action';
import { ENV } from './../../config/config';

export const beforeHistory = () => {
    return {
        type: BEFORE_HISTORY
    }
}

export const listHistory = (qs = '') => dispatch => {
    dispatch(emptyError());
    let url = `${ENV.url}history/list`;

    if (qs)
        url = `${ENV.url}history/list?${qs}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: LIST_HISTORY,
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

export const insertHistory = (body = {}) => dispatch => {
    dispatch(emptyError());
    let url = `${ENV.url}history/insert`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: CREATE_HISTORY,
                payload: { history : data.historyObj }
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