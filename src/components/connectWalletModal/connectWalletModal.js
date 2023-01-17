import React from 'react'
import { connectMetamask } from "../../utils/web3";
import { updateProfile } from "../../redux/user/user.action"
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap';
import logoMetaMask from '../../assets/images/logo-meta-mask.svg';
import { Link, useLocation } from 'react-router-dom';

const ConnectWalletModal = (props) => {

    const location = useLocation();

    //connectToMetaMask
    const walletConnection = async () =>{
        const address = await connectMetamask();
        let payload = { "connectedWalletAddress": address}
        props.updateProfile(payload)
        handleClose()
    }

	const handleClose = () => props.setShow(false);

    return (
        <>  
            <Modal centered show={props.show} onHide={handleClose} className="laszlo-modal connect-wallet-modal ">
                <Modal.Body className="text-center">
                    <h3 className="mb-4 ff-lato fw-900">Connect your Wallet</h3>
                    <div className="wallet-icon-holder">
                    <Link className="d-inline-block align-top" to={`${location?.pathname}${location?.hash && location?.hash}`}>
                        <img className="d-inline-block align-top" src={logoMetaMask}  onClick={()=> walletConnection() } alt="meta Mask Logo" />
                    </Link>
                    </div>
                </Modal.Body>
            </Modal>
        </>  
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, { updateProfile })(ConnectWalletModal);