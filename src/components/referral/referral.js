import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Profile from "../../assets/images/profile.png"
import UserICon from "../../assets/images/user.svg"
import Plus from "../../assets/images/Icon feather-plus-circle.svg"
import Minus from "../../assets/images/Icon feather-minus-circle.svg"
import Copy from "../../assets/images/copy-text.svg"
import UserDp from "../../assets/images/dp.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowDownLong, faExclamation } from '@fortawesome/free-solid-svg-icons'
import { getUserReferrals } from "../../redux/user/user.action";
import { ENV } from '../../config/config'
import "./referral.css"
import Navbar from "../shared/navbar/navbar";
import { connect } from 'react-redux';
import moment from 'moment';
import { copyToClipBoard } from '../../utils/helperFunctions'



function Referral(props) {

    let userData = ENV.getUserKeys()
    const [referrals, setReferrals] = useState(null)
    const [totalReferralBonus, setTotalReferralBonus] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    const [scale, setScale] = useState(0.5);

    let referralURL = `${ENV.baseUrl}/sign-up?referralKey=${userData.referralKey}`

    const onCopyText = (url) => {
        copyToClipBoard(url)
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    useEffect(() => {
        let userId = userData._id
        props.getUserReferrals(userId)
        setProfileImage(userData.profileImage)
    }, [])

    useEffect(() => {
        if (props.user.userReferralAuth) {
            const { userReferrals, referralBonus } = props.user.referrals;
            setReferrals(userReferrals)
            setTotalReferralBonus(referralBonus);
        }
    }, [props.user.userReferralAuth])
    
    return (
        <div className="referral wallet-details p-3">
            <div className="refferal-details d-flex">
                <Container>
                    {/* <div className="d-flex justify-content-end top-head flex-wrap pt-75">
                        <Navbar />
                    </div> */}
                    <div>
                        <h2>Referral</h2>
                        <div className="referral-link">
                            <div className="user-details">

                                <img className="img-fluid" src={profileImage ? profileImage : UserDp} alt="" />

                                {/* <div> */}
                                {/* <strong className="d-blcok text-center">Your referral information</strong> */}
                                {/* </div> */}

                            </div>

                            <div className="header-top">
                                <div className="d-flex justify-content-between flex-wrap">
                                    <div>
                                        <p>Referral Bonus received</p>
                                        <div className="d-flex">
                                            <strong>{parseFloat(totalReferralBonus.toFixed(4))}</strong>
                                            {/* <strong>{userData.referralBonus ? userData.referralBonus : 0}</strong> */}
                                            {/* <span>BTC</span> */}
                                        </div>
                                    </div>
                                    <div>
                                        <p>Your referrals</p>
                                        <div className="d-flex">
                                            <strong>{referrals ? referrals.length : 0}</strong>
                                            <span>Users</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="body-content">

                            </div>
                            <div className="d-flex justify-content-center align-items-center">        <strong className="d-blcok text-center text-white your-referral">Your referral information</strong></div>
                            <div className="bottom-footer">
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="mb-3 mb-md-0">
                                        <strong>Your referral link</strong>
                                        <span className="text-white link-url">{referralURL}</span>
                                    </div>
                                    <span className="cursor-pointer position-relative" onClick={() => onCopyText(referralURL)}>
                                        <img src={Copy} className="d-inline-block" />{isCopied && <span className="copy-popup-text" >Copied!</span>}
                                    </span>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Referral Tree</h2>

                        <div className="referral-tree flex-column">
                            <div className="d-flex justify-content-center add-items">
                                <div className="d-flex justify-content-center align-items-center">
                                    <a style={{ cursor: "pointer" }} className="me-3">
                                        <img src={Plus} alt="" onClick={() => setScale(scale < 1 ? (scale + 0.1) : scale)} />
                                    </a>
                                    <a style={{ cursor: "pointer" }} className="text-center">
                                        <img src={Minus} alt="" onClick={() => setScale(scale > 0.4 ? (scale - 0.1) : scale)} />
                                    </a>
                                </div>
                            </div>
                            <div className="referrals-holder" style={{ transform: `scale(${scale})` }}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="text-center mb-2 user-profile">
                                        <img src={(profileImage) ? (profileImage) : UserICon} alt="" />
                                    </div>
                                </div>


                                <div className="line-arrow-holder text-center">
                                    <strong>{userData.email}</strong>
                                    <span className="mb-3">{moment(userData.createdAt).format('DD MMM YYYY')}</span>
                                </div>
                                <div className="referral-tree-structure">
                                    <div className="d-flex text-center justify-content-center align-items-center">
                                        {referrals && referrals.length ? referrals.map((referral, index) => (
                                            <div className="root-line">

                                                <div className="d-flex justify-content-center align-items-center">
                                                    <div className="text-center mb-2 tree-profile">
                                                        <img src={(referral.profileImage) ? (referral.profileImage) : UserICon} alt="" />
                                                    </div>
                                                </div>

                                                <strong className="text-white d-block">{referral.email}</strong>
                                                <div className="d-flex justify-content-between">
                                                    <div><span className="text-center text-white d-block mb-0">Date:</span> <span className="text-center mb-3 text-white">{moment(referral.createdAt).format('DD MMM YYYY')}</span></div>
                                                    <div className="recieved-bonus"><span className="text-center d-block mb-0 success-value">TRI {referral.referralBonus ? referral.referralBonus : 0}</span> <span className="text-center mb-3 text-white"> Referral bonus received</span></div>
                                                </div>
                                            </div>
                                        )) : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div >
        </div >
    )
}

const mapStateToProps = state => ({
    user: state.user,
    error: state.error
});

export default connect(mapStateToProps, { getUserReferrals })(Referral);