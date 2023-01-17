import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { ENV } from '../../config/config';
import DisplayImage from "../displayImage/displayImage";
import Navbar from "../shared/navbar/navbar";
import Additional_Files from "./AdditionalFiles";
import Address from "./address";
import Completion from "./completion";
import { updateProfile, beforeUser, getUser } from '../../redux/user/user.action'
import { beforeKyc, getPersonalDoc, setActiveKey, setKycData,updatePersonalDoc } from './kyc.action';
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import "./KYC.css";
import Personal from "./personal";
import Personal_Document from "./personalDocument";
import Phone from "./phone";


function KYC(props) {

    const [completionCheck, setCompletionCheck] = useState(false)
    const [kycCheck, setKycCheck] = useState(false)
    const [buttonText, setButtonText] = useState('Verify Now')
    const [selectedNav, setSelectedNav] = useState('first')
    const [loader, setLoader] = useState(true)
    const [toggleButtonCheck, setToggleButtonCheck] = useState(false)
    const [userData, setUserData] = useState({})
    const [kycStatus,setKYCstatus] = useState()
    const [persData, setPersData] = useState({})
    let storedData = ENV.getUserKeys()


    useEffect(() => {
        props.getUser(storedData._id)
        props.getPersonalDoc(storedData._id)
    }, [])

    useEffect(() => {
        if (props.user.getUserAuth) {
            let user = props.user.getUserData
            let kycStatus = props.user.kycStatus
            setKYCstatus(kycStatus)
            setUserData(user)
            setLoader(false)
        }
    }, [props.user.getUserAuth])

    useEffect(() => {
        if (props.kyc.personalDocAuth) {
            debugger
            let personalData = props.kyc.personalDoc
            if(personalData)
            {
            if (personalData.appliedKYC === 1) {
                setButtonText('Verify Now')
            }
            else if (personalData.appliedKYC === 2) {
                setKycCheck(true)
                setButtonText('Cancel KYC')
            }
            else if (personalData.appliedKYC === 3) {
                setKycCheck("verified")
                setButtonText('Verified')
            }      
           }

            props.beforeKyc()
        }
    }, [props.kyc.personalDocAuth])

    useEffect(() => {
        if (toggleButtonCheck) {
            if (!kycCheck) {
                setButtonText('Verify Now')
                let payload = {
                    '_id': storedData._id,
                    'userKeyStatus': 1
                }
                props.updateProfile(payload)
                let formData1 = new FormData()
                formData1.append('userId', storedData._id)
                formData1.append('appliedKYC', 1)
                props.updatePersonalDoc(formData1)
            }
            else {
                setButtonText('Cancel KYC')
                let payload = {
                    '_id': storedData._id,
                    'userKeyStatus': 2
                }
                props.updateProfile(payload)
                let formData2 = new FormData()
                formData2.append('userId', storedData._id)
                formData2.append('appliedKYC', 1)
                props.updatePersonalDoc(formData2)
                setKycCheck(true)
            }
            setToggleButtonCheck(false)
        }
    }, [kycCheck])

    useEffect(() => {
        if (props.user.updateProfileAuth) {
            setLoader(false)
            props.beforeUser()
        }
    }, [props.user.updateProfileAuth])

    useEffect(() => {
        if (props.kyc.activeKey) {
            setSelectedNav(props.kyc.activeKey)
        }
    }, [props.kyc.activeKey])


    const togglKyc = () => {
        setToggleButtonCheck(true)
        setKycCheck((kycCheck) => (!kycCheck))
        setLoader(true)
    }

    const completion = () => {
        if (userData.firstName && userData.lastName && userData.dob &&
            persData.personalDocumentFront && persData.personalDocumentBack &&
            persData.phone && persData.country && persData.addressDocument) {
            props.setActiveKey('sixth');
            setSelectedNav('sixth');
        }
        else {
            toast.info('Please fill all required fields for completion.')
        }
    }


    return (
        <>
            {loader ?
                <FullPageLoader />
                :
                <div className="kyc">
                    <div className="kyc-details d-flex wallet-details p-3">
                        <Container>
                            {/* <div className="d-flex justify-content-end top-head flex-wrap pt-75">
                                <Navbar storedData={storedData} />
                            </div> */}
                            <div>
                                <DisplayImage firstName={storedData.firstName ? storedData.firstName : ''} lastName={storedData.lastName ? storedData.lastName : ''} email={storedData.email ? storedData.email : ''} togglKyc={togglKyc} kycCheck={kycCheck} buttonText={buttonText} 
                                kycApplied={kycStatus}/>
                                {
                                    kycCheck === true && kycCheck !== "verified"?
                                        <div className="profile-settings">
                                            <div className="tabs-section">
                                                <Tab.Container id="left-tabs-example" defaultActiveKey="first" activeKey={props.kyc.activeKey} >
                                                    <div className="tabs-header mb-0">
                                                        <Nav variant="pills" >
                                                            {/* <Nav.Item className="me-4 ms-sm-0 ms-4"> */}
                                                            <Nav.Item className="">
                                                                <Nav.Link eventKey="first" href="#">
                                                                    Personal
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                            {/* <Nav.Item className="me-4 me-sm-0 ms-sm-0 ms-4"> */}
                                                            <Nav.Item className="">
                                                                <Nav.Link eventKey="second"  href="#">
                                                                    Personal Documents
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item className="">
                                                                <Nav.Link eventKey="forth"  href="#">
                                                                    Address
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                            {/* <Nav.Item className="me-4 ms-4"> */}
                                                            <Nav.Item className="">
                                                                <Nav.Link eventKey="fifth"  href="#">
                                                                    Additional
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item className="">
                                                                <Nav.Link eventKey="sixth"  href="#">
                                                                    Completion
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                    </div>
                                                    <Tab.Content>
                                                        {
                                                            selectedNav === 'first' ?
                                                                <Personal />
                                                                :
                                                                selectedNav === 'second' ?
                                                                    <Personal_Document />
                                                                    :
                                                                    selectedNav === 'forth' ?
                                                                        <Address />
                                                                        :
                                                                        selectedNav === 'fifth' ?
                                                                            <Additional_Files />
                                                                            :
                                                                            selectedNav === 'sixth' ?
                                                                                <Completion />
                                                                                : ''
                                                        }
                                                    </Tab.Content>
                                                </Tab.Container>
                                            </div>
                                        </div>
                                        : ''
                                }
                            </div>
                        </Container>
                    </div>
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    kyc: state.kyc,
    user: state.user
})

export default connect(mapStateToProps, { setActiveKey, setKycData, getPersonalDoc, beforeKyc, updateProfile, beforeUser, getUser,updatePersonalDoc })(KYC)