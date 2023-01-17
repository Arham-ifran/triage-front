import React, { useState, useEffect } from "react";
import Profile from "../../../assets/images/profile.png"
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProfile, setUser,getUser,beforeUser,setUserBalance } from "../../../redux/user/user.action";
import { formatAddress } from '../../../utils/helperFunctions'
import { ENV } from "../../../config/config";
import ConnectWalletModal from "../../connectWalletModal/connectWalletModal";
import { emptyError } from '../../../redux/shared/error/error.action';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { getBalanceOfToken } from "../../../utils/web3";


const NavbarPanel = (props) => {

    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [kycStatus,setKYCstatus] = useState()
    const [connectedWallet, setConnectedWallet] = useState(null)
    const [userData, setUserData] = useState({})


    useEffect(() => {
        let token = localStorage.getItem("accessToken")
        if (token) {
            const user = ENV.getUserKeys()
            props.getUser(user._id)
            props.setUser(user)
        }
    }, [])

    useEffect(() => {
        if (props.user.getUserAuth) {
            let userData = props.user.user
            let kycStatus = props.user.kycStatus
            let walletData = props.user.walletData
            getTokenBalance(walletData,userData)
            setKYCstatus(kycStatus)           
            props.beforeUser()
        }
    }, [props.user.getUserAuth])

    const getTokenBalance = async (walletData,userData) => {
        let bal = await getBalanceOfToken(walletData?.networkId, walletData?.walletAddress, userData?.tokenWallets?.ethereum)
        props.setUserBalance(bal)
    }

    useEffect(() => {
        if (props.user?.user) {
            setUserData(props.user?.user)
        } 
    }, [props.user.user])

    const handleShow = () => setShow(true);

    const logout = async () => {
        // delete session and disconnect wallet 
        // update the profile with connected wallet null
        let payload = { "connectedWalletAddress": null }
        props.updateProfile(payload)
        await ENV.clearStorage()
        props.setUser(null)
        props.emptyError()
        window.location.replace('/sign-in')
    }

    const disConnectApp = async () => {
        // update the profile connected address with null
        let payload = { "connectedWalletAddress": null }
        props.updateProfile(payload)
    }
    return (
        <div className="d-flex justify-content-end top-head flex-wrap ">
            <div className="navbar-component">
                <Link className="btn-triage-div btn-triage me-4 bg-white text-decoration-none btn-header-deposit" to={kycStatus === 3 ? "/deposit" : '/kyc'}>
                    <span>
                        <span className="d-block d-xxl-none"><FontAwesomeIcon icon={faMoneyBillTransfer} /></span>
                        <span className="d-none d-xxl-block">Deposit</span>

                    </span>
                </Link>
            </div>
            {
                connectedWallet ?
                    <div >
                        <Dropdown className='cwallet-dropdown mb-3 mb-md-0'>
                            <Dropdown.Toggle id="dropdown-basic" className="btn btn-yellow">
                                <span className="wallet-dropdown">{formatAddress(connectedWallet)}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => { disConnectApp() }}>DISCONNECT</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    :
                    <div className="d-none"><button to="connect-wallet" className="btn-yellow ff-lato fw-900 transition btn-cnct-wall d-inline-block align-top btn-triage-div btn-triage me-4 " onClick={handleShow}><span>Connect Wallet</span></button></div>
            }
            <>
                {!connectedWallet &&
                    <ConnectWalletModal show={show} setShow={setShow} />
                }
            </>
            <div className="profile-btn">
                <Dropdown className="mb-lg-0 " >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {userData.firstName}
                        <img src={userData.profileImage ? userData.profileImage : Profile} alt="" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="p-0">
                        <Dropdown.Item onClick={() => { navigate(kycStatus === 3 ? "/my-account" : '/kyc')}}>My Account</Dropdown.Item>
                        <Dropdown.Item onClick={() => { logout() }}>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, { emptyError, updateProfile, setUser,getUser,beforeUser,setUserBalance })(NavbarPanel);

