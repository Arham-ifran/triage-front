import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux'
import { ENV } from '../../config/config'
import { setActiveKey, updatePersonalDoc, getPersonalDoc, beforeKyc } from './kyc.action'
import "./KYC.css"
import '../myAccount/myAccount.css'

function Completion(props) {
    let storedData = ENV.getUserKeys()


    useEffect(()=> {
        let formData = new FormData()
            //formData.append('appliedKYC', 2)
            //formData.append('userId', storedData._id)
        props.getPersonalDoc(storedData._id)
    },[])


    useEffect(()=> {
        if(props.kyc.updateAuth)
        props.beforeKyc();
    },[props.kyc.updateAuth])



    const navigate = useNavigate();

    return (
        <div className="completion d-flex justify-content-center align-items-center">
            <div className="text-white ">
                <p className="d-flex jusify-content-center mb-5">Your data has been submitted for KYC verification. Please check back later for the status updates.</p>

                <div>
                    <div className="d-flex justify-content-center flex-wrap">
                      
                       {/* <button className="btn-triage-div btn-triage me-3 mb-3" onClick={() => { navigate("/wallet"); }}><span>Go To Wallet</span></button> */}
                        
                        <button className="btn-triage-div btn-triage me-3 mb-3" onClick={() => { props.setActiveKey('first') }}><span>Change Request</span></button>
                      
                    </div>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    kyc: state.kyc,
    user: state.user
})

export default connect(mapStateToProps, { setActiveKey, updatePersonalDoc, getPersonalDoc, beforeKyc })(Completion)