// import React from "react";
// import { Container, Table } from "react-bootstrap";
// import Profile from "../../assets/images/profile.png"
// import Navbar from "../shared/navbar/navbar";
// import "./promoCode.css"

// function PromoCode_Details() {
//     return (
//         <>
//             <div className="promo-code-details d-flex">
//                 <Container>

//                     <div className="d-flex justify-content-end top-head flex-wrap pt-75">
//                        <Navbar />
//                     </div>
//                     <div>
//                         <h2>Promo Code</h2>
//                         <div className="enter-code-box">
//                             <strong>Enter code</strong>
//                             <div className="d-flex align-items-center flex-wrap">
//                                 <div className="enter-input mb-3 mb-xl-0">
//                                     <input />
//                                 </div>
//                                 <button className="btn-triage-div btn-triage"><span>Check</span></button>
//                             </div>

//                         </div>
//                     </div>
//                     <div>
//                         <h2>Promo Codes</h2>

//                         <div className="history">
//                             <div className="table-responsive">
//                                 <Table striped bordered hover>
//                                     <thead>
//                                         <tr>
//                                             <th>Points activation</th>
//                                             <th>Status</th>
//                                             <th>Created at</th>
//                                             <th>Times used</th>
//                                             <th>Code type</th>
//                                             <th>Bonus type</th>
//                                             <th>Bonus</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Ligula nec</td>
//                                             <td>Active</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>5h</td>
//                                             <td>Lorem ipsum</td>
//                                             <td>Bignuiom trhkml</td>
//                                             <td>505</td>
//                                         </tr>

//                                     </tbody>
//                                 </Table>
//                             </div>
//                         </div>

//                     </div>
//                 </Container>
//             </div>
//         </>
//     )
// }
// export default PromoCode_Details