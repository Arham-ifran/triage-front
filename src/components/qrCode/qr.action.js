import { toast } from 'react-toastify';
import { BEFORE_QR, GET_QR_CODE, OTP_VERIFIED,GET_ERRORS } from '../../redux/types';
import { emptyError } from '../../redux/shared/error/error.action';
import { ENV } from './../../config/config';


 
export const getQrCode = () => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}auth/get-qr`;
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
                type: GET_QR_CODE,
                payload: data
            })
        } else {
            toast.error(data.message)
            dispatch({
                type: GET_ERRORS,
                payload: data.data
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

export const beforeQr = () => {
    return {
        type: BEFORE_QR
    }
}

export const otpVerfication = (qs = '') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}auth/check-verification?${qs}`;
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
                type: OTP_VERIFIED,
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
