// import { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// import Nav from 'react-bootstrap/Nav';
// import Tab from 'react-bootstrap/Tab';
// import { connect } from 'react-redux';
// import Profile from "../../assets/images/profile.png";
// import { ENV } from '../../config/config';
// import DisplayImage from "../displayImage/displayImage";
// import Navbar from "../shared/navbar/navbar";
// import Additional_Files from "./Additional-files";
// import Address from "./address";
// import Completion from "./completion";
// import { beforeKyc, getPersonalDoc, setActiveKey, setKycData } from './kyc.action';
// import "./KYC.css";
// import Personal from "./personal";
// import Personal_Document from "./personal-document";
// import Phone from "./phone";


// function KYC_Details(props) {

//     const [completionCheck, setCompletionCheck] = useState(false)
//     let storedData = ENV.getUserKeys()


//     useEffect(() => {
//         let data = {
//             firstName: '',
//             lastName: '',
//             _id: storedData._id
//         }
//         if (storedData.firstName !== undefined)
//             data = { ...data, firstName: storedData.firstName }
//         if (storedData.lastName !== undefined)
//             data = { ...data, lastName: storedData.lastName }
//         if (storedData.dob !== undefined)
//             data = { ...data, dob: storedData.dob }
//         props.setKycData(data)
//         props.getPersonalDoc(storedData._id)
//     }, [])

//     useEffect(() => {
//         if (props.kyc.personalDocAuth) {
//             let personalData = props.kyc.personalDoc
//             if (personalData) {
//                 if (personalData.kycStatus) {
//                     setCompletionCheck(personalData.kycStatus)
//                 }
//             }
//             props.beforeKyc()
//         }
//     }, [props.kyc.personalDocAuth])

//     return (
//         <div className="kyc-details d-flex wallet-details p-3">
//             <Container>
//                 <div className="d-flex justify-content-end top-head flex-wrap pt-95">
//                    <Navbar />
//                 </div>
//                 <div>
//                     <DisplayImage firstName={storedData.firstName ? storedData.firstName : ''} lastName={storedData.lastName ? storedData.lastName : ''} email={storedData.email ? storedData.email : ''} />
//                     <div className="profile-settings">
//                         <div className="tabs-section">
//                             <Tab.Container id="left-tabs-example" defaultActiveKey="first" activeKey={props.kyc.activeKey} >
//                                 <div className="tabs-header mb-0">
//                                     <Nav variant="pills" >
//                                         <Nav.Item className="me-4 me-sm-0">
//                                             <Nav.Link eventKey="first" onClick={() => { props.setActiveKey('first') }} href="#">
//                                                 Personal
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                         <Nav.Item className="me-4 me-sm-0 ms-sm-0 ms-4">
//                                             <Nav.Link eventKey="second" onClick={() => { props.setActiveKey('second') }} href="#">
//                                                 Personal Documents
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                         <Nav.Item className="me-4 me-sm-0 ms-sm-0 ms-4">
//                                             <Nav.Link eventKey="third" onClick={() => { props.setActiveKey('third') }} href="#">
//                                                 Phone
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                         <Nav.Item className="me-4 me-sm-0 ms-sm-0 ms-4">
//                                             <Nav.Link eventKey="forth" onClick={() => { props.setActiveKey('forth') }} href="#">
//                                                 Address
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                         <Nav.Item className="me-4 ms-4">
//                                             <Nav.Link eventKey="fifth" onClick={() => { props.setActiveKey('fifth') }} href="#">
//                                                 Additional
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                         <Nav.Item className="me-4 ms-4">
//                                             <Nav.Link eventKey="sixth" onClick={() => { if (completionCheck) { props.setActiveKey('sixth') } }} href="#">
//                                                 Completion
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                     </Nav>
//                                 </div>
//                                 <Tab.Content>
//                                     <Tab.Pane eventKey="first">
//                                         <Personal />
//                                     </Tab.Pane>
//                                     <Tab.Pane eventKey="second">
//                                         <Personal_Document />
//                                     </Tab.Pane>
//                                     <Tab.Pane eventKey="third">
//                                         <Phone />
//                                     </Tab.Pane>
//                                     <Tab.Pane eventKey="forth">
//                                         <Address />
//                                     </Tab.Pane>
//                                     <Tab.Pane eventKey="fifth">
//                                         <Additional_Files />
//                                     </Tab.Pane>
//                                     <Tab.Pane eventKey="sixth">
//                                         <Completion />
//                                     </Tab.Pane>
//                                 </Tab.Content>
//                             </Tab.Container>
//                         </div>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//     )
// }

// const mapStateToProps = (state) => ({
//     kyc: state.kyc
// })

// export default connect(mapStateToProps, { setActiveKey, setKycData, getPersonalDoc, beforeKyc })(KYC_Details)