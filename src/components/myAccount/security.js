import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import "./myAccount.css"
import { connect } from 'react-redux'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { enablesSecurity, getSecurity, beforeSecurity } from '../../redux/user/user.action'
import ToastModal from "../toast/toast";
import MessageAlert from "../messageAlert/messageAlert";
import SubmitLoader from "../submitLoader/submitLoader";

function Security(props) {

    const [successMsg, setSuccessMsg] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const [data, setData] = useState({
        login: false,
        withdrawal: false,
        accountDeletion: false,
        changeEmail: false,
        changePassword: false,
    })

    const [loader, setLoader] = useState(false)
    const [showAlertMsgModal, setShowAlertMsgModal] = useState(false)

    useEffect(() => {
        props.beforeSecurity()
        props.getSecurity()
    }, [])

    useEffect(() => {
        if (props.user.getSecurityAuth) {
            const { security } = props.user
            let tempData = data
            tempData["login"] = security?.login
            tempData["withdrawal"] = security?.withdrawal
            tempData["accountDeletion"] = security?.accountDeletion
            tempData["changeEmail"] = security?.changeEmail
            tempData["changePassword"] = security?.changePassword
            setData({ ...tempData })
        }
    }, [props.user.getSecurityAuth])

    useEffect(() => {
        if (props.user.createSecurityAuth) {
            const { security } = props.user
            let tempData = data
            tempData["login"] = security?.login
            tempData["withdrawal"] = security?.withdrawal
            tempData["accountDeletion"] = security?.accountDeletion
            tempData["changeEmail"] = security?.changeEmail
            tempData["changePassword"] = security?.changePassword
            
            setData({ ...tempData })
            setLoader(false)
            setShowAlertMsgModal(true)
            setSuccessMsg(props.user.createSecurityAuthMessage)
        }
    }, [props.user.createSecurityAuth])

    const changeData = (name, value) => {
        let dataObj = { ...data }
        dataObj[name] = value
        setData({ ...dataObj })
        // submitForm(dataObj)
    }

    const submitForm = () => {
        props.beforeSecurity()
        setLoader(true)
        props.enablesSecurity(data)
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
            <div className="security">
                {/* <Accordion defaultActiveKey="0"> */}
                    {/* <Accordion.Item eventKey="0">
                        <Accordion.Header className="flex-wrap"><FontAwesomeIcon className="google-icon" icon={faGoogle} />  <strong>Google Authenticator</strong></Accordion.Header>
                        <Accordion.Body> */}
                        <div className="flex-wrap"><FontAwesomeIcon className="google-icon" icon={faGoogle} />  <strong>Google Authenticator</strong></div>
                            <ul className="w-100">
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Login</span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                name="login"
                                                checked={data?.login}
                                                onChange={(e) => { changeData(e.target.name, e.target.checked) }}
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Withdrawal requests </span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                name="withdrawal"
                                                checked={data.withdrawal}
                                                onChange={(e) => { changeData(e.target.name, e.target.checked) }}
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Account deletion request</span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                name="accountDeletion"
                                                checked={data.accountDeletion}
                                                onChange={(e) => { changeData(e.target.name, e.target.checked) }}
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Change E-Mail request </span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                name="changeEmail"
                                                checked={data.changeEmail}
                                                onChange={(e) => { changeData(e.target.name, e.target.checked) }}
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Change Password request </span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                name="changePassword"
                                                checked={data.changePassword}
                                                onChange={(e) => { changeData(e.target.name, e.target.checked) }}
                                            />
                                        </Form>
                                    </div>
                                </li>
                            </ul>
                        {/* </Accordion.Body>
                    </Accordion.Item>
                </Accordion> */}
                <div className="d-flex justify-content-center align-items-center">
                    <button onClick={()=> submitForm()} className="btn-triage-div btn-triage" disabled={loader && true}><span>Save</span>{loader && <SubmitLoader />}</button>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { enablesSecurity, getSecurity, beforeSecurity })(Security)