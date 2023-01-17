import React, { useState, useEffect } from "react";
import "./myAccount.css"
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updatePassword, beforeUser } from '../../redux/user/user.action'
import PasswordInput from "../passwordInput/passwordInput";
import MessageAlert from "../messageAlert/messageAlert";
import CheckSecurity from "../qrCode/checkSecurity";
import SubmitLoader from "../submitLoader/submitLoader";

function Password(props) {

    const [data, setData] = useState({
        currentPwd: "",
        newPwd: "",
        confirmPwd: ""
    })
    const [err, setErr] = useState({})
    const [loader, setLoader] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null)
    const [showAlertMsgModal, setShowAlertMsgModal] = useState(false)
    const [renderSecurity, setRednerSecuirty] = useState(false);

    const changeData = (name, value) => {
        let tempData = data
        tempData[name] = value
        setData({ ...tempData })
    }

    useEffect(() => {
        if (props.user.updatePasswordAuth) {
            setLoader(false)
            setShowAlertMsgModal(true)
            setData({
                currentPwd: "",
                newPwd: "",
                confirmPwd: ""
            })
            setSuccessMsg(props.user.updateProfileMsg)
        }
    }, [props.user.updatePasswordAuth])

    useEffect(() => {
        if (props.error.error) {
            setLoader(false)
        }
    }, [props.error.error])

    const checkValidation = () => {
        const { currentPwd, newPwd, confirmPwd } = data

        let isValid = true
        let error = {}
        if (currentPwd === "") {
            error["currentPwd"] = "Field is Requried"
            isValid = false
        }
        if (newPwd === "") {
            error["newPwd"] = "Field is Requried"
            isValid = false
        }
        if (confirmPwd === "") {
            error["confirmPwd"] = "Field is Requried"
            isValid = false
        }
        if (newPwd !== "" && confirmPwd !== "" && confirmPwd !== newPwd) {
            error["formErr"] = "Both Password should be same."
            isValid = false
        }
        console.log("Error = ", error)
        setErr(error)

        console.log("isValid", isValid)
        return isValid
    }


    const setVerified = (value) => {
        if (value) {
            setLoader(true)
            props.beforeUser()
            props.updatePassword(data);

        }
        setRednerSecuirty(false)
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (checkValidation()) {
            // call the reset api here
            setRednerSecuirty(true)

        }
    }

    return (
        <>
            <MessageAlert
                type="success"
                greeting="Great!"
                description={successMsg}
                show={showAlertMsgModal}
                onHide={setShowAlertMsgModal}
            />
            {renderSecurity && <CheckSecurity setVerified={setVerified} securityType="changePassword" redirctPath="/my-account" />}
            <div className="password">
                <div className="d-flex justify-content-center align-items-center">
                    <Form onSubmit={submitForm}>
                        <div>
                            <div className="account-inputs password-input-account">
                                <PasswordInput label="Current Password" name="currentPwd" value={data.currentPwd}  changeData={changeData} errorMsg={err?.currentPwd} />
                            </div>
                            <div className="account-inputs password-input-account">
                                <PasswordInput label="Set new Password" name="newPwd" value={data.newPwd} changeData={changeData} errorMsg={err?.newPwd} />
                            </div>
                            <div className="account-inputs password-input-account">
                                <PasswordInput label="Confirm Password" name="confirmPwd" value={data.confirmPwd} changeData={changeData} errorMsg={err?.confirmPwd} />
                                {err["formErr"] && <p className="error position-absolute">{err["formErr"]}</p>}
                            </div>
                            {
                    props?.error?.error?.message && <p className="error">{props?.error?.error?.message}</p>
                }
                            <div className="d-flex justify-content-center align-items-center">
                                <button type="submit" className="btn-triage-div btn-triage"><span>Save</span>{loader && <SubmitLoader />}</button>
                            </div>
                        </div>
                    </Form>
                </div>
               
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    error: state.error
})

export default connect(mapStateToProps, { updatePassword, beforeUser })(Password)