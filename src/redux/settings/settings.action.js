import { toast } from 'react-toastify';
import { GET_SETTINGS, BEFORE_SETTINGS, GET_ERRORS,GET_BANK_DETAILS } from '../../redux/types';
import { emptyError } from '../../redux/shared/error/error.action';
import { ENV } from '../../config/config';

export const beforeSettings = () => {
    return {
        type: BEFORE_SETTINGS
    }
}

export const getSettings = () => dispatch => {
    toast.dismiss()
    dispatch(emptyError());
    let url = `${ENV.url}settings/get`;

    fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            toast.success(data.message)
            dispatch({
                type: GET_SETTINGS,
                payload: data.settings
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
                toast.error(data.message, {
                    toastId: "settings-stats-error"
                })
        }
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    })
};

export const getBankDetails = () => dispatch => {
    toast.dismiss()
    dispatch(emptyError());
    let url = `${ENV.url}settings/getbankdetails`;

    fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            toast.success(data.message)
            dispatch({
                type: GET_BANK_DETAILS,
                payload: data.bankDetails
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


