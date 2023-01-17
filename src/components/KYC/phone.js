import codes from 'country-calling-code';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Select from 'react-select';
import { setActiveKey, updatePersonalDoc, getPersonalDoc, beforeKyc } from './kyc.action';
import { isMobilePhone, isEmpty } from 'validator';
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import { ENV } from '../../config/config'
import "./KYC.css";

function Phone(props) {

    let storedData = ENV.getUserKeys()
    const [countryCode, setCountryCode] = useState([])
    const [data, setData] = useState('')
    const [msg, setMsg] = useState('')
    const [saveCheck, setSaveCheck] = useState(false)
    const [loader, setLoader] = useState(true)
    const [code, setCode] = useState()
    const [country, setCountry] = useState()

    useEffect(() => {
        if (storedData._id)
            props.getPersonalDoc(storedData._id)
        setCountryCode(
            codes.map((item) => {
                return ({
                    value: item.countryCodes[0], label: item.country + ' (+' + item.countryCodes[0] + ')'
                })
            })
        )
    }, [])

    useEffect(() => {
        if (props.kyc.updateAuth) {
            setLoader(false)
            props.beforeKyc()
        }
    }, [props.kyc.updateAuth])

    useEffect(() => {
        if (props.kyc.personalDocAuth) {
            let personalData = props.kyc.personalDoc
            if (personalData) {
                if (personalData.phone)
                    setData(personalData.phone)
                setCode(personalData.countryCode)
                codes.map((item) => {
                    if (`+${item.countryCodes[0]}` == personalData.countryCode) {
                        setCountry({ value: item.countryCodes[0], label: item.country + ' (+' + item.countryCodes[0] + ')' })
                    }
                })
            }
            setLoader(false)
            props.beforeKyc()
        }
    }, [props.kyc.personalDocAuth])


    const onSelectChange = (e) => {
        setCode('+' + e.value)
        setCountry(e)
        // setData('+' + e.value)
    }

    const onChange = (e) => {
        setData(e.target.value)
    }

    const save = () => {
        setSaveCheck(true)
        if (!isEmpty(data)) {
            if (isMobilePhone(data)) {
                let formData = new FormData()
                formData.append('phone', `${data}`)
                formData.append('countryCode', `${code}`)
                formData.append('userId', storedData._id)
                props.updatePersonalDoc(formData)
                setLoader(true)
                setMsg('')
                props.setActiveKey('forth')
            }
            else {
                setMsg('Please Enter Valid Phone Number.')
            }
        }
        else {
            if (isEmpty(data)) {
                setMsg('Please Enter Valid Phone Number.')
            }
        }
    }


    return (
        <div className="phone">
            {
                loader ?
                    <FullPageLoader />
                    :
                    <>
                        <div className="d-flex justify-content-center align-items-center">
                            <div>
                                <label className=" w-100 mb-4">Phone Number<span className="text-danger"> *</span></label>
                                <div className="account-inputs phone-number-select d-flex  flex-wrap">
                                    <div className='country-name-selector'>
                                        <Select
                                            // menuIsOpen="true"
                                            value={country}
                                            onChange={onSelectChange}
                                            options={countryCode}
                                            classNamePrefix="country-code-select triage-select w-100"
                                        />
                                    </div>
                                    <div className='d-flex number-holder-div'>
                                        <input value={code} className="country-code" />
                                        <input value={data} onKeyDown={(e) => ENV.integerNumberValidator(e)} onChange={onChange} className="number-holder" />
                                    </div>
                                </div>
                                {
                                    msg ?
                                        <div className='error'>{msg}</div>
                                        : ''
                                }
                            </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center pt-4">
                            <button className="btn-triage-div btn-triage me-4" onClick={save}><span>Save</span></button>
                            {/* <button className="btn-triage-div btn-triage bg-white" onClick={() => { props.setActiveKey('forth') }}><span>Next</span></button> */}
                        </div>
                    </>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    kyc: state.kyc
})

export default connect(mapStateToProps, { setActiveKey, updatePersonalDoc, getPersonalDoc, beforeKyc })(Phone)