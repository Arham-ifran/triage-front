import { toast } from 'react-toastify';
import { SET_ACTIVE_KEY, SET_KYC_DATA, UNSET_KYC_DATA, GET_ERRORS, UPDATE_KYC_DOC, BEFORE_KYC, GET_Personal_Doc } from '../../redux/types';
import { emptyError } from '../../redux/shared/error/error.action';
import { ENV } from './../../config/config';

export const setActiveKey = (data) => {
    return {
        type: SET_ACTIVE_KEY,
        payload: data
    }
}

export const setKycData = (data) => {
    return {
        type: SET_KYC_DATA,
        payload: data
    }
}

export const unSetKycData = (data) => {
    return {
        type: UNSET_KYC_DATA,
        payload: data
    }
}

export const beforeKyc = () => {
    return {
        type: BEFORE_KYC
    }
}

export const getPersonalDoc = (userId) => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}kyc/get/${userId}`;
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
                type: GET_Personal_Doc,
                payload: data.kyc
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

export const updatePersonalDoc = (body) => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}kyc/update`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : ''
        },
        body
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: UPDATE_KYC_DOC
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
















