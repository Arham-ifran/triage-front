import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import SubmitLoader from "../submitLoader/submitLoader";
import Select from 'react-select';
import { connect } from "react-redux"
import { beforeAddress, addAddress, editAddress, getAddressList } from '../../redux/addressBook/addressBook.action'
import { networks } from "../../utils/networks";

function Crypto(props) {
    const { formType, dataObj, setSuccess, setSuccessMsg } = props
    const [data, setData] = useState({ type: "crypto" })
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (formType === "edit") {
            setData({ ...dataObj })
        }
    }, [formType])

    useEffect(() => {
        if (props.address.addAddressAuth && formType === "add") {
            setLoader(false)
            initialData()
            setSuccess(true)
            setSuccessMsg(props.address.message)
            props.beforeAddress()
            props.getAddressList()
        }
    }, [props.address.addAddressAuth])

    useEffect(() => {
        if (props.address.editAddressAuth) {
            setLoader(false)
            setSuccess(true)
            setSuccessMsg(props.address.message)
            props.beforeAddress()
            props.getAddressList()
        }
    }, [props.address.editAddressAuth])

    const initialData = () => {
        setData({ type: "crypto" })
    }

    const changeData = (name, value) => {
        let tempData = data
        tempData[name] = value
        setData({ ...tempData })
    }

    const checkValidation = () => {
        let isValid = true
        let err = {}
        if (!data.label) {
            err["label"] = "Label is Required."
            isValid = false
        }

        setError({ ...err })
        return isValid
    }

    const submitAddress = (e) => {
        e.preventDefault()
        if (checkValidation()) {
            setLoader(true)
            props.beforeAddress()
            if (formType === "add") {
                props.addAddress(data)
            } else if (formType === "edit") {
                props.editAddress(data)
            } else { }
        }
    }

    return (
        <div className="cypto-modal percent-records pt-5">
            <div>
                <Form onSubmit={(e) => submitAddress(e)}>
                    <Row>
                        <Col>
                            <label>Label</label>
                            <div className="input-field">
                                <input name="label" defaultValue={data?.label} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                                {error["label"] && <p className="error">{error["label"]}</p>}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Beneficiary name</label>
                            <div className="input-field">
                                <input name="beneficiaryName" defaultValue={data?.beneficiaryName} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                                {error["beneficiaryName"] && <p className="error">{error["beneficiaryName"]}</p>}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Beneficiary address</label>
                            <div className="input-field">
                                <input name="beneficiaryAddress" defaultValue={data?.beneficiaryAddress} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                                {error["beneficiaryAddress"] && <p className="error">{error["beneficiaryAddress"]}</p>}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Country</label>
                            <div className="input-field">
                                <input name="country" defaultValue={data?.country} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                                {error["country"] && <p className="error">{error["country"]}</p>}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Beneficiary Bank Name</label>
                            <div className="input-field">
                                <input name="bankName" defaultValue={data?.bankName} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                                {error["bankName"] && <p className="error">{error["bankName"]}</p>}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Beneficiary Bank Address</label>
                            <div className="input-field">
                                <input name="bankAddress" defaultValue={data?.bankAddress} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                                {error["bankAddress"] && <p className="error">{error["bankAddress"]}</p>}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Beneficiary Bank Account</label>
                            <div className="input-field">
                                <input name="bankAccount" defaultValue={data?.bankAccount} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                                {error["bankAccount"] && <p className="error">{error["bankAccount"]}</p>}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>BIC/SWIFT</label>
                            <div className="input-field">
                                <input name="bic_swift" defaultValue={data?.bic_swift} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                                {error["bic_swift"] && <p className="error">{error["bic_swift"]}</p>}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Comments</label>
                            <div className="input-field">
                                <input name="comment" defaultValue={data?.comment} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                                {error["comment"] && <p className="error">{error["comment"]}</p>}
                            </div>  
                        </Col>
                    </Row>
                    
                    
                    
                    
                    
                    
                                    
                   <div className="modal-footer justify-content-center">
                   <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn-triage-div btn-triage d-flex justify-content-center align-items-center" onClick={(e) => { submitAddress(e) }} ><span>Save</span>
                            {loader && <SubmitLoader />}
                        </button>
                    </div>
                   </div>
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    address: state.address
})

export default connect(mapStateToProps, { beforeAddress, addAddress, editAddress, getAddressList })(Crypto)