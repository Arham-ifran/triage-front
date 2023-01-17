import { toast } from 'react-toastify';
import { GET_ERRORS, BEFORE_USER, LOGIN_USER, UPDATE_PASSWORD, FORGOT_PASSWORD, RESET_PASSWORD, BEFORE_USER_VERIFY, GET_USER_VERIFY, REGISTER_USER, SET_USER, UPDATE_PROFILE, ENABLE_SECURITY, GET_SECURITY, BEFORE_SECURITY, SEND_REQUEST, BEFORE_REQUEST, UPDATE_BANNER, GET_USER, GET_USER_REFERRALS, GET_USER_HISTORY, GET_CRITERIA_LIST,SET_USER_BALANCE } from '../types';
import { emptyError } from '../shared/error/error.action';
import { ENV } from './../../config/config';


export const beforeSecurity = () => {
    return {
        type: BEFORE_SECURITY
    }
}

export const beforeUser = () => {
    return {
        type: BEFORE_USER
    }
}

export const setUser = (data) => {
    return {
        type: SET_USER,
        payload: data
    }
}

export const beforeRequest = () => {
    return {
        type: BEFORE_REQUEST,
    }
}

export const signOut = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("encuse")
    return {
        type: BEFORE_USER
    }
}

export const register = (body) => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}auth/register`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            if (data.success) {
                localStorage.setItem("accessToken", data.data.accessToken);
                ENV.encryptUserData(data.data)
                dispatch({
                    type: REGISTER_USER,
                    payload: data.data
                })
            }
            else {
                toast.error("You are not active. Kindly contact admin!")
                dispatch({
                    type: GET_ERRORS,
                    payload: data
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
};

export const login = (body) => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}auth/login`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            if (data.success) {
                localStorage.setItem("accessToken", data.data.accessToken);
                ENV.encryptUserData(data.data)
                dispatch({
                    type: LOGIN_USER,
                    payload: data.data
                })
            }
            else {
                toast.error("You are not active. Kindly contact admin!")
                dispatch({
                    type: GET_ERRORS,
                    payload: data
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
};

export const updateProfile = (body, method = 'PUT') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}auth/edit-profile`;
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
            data.data["accessToken"] = localStorage.getItem("accessToken")
            ENV.encryptUserData(data.data)
            dispatch({
                type: UPDATE_PROFILE,
                payload: { user: data.data, message: data.message }
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

export const updateBanner = (body, method = 'PUT') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}auth/update-banner`;
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
            console.log("data.data: ", data.data);
            data.data["accessToken"] = localStorage.getItem("accessToken")
            ENV.encryptUserData(data.data)
            dispatch({
                type: UPDATE_BANNER
            })
            dispatch({
                type: UPDATE_PROFILE,
                payload: { user: data.data, message: data.message }
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

export const getUser = (userId, method = 'GET') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}users/${userId}`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : ''
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_USER,
                payload: data.data,
                kyc: data.kycStatus,
                walletData: data.walletData
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

export const updatePassword = (body, method = 'PUT') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}auth/change-password`;
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
            toast.success(data.message)
            dispatch({
                type: UPDATE_PASSWORD,
                payload: { message: data.message }
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

export const forgotPassword = (body) => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}auth/forgot-password`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: FORGOT_PASSWORD,
                msg: data.message
            })
        } else {
            // toast.error(data.message)
            dispatch({
                type: FORGOT_PASSWORD,
                msg: data.message
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

export const resetPassword = (body, method = 'POST') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}auth/reset-password`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'content-type': "application/json"
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            toast.success(data.message)
            dispatch({
                type: RESET_PASSWORD,
                msg: data.message
            })
        } else {
            toast.error(data.message)
            dispatch({
                type: RESET_PASSWORD,
                msg: data.message
            })
        }
    }).catch(error => {
        if (error.response && error.response.data) {
            const { data } = error.response
            if (data.message)
                toast.error(data.message)
        }
        dispatch({
            type: GET_ERRORS
        })
    })
};

// export const getUserVerify = (body) => dispatch => {

//     dispatch(emptyError());
//     const url = `${ENV.url}/verify-admin-password`
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//             'Authorization': ENV.Authorization,
//             'x-auth-token': ENV.x_auth_token,
//             'x-access-token': localStorage.getItem('accessToken')
//         },
//         body: JSON.stringify(body)
//     }).then(res => res.json()).then(data => {
//         if (data.success) {
//             dispatch({
//                 type: GET_USER_VERIFY,
//                 payload: data
//             })
//         }
//         else {
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: data
//             })
//         }
//     }).catch(errors => {
//         dispatch({
//             type: GET_ERRORS,
//             payload: errors
//         })
//     })
// };

// export const beforeVerify = () => {
//     return {
//         type: BEFORE_USER_VERIFY
//     }
// };


export const enablesSecurity = (body, method = 'POST') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}security/create`;
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
                type: ENABLE_SECURITY,
                payload: { security: data.security, message: data.message }
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

export const getSecurity = (body, method = 'GET') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}security/get`;
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
                type: GET_SECURITY,
                payload: { security: data.security, message: data.message }
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

export const sendRequest = (body, method = 'POST') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}request/create`;
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
                type: SEND_REQUEST,
                payload: { message: data.message }
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

export const getUserReferrals = (userId, method = 'GET') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}users/refferals/${userId}`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : ''
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_USER_REFERRALS,
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

export const getUserHistory = (userId, method = 'GET') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}users/history/${userId}`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : ''
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_USER_HISTORY,
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

export const getCriteriaList = (qs = '') => dispatch => {
    dispatch(emptyError());
    let url = `${ENV.url}criteria/clist`;
    if (qs)
        url += `?${qs}`

    fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_CRITERIA_LIST,
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

export const getCriteriaListAll = (qs = '') => dispatch => {
    dispatch(emptyError());
    let url = `${ENV.url}criteria/list`;
    if (qs)
        url += `?${qs}`

    fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_CRITERIA_LIST,
                payload: data.criteria
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

export const getEnabledSecurity = (body, method = 'POST') => dispatch => {
    dispatch(emptyError());
    const url = `${ENV.url}auth/getEnabledSecurity`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {
             dispatch({
                type: GET_SECURITY,
                payload: { security: {...data.security, qrCode: data.qrCode}, message: data.message }
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

export const setUserBalance = (data) => {
    return {
        type: SET_USER_BALANCE,
        payload: data
    }
}
