// import React from "react";
// import { Container } from "react-bootstrap";
// import Nav from 'react-bootstrap/Nav';
// import Tab from 'react-bootstrap/Tab';
// import { connect } from "react-redux";
// import Profile from "../../assets/images/profile.png";
// import { ENV } from '../../config/config';
// import { beforeUser } from "../../redux/user/user.action";
// import DisplayImage from "../displayImage/displayImage";
// import Navbar from "../shared/navbar/navbar";
// import AddressBook from "./addressBook";
// import DeletingAccount from "./deletingAccount";
// import Email from "./email";
// import FinancialReport from "./financialReport";
// import "./myAccount.css";
// import Password from "./password";
// import Profile_Setting from "./profile";
// import Security from "./security";

// function Settings(props) {

//     let storedData = ENV.getUserKeys()

//     return (
//         <div className="settings d-flex wallet-details p-3">
//             <Container>
//                 <div className="d-flex justify-content-end top-head flex-wrap pt-75">
//                    <Navbar />
//                 </div>
//                 <div>
//                     <DisplayImage firstName={storedData.firstName ? storedData.firstName : ''} lastName={storedData.lastName ? storedData.lastName : ''} email={storedData.email ? storedData.email : ''} />
//                     <div className="profile-settings">
//                         <div className="tabs-section">
//                             <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//                                 <div className="tabs-header mb-0">
//                                     <Nav variant="pills" >
//                                         <Nav.Item>
//                                             <Nav.Link eventKey="first" onClick={() => { props.beforeUser() }}>
//                                                 Profile
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                         <Nav.Item>
//                                             <Nav.Link eventKey="second" onClick={() => { props.beforeUser() }}>
//                                                 Password
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                         <Nav.Item>
//                                             <Nav.Link eventKey="third" onClick={() => { props.beforeUser() }}>
//                                                 Email
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                         <Nav.Item>
//                                             <Nav.Link eventKey="forth" onClick={() => { props.beforeUser() }}>
//                                                 Security
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                         <Nav.Item>
//                                             <Nav.Link eventKey="fifth" onClick={() => { props.beforeUser() }}>
//                                                 Deleting Account
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                         <Nav.Item>
//                                             <Nav.Link eventKey="sixth" onClick={() => { props.beforeUser() }}>
//                                                 Address Book
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                         <Nav.Item>
//                                             <Nav.Link eventKey="seventh" onClick={() => { props.beforeUser() }}>
//                                                 Financial Report
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                     </Nav>
//                                 </div>
//                                 <Tab.Content>
//                                     <Tab.Pane eventKey="first">
//                                         <Profile_Setting />
//                                     </Tab.Pane>
//                                     <Tab.Pane eventKey="second">
//                                         <Password />
//                                     </Tab.Pane>
//                                     <Tab.Pane eventKey="third">
//                                         <Email />
//                                     </Tab.Pane>
//                                     <Tab.Pane eventKey="forth">
//                                         <Security />
//                                     </Tab.Pane>
//                                     <Tab.Pane eventKey="fifth">
//                                         <DeletingAccount />
//                                     </Tab.Pane>
//                                     <Tab.Pane eventKey="sixth">
//                                         <AddressBook />
//                                     </Tab.Pane>
//                                     <Tab.Pane eventKey="seventh">
//                                         <FinancialReport />
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

// })

// export default connect(mapStateToProps, { beforeUser })(Settings)