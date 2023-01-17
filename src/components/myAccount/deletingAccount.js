import React, { useState, useEffect } from "react";
import "./myAccount.css"
import { connect } from 'react-redux'
import { sendRequest, beforeRequest } from '../../redux/user/user.action'
import MessageAlert from "../messageAlert/messageAlert";
import CheckSecurity from "../qrCode/checkSecurity";
import SubmitLoader from "../submitLoader/submitLoader";

function DeletingAccount(props) {
    const [loader, setLoader] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null)
    const [showAlertMsgModal, setShowAlertMsgModal] = useState(false)
    const [renderSecurity, setRednerSecuirty] = useState(false);
    const [description, setDescription] = useState()

    useEffect(() => {
        if (props.user.sendRequestAuth) {
            setLoader(false)
            setShowAlertMsgModal(true)
            setSuccessMsg(props.user.sendRequestMessage)
            setDescription("")
        }
    }, [props.user.sendRequestAuth])

    const deleteAcc = () => {
        setRednerSecuirty(true)
        // let payload = {
        //     type: 1 // account deletion request
        // }
        // props.beforeRequest()
        // props.sendRequest(payload)
    }

    const setVerified = (value) => {
        if (value) {
            let payload = {
                type: 1, // account deletion request
                description
            }
            props.beforeRequest()
            props.sendRequest(payload)
        }
        setRednerSecuirty(false)
    }


    return (
        <>
            <MessageAlert
                type={successMsg === "You already have requested for account deletion." ? "warning" : "success"}
                greeting={successMsg === "You already have requested for account deletion." ? "Sorry!" : "We are sad to see you go!"}
                description={successMsg}
                show={showAlertMsgModal}
                onHide={setShowAlertMsgModal}
            />
            {renderSecurity && <CheckSecurity setVerified={setVerified} securityType="accountDeletion" redirctPath="/my-account" />}

            <div className="deleting-account">
                {/* <div className="card">
                <label>Status: -</label>
                <label>Admin notes: -</label>
                <label>User notes: -</label>
             </div> */}
                <h2>Notes</h2>
                <textarea className="card" defaultValue={description} onChange={(e)=> setDescription(e.target.value)} />

                <div className="d-flex justify-content-center align-items-center">
                    <button onClick={() => (deleteAcc())} className="btn-triage-div btn-triage"><span>Delete Account</span>{loader && <SubmitLoader />}</button>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { sendRequest, beforeRequest })(DeletingAccount)