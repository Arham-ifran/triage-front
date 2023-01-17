import React, { useState, useEffect } from "react";
import "./myAccount.css"
import { connect } from "react-redux"
import { Form } from 'react-bootstrap'
import { updateProfile, beforeUser } from '../../redux/user/user.action'
import PasswordInput from "../passwordInput/passwordInput";
import TextInput from "../textInput/textInput";
import CheckSecurity from "../qrCode/checkSecurity";
import SubmitLoader from "../submitLoader/submitLoader";

function Email(props) {
    const [data, setData] = useState({
        newEmail: "",
        confirmEmail: "",
        password: ""
    })
    const [err, setErr] = useState({})
    const [loader, setLoader] = useState(false)
    const [renderSecurity, setRednerSecuirty] = useState(false);

    const changeData = (name, value) => {
        let tempData = data
        tempData[name] = value
        setData({ ...tempData })
    }

    useEffect(() => {
        if (props.user.updateProfileAuth) {
            setData({
                newEmail: "",
                confirmEmail: "",
                password: ""
            })
            setLoader(false)
        }
    }, [props.user.updateProfileAuth])

    useEffect(() => {
        if (props.error.error) {
            setLoader(false)
        }
    }, [props.error.error])

    const checkValidaiton = () => {
        const { password, newEmail, confirmEmail } = data
        let isValid = true
        let error = {}
        if (password === "") {
            error["password"] = "Field is Requried"
            isValid = false
        }
        if (newEmail === "") {
            error["newEmail"] = "Field is Requried"
            isValid = false
        }
        if (confirmEmail === "") {
            error["confirmEmail"] = "Field is Requried"
            isValid = false
        }
        if (newEmail !== "" && confirmEmail !== "" && newEmail !== confirmEmail) {
            error["formErr"] = "Email and Confirm Email should be same."
            isValid = false
        }
        setErr(error)
        return isValid
    }


    const setVerified = (value) => {
        if (value) {
            setLoader(true)
            props.beforeUser()
            props.updateProfile(data)
        }
        setRednerSecuirty(true)
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (checkValidaiton()) {
            setRednerSecuirty(true)
        }
    }

    return (
        <div className="email">
            {renderSecurity && <CheckSecurity setVerified={setVerified} securityType="changeEmail" redirctPath="/my-account" />}
            <div className="d-flex justify-content-center align-items-center">
                <Form onSubmit={submitForm}>
                    <div>
                        <div className="account-inputs">
                            <TextInput name="newEmail" type="email" label="Enter new Email" value={data?.newEmail} errorMsg={err["newEmail"]} changeData={changeData} />
                        </div>
                        <div className="account-inputs">
                            <TextInput name="confirmEmail" type="email" label="Confirm Email" value={data?.confirmEmail} errorMsg={err["confirmEmail"]} changeData={changeData} />
                        </div>
                        <div className="account-inputs password-input-account ">
                            <PasswordInput name="password" label="Password" value={data?.password} changeData={changeData} errorMsg={err?.password} />
                        </div>
                        {err["formErr"] && <p className="error">{err["formErr"]}</p>}
                        {
                            props.user.updateProfileMsg && <p className="error">{props.user.updateProfileMsg}</p>
                        }
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
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    error: state.error
})

export default connect(mapStateToProps, { updateProfile, beforeUser })(Email)