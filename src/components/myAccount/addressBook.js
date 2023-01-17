import React, { useState, useEffect } from "react";
import { faCheck, faEdit, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import Book from "../../assets/images/book.svg"
import "./myAccount.css"
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab'
import Crypto from "./crypto";
import Bank from "./bank";
import BankAccount from "./bank";
import ConfirmationModal from "./confirmationModal";
import MessageAlert from "../messageAlert/messageAlert";
import { getAddressList, beforeAddress, deleteAddress } from '../../redux/addressBook/addressBook.action'
import { connect } from 'react-redux'
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import { useLocation } from 'react-router-dom'
import { networks } from "../../utils/networks";
// Modal will show when user want to edit the address of type bank
const BankModal = (props) => {

    const [createSuccess, setCreateSuccess] = useState(false)
    const [showAlertMsgModal, setShowAlertMsgModal] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null)

    useEffect(() => {
        if (createSuccess) {
            setShowAlertMsgModal(true)
            props.onHide()
            setCreateSuccess(false)

        }
    }, [createSuccess])

    return (
        <div >
            <MessageAlert
                type="success"
                greeting="Great!"
                description={successMsg}
                show={showAlertMsgModal}
                onHide={setShowAlertMsgModal}
            />
            <Modal
                className="triage-model"
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Edit Address</h2>
                    </div>
                    <Bank formType="edit" dataObj={props.dataObj} setSuccess={setCreateSuccess} setSuccessMsg={setSuccessMsg} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

// Modal will show when user want to edit the address of type Crypto
const CryptoModal = (props) => {
    const [createSuccess, setCreateSuccess] = useState(false)
    const [showAlertMsgModal, setShowAlertMsgModal] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null)

    useEffect(() => {
        if (createSuccess) {
            setShowAlertMsgModal(true)
            props.onHide()
            setCreateSuccess(false)
        }
    }, [createSuccess])
    return (
        <div >
            <MessageAlert
                type="success"
                greeting="Great!"
                description={successMsg}
                show={showAlertMsgModal}
                onHide={setShowAlertMsgModal}
            />
            <Modal
                className="triage-model"
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton className="align-items-baseline">
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2>Edit Bank Details</h2>
                        <p className="mb-0">You can edit your bank details for withdrawals here.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between align-items-center">

                        {/* <h2>Edit Address</h2> */}
                    </div>
                    <Crypto formType="edit" dataObj={props.dataObj} setSuccess={setCreateSuccess} setSuccessMsg={setSuccessMsg} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

// Modal will show when user want to create the new address of type bank and crypto
const AddressFormModal = (props) => {
    const [createSuccess, setCreateSuccess] = useState(false)
    const [showAlertMsgModal, setShowAlertMsgModal] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null)

    useEffect(() => {
        if (createSuccess) {
            setShowAlertMsgModal(true)
            props.onHide()
            setCreateSuccess(false)
        }
    }, [createSuccess])

    return (
        <div >
            <MessageAlert
                type="success"
                greeting="Great!"
                description={successMsg}
                show={showAlertMsgModal}
                onHide={setShowAlertMsgModal}
            />
            <Modal
                className="triage-model"
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Header className="align-items-baseline" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2>Bank Detail</h2>
                        <p className="mb-0">Add bank details for withdrawals here.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="percent-records">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <div className="d-flex justify-content-center align-items-center">
                                {/* <div className="tab-div d-flex justify-content-between align-items-center  flex-wrap bg-transparent mb-0">
                                    <div className="tabs-header mb-0 p-0 bg-transparent">
                                        <h2 className="text-black">Bank</h2>
                                        <Nav variant="pills" >
                                        </Nav>
                                    </div>
                                </div> */}
                            </div>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Crypto formType="add" setSuccess={setCreateSuccess} setSuccessMsg={setSuccessMsg} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <BankAccount formType="add" setSuccess={setCreateSuccess} setSuccessMsg={setSuccessMsg} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

// Address Book to show address books list
const AddressBook = (props) => {

    const { setAddressForWithdrawal, addressForWithdrawal, setCryptoAddrAvailable, selectedCurrencyNetworkId } = props
    const location = useLocation()
    const pathname = location.pathname

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showBankModal, setShowBankModal] = useState(false);
    const [showCryptoModal, setShowCryptoModal] = useState(false);

    const [cryptoAddressList, setCryptoAddressList] = useState([])
    const [bankAddressList, setBankAddressList] = useState([])

    const [selectedAddress, setSelectedAddress] = useState({})

    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [showAlertMsgModal, setShowAlertMsgModal] = useState(false)

    const [deleteBtnLoader, setDeleteBtnLoader] = useState(false)

    const [successMsg, setSuccessMsg] = useState(null)
    const [fullPageLoader, setFullPageLoader] = useState(true)

    useEffect(() => {
        if (props.address?.deleteAddressAuth) {
            setDeleteBtnLoader(false)
            setShowConfirmationModal(false)
            setShowAlertMsgModal(true)
            setSuccessMsg(props.address?.message)
            props.beforeAddress()
            props.getAddressList()
        }
    }, [props.address?.deleteAddressAuth])

    const deleteAddress = () => {
        const _id = selectedAddress?._id
        setDeleteBtnLoader(true)
        props.beforeAddress()
        props.deleteAddress(_id)
    }
    useEffect(() => {
        props.beforeAddress()
        props.getAddressList()
    }, [])

    useEffect(() => {
        if (props.address.getAddressListAuth) {
            setFullPageLoader(false)
            setCryptoAddressList([...props.address?.cryptoAddressList])
            setBankAddressList([...props.address?.bankAddressList])
            if (props.address?.cryptoAddressList.length) {
                if (pathname.includes("/withdrawal")) {
                    setCryptoAddrAvailable(true)
                }
            }
        }
    }, [props.address.getAddressListAuth])


    //select the address to send the interest on that address
    const selectCryptoAddress = (addrObj) => {
        setAddressForWithdrawal(addrObj)
    }

    return (
        <>
            {fullPageLoader && <FullPageLoader />}
            <ConfirmationModal
                msg="Do you want to do this action ?"
                title="Delete Address"
                action={deleteAddress}
                show={showConfirmationModal}
                setShow={setShowConfirmationModal}
                loader={deleteBtnLoader}
                setLoader={setDeleteBtnLoader}
            />
            <MessageAlert
                type="success"
                greeting="Great!"
                description={successMsg}
                show={showAlertMsgModal}
                onHide={setShowAlertMsgModal}
            />
            {
                !pathname.includes("/withdrawal") ?
                    <div className="d-flex justify-content-center align-items-center">
                        {/* <div>
                            <button className="btn-triage-div btn-triage" onClick={() => { props.beforeAddress(); setShowCreateModal(true) }}>
                                <span>Create</span>
                            </button>
                            <AddressFormModal
                                show={showCreateModal}
                                onHide={() => setShowCreateModal(false)}
                            />
                        </div> */}
                    </div> : ''
            }
            {
                !cryptoAddressList.length && !bankAddressList.length ?
                    <div className="address-book d-flex justify-content-center align-items-center">
                        <div>
                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <img src={Book} alt="" />
                            </div>
                            <p className="text-center w-100">You have not added any bank details yet.
                                {/* please add details first. */}
                            </p>
                            <div className="d-flex justify-content-center align-items-center">
                                <div>
                                    <button className="btn-triage-div btn-triage" onClick={() => { props.beforeAddress(); setShowCreateModal(true) }}>
                                        <span>Create</span>
                                    </button>
                                    <AddressFormModal
                                        show={showCreateModal}
                                        onHide={() => setShowCreateModal(false)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    :
                    <>
                        {
                            cryptoAddressList.length ?
                                <div className="history mb-4 p-0 shadow-none p-3">
                                    {/* {
                                        pathname.includes("/withdrawal") ?
                                            <div className="d-flex justify-content-between align-items-baseline pt-4 pb-4 flex-wrap">
                                                <h2 className="m-0">Bank</h2>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <div>
                                                        <button className="btn-triage-div btn-triage" onClick={() => { props.beforeAddress(); setShowCreateModal(true) }}>
                                                            <span>Create</span>
                                                        </button>
                                                        <AddressFormModal
                                                            show={showCreateModal}
                                                            onHide={() => setShowCreateModal(false)}
                                                        />
                                                    </div>
                                                </div>
                                            </div> : <div className="d-flex justify-content-between align-items-baseline pt-4 pb-4 flex-wrap">
                                                <h2 className="m-0">Bank</h2>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <div>
                                                        <button className="btn-triage-div btn-triage" onClick={() => { props.beforeAddress(); setShowCreateModal(true) }}>
                                                            <span>Create</span>
                                                        </button>
                                                        <AddressFormModal
                                                            show={showCreateModal}
                                                            onHide={() => setShowCreateModal(false)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                    } */}
                                    <div className="table-responsive">
                                        <Table striped bordered hover>
                                            <CryptoModal
                                                show={showCryptoModal}
                                                dataObj={selectedAddress}
                                                onHide={() => setShowCryptoModal(false)}
                                            />
                                            <thead>
                                                <tr>
                                                    {
                                                        pathname.includes("/withdrawal") ?
                                                            <th>Select</th> : ''
                                                    }
                                                    <th>Label</th>
                                                    <th>Beneficiary Name</th>
                                                    <th>Beneficiary Bank Account</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            {
                                                pathname.includes("/withdrawal") ?
                                                    <tbody>
                                                        {
                                                            cryptoAddressList.map((e,) => {
                                                                const { type, label, beneficiaryName, bankAccount, network, _id } = e
                                                                if (type === "crypto" && selectedCurrencyNetworkId == network) {
                                                                    return (
                                                                        <tr key={_id} className={addressForWithdrawal === _id ? "selectedRow" : ''}>
                                                                            <td>{label}</td>
                                                                            <td>{beneficiaryName}</td>
                                                                            <td>{bankAccount}</td>
                                                                            <td className="text-center">
                                                                                <div className="d-flex justify-content-center align-items-center">
                                                                                    <button className="action-btn me-2" onClick={() => { setSelectedAddress(e); props.beforeAddress(); setShowCryptoModal(true); }}>
                                                                                        <span className="action-circle"><FontAwesomeIcon className="text-white" icon={faEdit} /></span>
                                                                                    </button>
                                                                                    <button className="action-btn me-2" onClick={() => { setSelectedAddress(e); setShowConfirmationModal(true) }}>
                                                                                        <span className="action-circle"><FontAwesomeIcon className="text-white" icon={faTrash} /></span>
                                                                                    </button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </tbody> :
                                                    <tbody>
                                                        {
                                                            cryptoAddressList.map((e,) => {
                                                                const { type, label, beneficiaryName, bankAccount, address, network, _id } = e
                                                                if (type === "crypto") {
                                                                    return (
                                                                        <tr key={_id} className={addressForWithdrawal === _id ? "selectedRow" : ''}>
                                                                            <td>{label}</td>
                                                                            <td>{beneficiaryName}</td>
                                                                            <td>{bankAccount}</td>
                                                                            <td>
                                                                                <div className="d-flex justify-content-center">
                                                                                    <button className="action-btn me-2" onClick={() => { setSelectedAddress(e); props.beforeAddress(); setShowCryptoModal(true); }}>
                                                                                        <span className="action-circle"><FontAwesomeIcon className="text-white" icon={faEdit} /></span>
                                                                                    </button>
                                                                                    <button className="action-btn me-2" onClick={() => { setSelectedAddress(e); setShowConfirmationModal(true) }}>
                                                                                        <span className="action-circle"><FontAwesomeIcon className="text-white" icon={faTrash} /></span>
                                                                                    </button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </tbody>
                                            }
                                        </Table>
                                    </div>
                                </div> : ''
                        }
                        {/* {
                            !pathname.includes("/withdrawal") ?
                            <div className="d-flex justify-content-center align-items-center">
                                <div>
                                    <button className="btn-triage-div btn-triage" onClick={() => { props.beforeAddress(); setShowCreateModal(true) }}>
                                        <span>Create</span>
                                    </button>
                                    <AddressFormModal
                                        show={showCreateModal}
                                        onHide={() => setShowCreateModal(false)}
                                    />
                                </div>
                            </div> : ''
                        } */}
                        {/* {
                            bankAddressList.length &&
                            <div className="history bank">
                                <h2>Bank</h2>
                                <div className="table-responsive">
                                    <Table striped bordered hover>
                                        <BankModal
                                            show={showBankModal}
                                            dataObj={selectedAddress}
                                            onHide={() => setShowBankModal(false)}
                                        />
                                        <thead>
                                            <tr>
                                                <th>Lable</th>
                                                <th>Coin</th>
                                                <th>Beneficiary Name</th>
                                                <th>Beneficiary Address</th>
                                                <th>Country</th>
                                                <th>Beneficiary Bank Name</th>
                                                <th>Beneficiary Bank Address</th>
                                                <th>Beneficiary Bank Account</th>
                                                <th>BIC/SWIFT</th>
                                                <th>Comments</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                bankAddressList.map((e) => {
                                                    const { type, _id, beneficiaryAddress, country, bankName, bankAddress, bankAccount, bic_swift, comment, beneficiaryName, coin, label } = e
                                                    if (type === "bank") {
                                                        return (
                                                            <tr>
                                                                <td>{label}</td>
                                                                <td>{coin}</td>
                                                                <td>{beneficiaryName}</td>
                                                                <td>{beneficiaryAddress}</td>
                                                                <td>{country}</td>
                                                                <td>{bankName}</td>
                                                                <td>{bankAddress}</td>
                                                                <td>{bankAccount}</td>
                                                                <td>{bic_swift}</td>
                                                                <td>{comment}</td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div>
                                                                            <button className="action-btn" onClick={() => { setSelectedAddress(e); props.beforeAddress(); setShowBankModal(true); }}>
                                                                                <span className="action-circle">
                                                                                    <FontAwesomeIcon className="text-white" icon={
                                                                                        faEdit
                                                                                    } />
                                                                                </span>
                                                                            </button>
                                                                            <button className="action-btn" onClick={() => { setSelectedAddress(e); setShowConfirmationModal(true) }}>
                                                                                <span className="action-circle"><FontAwesomeIcon className="text-white" icon={faTrash} /></span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        } */}
                    </>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    address: state.address
})

export default connect(mapStateToProps, { getAddressList, beforeAddress, deleteAddress })(AddressBook)