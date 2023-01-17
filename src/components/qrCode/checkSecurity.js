import React, { useState, useEffect } from "react";
// import "./login.css"
import { connect } from 'react-redux'
import { login } from '../../redux/user/user.action'
import { useNavigate } from 'react-router-dom'
import { emptyError } from '../../redux/shared/error/error.action';
import QrCode from "../qrCode/qrCode";
import { getSecurity, beforeSecurity } from "../../redux/user/user.action";

function CheckSecurity(props) {
    const [qrShow, setQrShow] = useState(null);
    const handleClose = () => setQrShow(false);

    const navigate = useNavigate()
    const [data, setData] = useState({
        login: false,
        withdrawal: false,
        accountDeletion: false,
        changeEmail: false,
        changePassword: false,
    })

    const [err, setErr] = useState({})

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            // props.beforeSecurity()
            props.getSecurity()
        }
    }, [localStorage.getItem('accessToken')])


    useEffect(() => {
        if(props.securityType === "login"){
            setQrShow(true)
        }else {
            if (props.user.getSecurityAuth) {
                const { security } = props.user
                let tempData = data
                tempData["login"] = security?.login
                tempData["withdrawal"] = security?.withdrawal
                tempData["accountDeletion"] = security?.accountDeletion
                tempData["changeEmail"] = security?.changeEmail
                tempData["changePassword"] = security?.changePassword
                // setData({ tempData })
    
                if (security[props.securityType]) {
                    setQrShow(true)
                }
                else {
                    props.setVerified(true)
                    setQrShow(false)
                    navigate(props.redirctPath)
                }
            }
        }
    }, [props.user.security])


    useEffect(() => {
        props.emptyError()
    }, [])

    useEffect(() => {
        if (props.error.error) {
            let error = err
            error["auth"] = props?.error?.error?.message
            setErr({ ...error })
        } else {
            setErr({})
        }
    }, [props.error.error])


    return (
        <>
            {
                qrShow ?
                    <QrCode
                        setVerified={props.setVerified}
                        redirctPath={props.redirctPath}
                        securityType = {props.securityType}
                        setOtpCode = {props.setOtpCode} //in login case
                        show={qrShow}
                        qrCode={props.securityType === "login" ? props?.QRCode : null}
                        onHide={handleClose} /> :
                    <></>}
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    error: state.error
})

export default connect(mapStateToProps, { login, emptyError, getSecurity, beforeSecurity })(CheckSecurity)