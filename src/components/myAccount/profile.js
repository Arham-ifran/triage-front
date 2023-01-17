import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./myAccount.css"
import { Form } from 'react-bootstrap'
import { updateProfile, beforeUser } from '../../redux/user/user.action'
import MessageAlert from "../messageAlert/messageAlert";
import SubmitLoader from "../submitLoader/submitLoader";

function Profile_Setting(props) {

    const [data, setData] = useState({firstName: props.firstName, lastName: props.lastName})
    const [loader, setLoader] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null)
    const [showAlertMsgModal, setShowAlertMsgModal] = useState(false)
    const [err, setErr] = useState({})

    // useEffect(()=> {
    //     if(props.user.user){
    //         let userData = props.user.user
    //         let obj = {}
    //         obj.firstName = userData.firstName
    //         obj.lastName = userData.lastName
    //         setData({...obj})     
    //     }
    // }, [props.user.user])

    useEffect(()=> {
        if(props.user.updateProfileAuth){
            setLoader(false)
            setShowAlertMsgModal(true)
            setSuccessMsg(props.user.updateProfileMsg)
        }
    }, [props.user.updateProfileAuth])

    useEffect(()=> {
        if(props.error.error){
            setLoader(false)
        }
    }, [props.error.error])
    
    const checkValidation = async() => {
        const { firstName, lastName } = data

        let isValid = true
        let error = {}


        if (firstName == '') {
            error["firstName"] = "Field is Requried"
            isValid = false
        }
        if (lastName == '') {
            error["lastName"] = "Field is Requried"
            isValid = false
        }

        console.log("Error = ", error)
        setErr(error)

        console.log("isValid", isValid)
        return isValid
    }

    const submitForm = async (e) => {
        e.preventDefault()

        let isValidate = await checkValidation()
        
        if(isValidate){
            setLoader(true)
            props.beforeUser()
            props.updateProfile(data)
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
            <div className="profile">
                <div className="d-flex justify-content-center align-items-center">
                    <Form onSubmit={submitForm}>
                        <div>
                            <div className="account-inputs">
                                <label>First Name<span className="text-danger"> *</span></label>
                                <input type="text" placeholder="Enter Your First Name" value={data?.firstName} onChange={(e)=> setData({ ...data, firstName: e.target.value })} />
                                {err["firstName"] && <p className="error position-absolute">{err["firstName"]}</p>}
                            </div>
                            <div className="account-inputs">
                                <label>Last Name<span className="text-danger"> *</span></label>
                                <input type="text" placeholder="Enter Your Last Name" value={data?.lastName} onChange={(e)=> setData({ ...data, lastName: e.target.value })} />
                                {err["lastName"] && <p className="error position-absolute">{err["lastName"]}</p>}
                            </div>
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

export default connect(mapStateToProps,  { updateProfile, beforeUser })(Profile_Setting)