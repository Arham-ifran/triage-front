import React, { useState, useEffect } from "react";
import Select from 'react-select'
import { Form } from 'react-bootstrap'
import SubmitLoader from "../submitLoader/submitLoader";
import { beforeAddress, addAddress, editAddress, getAddressList } from '../../redux/addressBook/addressBook.action'
import { connect } from "react-redux"

const currency = [
    { value: 'pkr', label: 'PKR' },
    { value: 'usd', label: 'USD' },
    { value: 'gbp', label: 'GBP' },
    { value: 'euro', label: 'EURO' }
]
const country = [
    { value: 'pakistan', label: 'Pakistan' },
    { value: 'usa', label: 'USA' },
    { value: 'germany', label: 'Germany' }
]

function BankAccount(props) {
    const { formType, dataObj, setSuccess, setSuccessMsg } = props
    const [data, setData] = useState({ type: "bank" })
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
        if (props.address.editAddressAuth && formType === "edit") {
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
        if (!data.coin) {
            err["coin"] = "Select Coin."
            isValid = false
        }
        if (!data.beneficiaryName) {
            err["beneficiaryName"] = "Beneficiary Name is required."
            isValid = false
        }
        if (!data.beneficiaryAddress) {
            err["beneficiaryAddress"] = "Beneficiary Address is required."
            isValid = false
        }
        if (!data.country) {
            err["country"] = "Select Country."
            isValid = false
        }
        if (!data.bankName) {
            err["bankName"] = "Bank Name is required."
            isValid = false
        }
        if (!data.bankAddress) {
            err["bankAddress"] = "Bank Address is required."
            isValid = false
        }
        if (!data.bankAccount) {
            err["bankAccount"] = "Bank Account is required."
            isValid = false
        }
        if (!data.bic_swift) {
            err["bic_swift"] = "BIC/Swift is required."
            isValid = false
        }
        if (!data.comment) {
            err["comment"] = "Comment is Required."
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
        <div className="bank-modal">
            <div className="modal-content">
                <Form onSubmit={(e) => submitAddress(e)}>
                    <strong>You can create a contact list for withdrawal addresses hererr.</strong>
                    <label>Label</label>
                    <div className="input-field">
                        <input name="label" defaultValue={data?.label} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                        {error["label"] && <p>{error["label"]}</p>}
                    </div>
                    <label>Coin</label>
                    <div className="input-field">
                        <Select classNamePrefix="triage-select" placeholder="Select Curreny" value={currency.filter(option => option.value === data?.coin)} options={currency} onChange={(e) => { changeData("coin", e.value) }} />
                        {error["coin"] && <p>{error["coin"]}</p>}
                    </div>
                    <label>Beneficiary Name</label>
                    <div className="input-field">
                        <input name="beneficiaryName" defaultValue={data?.beneficiaryName} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                        {error["beneficiaryName"] && <p>{error["beneficiaryName"]}</p>}
                    </div>
                    <label>Beneficiary Address</label>
                    <div className="input-field">
                        <input name="beneficiaryAddress" defaultValue={data?.beneficiaryAddress} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                        {error["beneficiaryAddress"] && <p>{error["beneficiaryAddress"]}</p>}
                    </div>
                    <label>Country</label>
                    <div className="input-field">
                        <Select classNamePrefix="triage-select" placeholder="Select Country" value={country.filter(option => option.value === data?.country)} options={country} onChange={(e) => { changeData("country", e.value) }} />
                        {error["country"] && <p>{error["country"]}</p>}
                    </div>
                    <label>Beneficiary Bank Name</label>
                    <div className="input-field">
                        <input name="bankName" defaultValue={data?.bankName} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                        {error["bankName"] && <p>{error["bankName"]}</p>}
                    </div>
                    <label>Beneficiary Bank Address</label>
                    <div className="input-field">
                        <input name="bankAddress" defaultValue={data?.bankAddress} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                        {error["bankAddress"] && <p>{error["bankAddress"]}</p>}
                    </div>
                    <label>Beneficiary Bank Account</label>
                    <div className="input-field">
                        <input name="bankAccount" defaultValue={data?.bankAccount} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                        {error["bankAccount"] && <p>{error["bankAccount"]}</p>}
                    </div>
                    <label>BIC/SWIFT</label>
                    <div className="input-field">
                        <input name="bic_swift" defaultValue={data?.bic_swift} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                        {error["bic_swift"] && <p>{error["bic_swift"]}</p>}
                    </div>
                    <label>Comments</label>
                    <div className="input-field">
                        <input name="comment" defaultValue={data?.comment} onChange={(e) => { changeData(e.target.name, e.target.value) }} />
                        {error["comment"] && <p>{error["comment"]}</p>}
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn-triage-div btn-triage d-flex justify-content-center align-items-center"><span>Save</span>{loader && <SubmitLoader />}</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    address: state.address
})

export default connect(mapStateToProps, { beforeAddress, addAddress, editAddress, getAddressList })(BankAccount)