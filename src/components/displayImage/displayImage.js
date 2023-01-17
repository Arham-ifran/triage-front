import { useState, useEffect } from "react";
import bannerImagePlaceholder from "../../assets/images/cover-photo.png"
import profileImagePlaceholder from "../../assets/images/dp.png"
import Level from "../../assets/images/level-logo.svg"
import { ENV } from '../../config/config'
import { connect } from 'react-redux';
import { useLocation } from "react-router-dom";
import { updateBanner, beforeUser, getUser } from '../../redux/user/user.action'
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
// import Camera from "../../assets/images/camera.png"


const DisplayImage = (props) => {

    const {kycApplied} = props;

    const user = ENV.getUserKeys()
    const [data, setData] = useState({})
    const [loader, setLoader] = useState(true)
    const storedData = ENV.getUserKeys()
    let location = useLocation();

    useEffect(() => {
        props.getUser(storedData._id)
    }, [])

    useEffect(() => {
        if (props.user.getUserAuth) {
            setLoader(false)
            setData(props.user.getUserData)
        } 
    }, [props.user.getUserAuth])

    useEffect(() => {
        if (props.user.updateBannerAuth) {
            setLoader(false)
            props.beforeUser()
        }
    }, [props.user.updateBannerAuth])

    const onChange = (e) => {
        if (e.target.files[0]) {
            let newData = data
            newData[e.target.name] = URL.createObjectURL(e.target.files[0])
            setData(newData)
            let formData = new FormData()
            formData.append(e.target.name, e.target.files[0])
            formData.append('_id', storedData._id)
            props.updateBanner(formData)
            setLoader(true)
        }
    }


    return (
        <>
            {
                loader ?
                    <FullPageLoader />
                    :
                    <>
                        <div className="d-flex justify-content-between align-items-start align-items-lg-center flex-column flex-lg-row mb-3">
                            <h2 className="mb-3 mb-lg-0 text-left">{location.pathname === '/kyc' ? 'KYC' : 'Account'}</h2>
                            <div>
                                {(kycApplied === "undefined" || kycApplied === "") && <span className="alert alert-warning d-inline-block align-top kyc-warning">In Order to use platform please apply for KYC first. </span>}
                                {kycApplied === 1 && <span className="alert alert-warning d-inline-block align-top kyc-warning">Please complete KYC request so you can use the system.</span>}
                                {kycApplied === 2 && <span className="alert alert-warning d-inline-block align-top kyc-warning">You already applied for KYC, Please wait for Admin approval.</span>}
                            </div>
                        </div>
                        
                        <div className="about-level">

                            <div className="position-relative profile-cover">

                                <div className="mb-4 input-file cover-uploader">
                                    <label> <div className="camera-circle">
                                        <FontAwesomeIcon className="text-white camera-icon" icon={faCamera} />
                                    </div>
                                        <input type="file" size="60" accept=".png,.jpeg,.jpg" onChange={onChange} name='bannerImage' />
                                    </label>
                                </div>
                            <div className=" cover"> <img  src={data.bannerImage ? data.bannerImage : bannerImagePlaceholder} alt="" /></div>
                                <div className="profile-photo">
                                    <img className="img-fluid" src={data.profileImage ? data.profileImage : profileImagePlaceholder} alt="" /></div>
                                <div className="level-img"><img className="img-fluid" src={Level} alt="" />
                                {/* <span className="d-block text-white text-center">Basic</span>  */}
                                </div>
                                <div className="profile-uploader">

                                    <label>  <div className="camera-circle-dp">
                                        <FontAwesomeIcon className="text-white camera-icon-dp" icon={faCamera} />
                                    </div>
                                        <input type="file" size="60" accept=".png,.jpeg,.jpg" onChange={onChange} name='profileImage' />
                                    </label> </div>
                            </div>
                            <div className="d-flex justify-content-between user-name align-items-center flex-wrap">
                                <div className="mb-3">
                                    <strong className="mb-2 mb-md-0 d-block">{props.firstName ? props.firstName : ''} {props.lastName ? props.lastName : ''}</strong>
                                    <span className="email-address">{props.email ? props.email : ''}</span>
                                </div>
                                {
                                    props.kycCheck === "verified" ?
                                        <div className="mb-3">
                                            <button className="btn-triage-div btn-triage">
                                                <span>{props.buttonText}</span>
                                            </button>
                                        </div>
                                    :
                                    <>
                                    {location.pathname === '/kyc' ?
                                        <div>
                                            <button className="btn-triage-div btn-triage" onClick={() => { props.togglKyc() }}>
                                                <span>{props.buttonText}</span>
                                            </button>
                                        </div>
                                        : ''}
                                    </>
                                }
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { updateBanner, beforeUser, getUser })(DisplayImage)