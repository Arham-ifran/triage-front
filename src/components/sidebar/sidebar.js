import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo.svg"
import Dashboard_Icon from "../../assets/images/Icon material-dashboard.svg"
import Deposit_Icon from "../../assets/images/sidebar-icon3.svg"
import Earn_Icon from "../../assets/images/icon4.svg"
import Management_Icon from "../../assets/images/icon5.svg"
import Exchange_Icon from "../../assets/images/icon6.svg"
import LiveTriage_Icon from "../../assets/images/icon7.svg"
import Withdrawal_Icon from "../../assets/images/icon8.svg"
import MyAccount_Icon from "../../assets/images/icon9.svg"
import KYC_Icon from "../../assets/images/icon10.svg"
import Account_Icon from "../../assets/images/icon11.svg"
import Referral_Icon from "../../assets/images/icon12.svg"
import History_Icon from "../../assets/images/icon13.svg"
import Promo_Icon from "../../assets/images/icon14.svg"
import Logout_Icon from "../../assets/images/icon15.svg"
import "../wallets/wallets.css"
import { connect } from 'react-redux'
import { updateProfile, setUser,getUser,beforeUser } from '../../redux/user/user.action'
import { ENV } from '../../config/config'
import { Link, useNavigate } from "react-router-dom";
import { NavLink,useLocation } from 'react-router-dom'
import Wallet_Icon from "../../assets/images/wallet-thin-svgrepo-com.svg"
import "../../App.css"
import { Nav } from "react-bootstrap";
import { emptyError } from '../../redux/shared/error/error.action';

function Sidebar(props) {
    

    const navigate = useNavigate()
    const { pathname } = useLocation();
    const [restrictRoute, setRestrictRoute] = useState(false)

    useEffect(() => {
        const {_id} = ENV.getUserKeys()
        if(_id) {
            props.getUser(_id)
        }
    }, [])

    // useEffect(() => {
    //     let token = localStorage.getItem("accessToken")
    //     if (token) {
    //         const user = ENV.getUserKeys()
    //         props.setUser(user)
    //         if(user?.kycApplied?.appliedKYC !== 3 ) {
    //             setRestrictRoute(true)
    //             navigate("/kyc")
    //         }
    //     }else {
    //         navigate('/sign-in')
    //     }
    // }, [pathname])


    useEffect(() => {
        if (props.user.getUserAuth) {
            let user = props.user.getUserData
            let kycStatus = props.user.kycStatus
            if(kycStatus !== 3 ) {
                setRestrictRoute(true)
                navigate("/kyc")
            }
            props.setUser(user)
            props.beforeUser()
        }
    }, [props.user.getUserAuth])



    const logout = async () => {
        await ENV.clearStorage()
        props.setUser(null)
        props.emptyError()
        navigate('/sign-in')
    }

    return (
        <>
            <div className="sidebar">
                <div className="logo d-flex align-items-center">
                    <Link to={'/'} ><img src={Logo} alt="" /></Link>
                </div>
                <ul className="list-unstyled">
                    <li className="d-flex">
                        <NavLink to={'/wallet'} activeClassName="active" className="text-decoration-none d-flex flex-fill" disabled={restrictRoute}>
                            <div className="me-3">

                                <img src={Wallet_Icon} alt="" />
                            </div>
                            <span>Wallets</span>
                        </NavLink>
                    </li>
                    <li className="d-flex align-items-center">
                        <NavLink to="/dashboard" activeClassName="active" className="text-decoration-none d-flex flex-fill" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={Dashboard_Icon} alt="" />
                            </div>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="d-flex align-items-center">
                        <NavLink to="/deposit" className="text-decoration-none d-flex flex-fill" activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={Deposit_Icon} alt="" />
                            </div>
                            <span>Deposit</span>
                        </NavLink>               </li>
                    <li className="d-flex align-items-center">
                        <NavLink to="/earn-interest" className="text-decoration-none d-flex flex-fill" activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={Earn_Icon} alt="" />
                            </div>
                            <span>Earn Interest</span>
                        </NavLink>
                    </li>
                    {/* <li className="d-flex align-items-center">
                        <NavLink to="/tri-management" className="text-decoration-none d-flex flex-fill" activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={Management_Icon} alt="" />
                            </div>
                            <span>TRI Management</span>
                        </NavLink>
                    </li>
                    <li className="d-flex align-items-center">
                        <NavLink to="/exchange" className="text-decoration-none d-flex flex-fill" activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={Exchange_Icon} alt="" />
                            </div>
                            <span>Exchange</span>
                        </NavLink>
                    </li>
                    <li className="d-flex align-items-center">
                        <NavLink to="/live-triage" className="text-decoration-none d-flex flex-fill" activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={LiveTriage_Icon} alt="" />
                            </div>
                            <span>Live Triage</span>
                        </NavLink>
                    </li> */}
                    <li className="d-flex align-items-center">
                        <NavLink to="/withdrawal" className="text-decoration-none d-flex flex-fill" activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={Withdrawal_Icon} alt="" />
                            </div>
                            <span>Withdrawal</span>
                        </NavLink>
                    </li>
                    <li className="d-flex align-items-center">
                        <NavLink to="/my-account" className="text-decoration-none d-flex flex-fill" activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={MyAccount_Icon} alt="" />
                            </div>
                            <span>My Account</span>
                        </NavLink>
                    </li>
                    <li className="d-flex align-items-center" >
                        <NavLink to="/kyc" className="text-decoration-none d-flex flex-fill" activeClassName="active" >
                            <div className="me-3">
                                <img src={KYC_Icon} alt="" />
                            </div>
                            <span>KYC</span>
                        </NavLink>
                    </li>
                    <li className="d-flex align-items-center" disabled>
                        <NavLink to="/account-level" className="text-decoration-none d-flex flex-fill" activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={Account_Icon} alt="" />
                            </div>
                            <span>Account Levels</span>
                        </NavLink>
                    </li>
                    <li className="d-flex align-items-center">
                        <NavLink to="/referral" className="text-decoration-none d-flex flex-fill" activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={Referral_Icon} alt="" />
                            </div>
                            <span>Referral</span>
                        </NavLink>
                    </li>
                    <li className="d-flex align-items-center">
                        <NavLink to="/history" className="text-decoration-none d-flex flex-fill" activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={History_Icon} alt="" />
                            </div>
                            <span>History</span>
                        </NavLink>
                    </li>
                    <li className="d-flex align-items-center">
                        <NavLink to="/promo-code" className="text-decoration-none d-flex flex-fill" activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={Promo_Icon} alt="" />
                            </div>
                            <span>Promo Codes</span>
                        </NavLink>
                    </li>



                    <li className="d-flex align-items-center">
                        <Nav.Link onClick={logout} className="text-decoration-none d-flex flex-fill " activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={Logout_Icon} alt="" />
                            </div>
                            <span>Log out</span>
                        </Nav.Link>
                    </li>


              

                    {/* <li className="d-flex align-items-center">
                        <span onClick={logout} className="text-decoration-none d-flex flex-fill logout-span" activeClassName="active" disabled={restrictRoute}>
                            <div className="me-3">
                                <img src={Logout_Icon} alt="" />
                            </div>
                            <span>Logout</span>
                        </span>
                    </li> */}
                </ul>

            </div>
        </>

    )
}


const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { emptyError, updateProfile, setUser,getUser,beforeUser })(Sidebar)