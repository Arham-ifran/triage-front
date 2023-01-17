import React, { useEffect, useState } from "react";
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import SubmitLoader from "../submitLoader/submitLoader";
import { Table, Nav, Tab, Container, Modal } from "react-bootstrap";
import moment from "moment";
import MessageAlert from "../messageAlert/messageAlert";
import { ENV } from '../../config/config'
import Upload from "../../assets/images/upload.svg";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { beforeHistory, listHistory } from './history.action'
import { cancelWireRequest, uploadReceipt, beforeWallets, updateUserStatus } from "../../redux/wallet/wallet.action"
import { connect } from 'react-redux';
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';





function HistoryDetail(props) {
    let userData = ENV.getUserKeys()

    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])
    const [uploadModal, setUploadModal] = useState(false)
    const [submitLoader, setSubmitLoader] = useState(false)
    const [messageAlert, setShowMessageAlert] = useState(false)
    const [pagination, setPagination] = useState({})
    const [receipt, setReceipt] = useState('')
    const [receiptData, setReceiptData] = useState()
    const [activeKey, setActiveKey] = useState('first')
    const [selectedHistoryId, setSelectedHistoryId] = useState('')
    const [open, setOpen] = useState(false)
    const [lightBoxImage, setLightBoxImage] = useState()
    const [type, setType] = useState(1)
    const [cancelRequestModal, setCancelRequestModal] = useState()

    useEffect(() => {
        let qs = ENV.objectToQueryString({ receiverId: userData._id })
        props.listHistory(qs)
    }, [])

    useEffect(() => {
        if (props.history.listHistoryAuth) {
            console.log("props.history.listHistory: ", props.history.listHistory)
            setData(props.history.listHistory.history)
            setPagination(props.history.listHistory.pagination)
            props.beforeHistory()
            setLoader(false)
        }
    }, [props.history.listHistoryAuth])

    useEffect(() => {
        if (props.wallets.receiptUploadAuth) {
            let index = data.findIndex(e => e._id === selectedHistoryId);
            data[index].receiptUploaded = true;
            props.beforeWallets()
            setReceipt('')
            setReceiptData('')
            setSelectedHistoryId('')
            setUploadModal(false)
            setShowMessageAlert(true)
            setSubmitLoader(false)
        }
    }, [props.wallets.receiptUploadAuth])



    const onPageChange = async (page) => {
        setLoader(true)
        const qs = ENV.objectToQueryString({ page, receiverId: userData._id, historyType: type,
        // receiverAddress: userData?.tokenWallets?.ethereum, senderAddress: userData?.tokenWallets?.ethereum
     })
        props.listHistory(qs)
    }

    const getData = (item) => {
        setLoader(true)
        setType(item)
        let qs = ENV.objectToQueryString({ receiverId: userData._id, historyType: item,
            //  receiverAddress: userData?.tokenWallets?.ethereum, senderAddress: userData?.tokenWallets?.ethereum
             })
        props.listHistory(qs)
    }

    const cancelRequest = (id) => {
        setCancelRequestModal(true)
        setSelectedHistoryId(id)
    }

    const deleteRequest = () => {
        props.cancelWireRequest(selectedHistoryId)
    }

    useEffect(() => {
        if (props.wallets.deleteWireRequest) {
            setCancelRequestModal(false)
            let filteredData = data.filter((item) => {
                if (item._id !== selectedHistoryId) {
                    return item;
                }
            })
            setData(filteredData)
        }
    }, [props.wallets.deleteWireRequest])


    const upload = () => {
        setSubmitLoader(true)
        let formdata = new FormData()
        formdata.append('historyId', selectedHistoryId)
        formdata.append('userId', userData._id)
        formdata.append('image', receiptData)
        formdata.append('receiptUploaded', true)
        props.uploadReceipt(formdata)
    }

    const onChange = (e) => {
        if (e.target.files[0]) {
            let newData = data
            newData[e.target.name] = URL.createObjectURL(e.target.files[0])
            setReceipt(newData.receipt)
            setReceiptData(e.target.files[0])
        }
    }

    const handleLightBox = (image) => {
        setOpen(!open)
        setLightBoxImage(image)
    }

    const handleUserStatus = (status, _id) => {
        let payload = {
            _id,
            status
        }
        props.updateUserStatus(payload)
    }

    useEffect(() => {
        if (props.wallets.withdrawStatusAuth) {
            const status = props.wallets.withdrawStatus
            let index = data.findIndex(e => e._id === selectedHistoryId)
            data[index].userStatus = status
        }
        props.beforeWallets()
        setSelectedHistoryId('')
    }, [props.wallets.withdrawStatusAuth])


    return (
        <div className="history-level wallet-details  p-0">
            {
                loader ?
                    <FullPageLoader />
                    :
                    <div className="history-level-details d-flex">
                        <Container className="p-0">
                            <div>
                                <div className="tabs-section">
                                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" activeKey={activeKey}>
                                        <div className="tabs-header mb-0">
                                            <Nav variant="pills" >
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first" onClick={() => { setActiveKey('first'); getData(1) }}>
                                                        Deposits
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second" onClick={() => { setActiveKey('second'); getData(2) }}>
                                                        Withdrawals
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="forth" onClick={() => { setActiveKey('forth'); getData(4) }}>
                                                        Referrals
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="fifth" onClick={() => { setActiveKey('fifth'); getData(5) }}>
                                                        Bonuses
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>
                                        <div>
                                            <div className="deposit-tab">
                                                <div className="history ps-0 pe-0">
                                                    <div className="table-responsive">
                                                        <Table striped bordered hover className="history-deposit-table">
                                                            <thead>
                                                                <tr>

                                                                    <th className="text-center">Date</th>

                                                                    {type === 1 &&
                                                                        <>
                                                                            <th>Amount Sent</th>
                                                                            <th>Amount Credited</th>
                                                                            <th>Payment Method</th>
                                                                            <th className="action-col text-center">Actions</th>
                                                                        </>
                                                                    }
                                                                    {/* {(type === 2 || type === 3) && */}
                                                                    {(type === 2) &&
                                                                        <>
                                                                            <th>Requested Amount Sent</th>
                                                                            <th>Receipt</th>
                                                                            <th>Actions</th>
                                                                        </>
                                                                    }
                                                                    {type === 4 &&
                                                                        <>
                                                                            <th>Referred User Email</th>
                                                                            <th>Amount Received</th>
                                                                            
                                                                        </>
                                                                    }
                                                                    {type === 5 &&
                                                                        <>
                                                                            <th>Promo</th>
                                                                            <th>Bonus Type</th>
                                                                            <th>Bonus</th>
                                                                        </>
                                                                    }
                                                                    {/* {type === 6 &&
                                                                <>
                                                                    <th>Locked Currency</th>
                                                                    <th>Currency</th>
                                                                    <th>Profit Type</th>
                                                                </>
                                                            } */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    data && data.length ? data.map((item, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td className="text-center">
                                                                                    {item.updatedAt ? moment(item.updatedAt).format('MMMM Do YYYY, h:mm:ss a') : 'N/A'}
                                                                                </td>
                                                                                {type === 1 &&
                                                                                    <>
                                                                                        <td>{item.depositAmountSent}</td>
                                                                                        <td>{item.depositAmountCredited}</td>
                                                                                        <td>{item?.depositType === 1 ? "Wire Request" : item?.depositType === 2 ? "Purchase with Fiat" : "N/A"}</td>
                                                                                        <td className="action-col text-center">
                                                                                        {item.depositType === 1 &&
                                                                                            <div className={item.receiptUploaded ? "d-flex justify-content-center" : "d-flex justify-content-between"}>
                                                                                                <button disabled={item.receiptUploaded} onClick={() => { setUploadModal(true); setSelectedHistoryId(item._id) }} className="badge actin-badge cursor-pointer"><span>{item.receiptUploaded ? "Uploaded" : "Upload"}</span></button>
                                                                                                {!item.receiptUploaded && <button onClick={() => cancelRequest(item._id)} className="badge actin-badge cursor-pointer"><span>Cancel</span></button>}
                                                                                            </div>}
                                                                                        </td>
                                                                                    </>
                                                                                }
                                                                                {/* {(type === 2 || type === 3) && */}
                                                                                {(type === 2) &&
                                                                                    <>
                                                                                        <td>{item.withdrawalAmount}</td>
                                                                                        <td>
                                                                                            {item.image ?
                                                                                                <div className="receipt-image-holder mx-auto">
                                                                                                    <img className="img-fluid cursor-pointer" src={item.image}
                                                                                                        onClick={() => handleLightBox(item.image)}
                                                                                                    />
                                                                                                </div>
                                                                                                :
                                                                                                "Not Uploaded Yet"
                                                                                            }
                                                                                        </td>
                                                                                        <td className="action-col text-center">
                                                                                            {item.image ?
                                                                                                <div className={`d-flex ${parseInt(item.userStatus) === 1 || parseInt(item.userStatus) === 2 ? "justify-content-center" : "justify-content-between"}`} >
                                                                                                    {parseInt(item.userStatus) !== 2 &&
                                                                                                        <button disabled={parseInt(item.userStatus) === 1} onClick={() => { handleUserStatus(1, item._id); setSelectedHistoryId(item._id) }} className="badge actin-badge cursor-pointer">
                                                                                                            <span>Received</span>
                                                                                                        </button>}
                                                                                                    {parseInt(item.userStatus) !== 1 &&
                                                                                                        <button disabled={parseInt(item.userStatus) === 2} onClick={() => { handleUserStatus(2, item._id);; setSelectedHistoryId(item._id) }} className="badge actin-badge cursor-pointer">
                                                                                                            <span>Not Received</span>
                                                                                                        </button>}
                                                                                                </div>
                                                                                                :
                                                                                                ""
                                                                                            }
                                                                                        </td>
                                                                                    </>
                                                                                }
                                                                                {type === 4 &&
                                                                                    <>
                                                                                        <td>{item.email}</td>
                                                                                        <td>{item.amountSent}</td>
                                                                                        
                                                                                    </>
                                                                                }
                                                                                {type === 5 &&
                                                                                    <>
                                                                                        <td>{item.promoCode ? item.promoCode : 'N/A'}</td>
                                                                                        <td>{item.promoCodeType === 1 ? 'Token' : 'Profit'}</td>
                                                                                        <td>{item.promoCodeType === 1 ? item.promoCodeBonus : item.promoCodeBonus + "%"}</td>
                                                                                    </>
                                                                                }
                                                                                {/* {type === 6 &&
                                                                            <>
                                                                                <td>{item.lockedCurrency}</td>
                                                                                <td>{item.savingsCurrency}</td>
                                                                                <td>{item.profitType === 1 ? 'in Locked Value' : item.profitType === 2 ? 'in Primary Token' : 'Available Profit'}</td>
                                                                            </>
                                                                        } */}
                                                                            </tr>
                                                                        )
                                                                    })
                                                                        : <tr>
                                                                            <td colSpan={type === 1 ? "5" : "4"}>
                                                                                <div className="not-found-alert d-flex justify-content-center align-items-center"><span>No Data To Show</span></div>
                                                                            </td>
                                                                        </tr>
                                                                }
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Container>
                                    <div>
                                        {
                                            pagination &&
                                            <Pagination
                                                className="m-3"
                                                defaultCurrent={1}
                                                pageSize // items per page
                                                current={pagination.page} // current active page
                                                total={pagination.pages} // total pages
                                                onChange={onPageChange}
                                                locale={localeInfo}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </Container>
                        <Modal show={uploadModal} onHide={() => setUploadModal(false)} className="deposit-request-modal" size="lg" backdrop="static" centered>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Please upload the transfer receipt
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="card d-flex justify-content-center align-items-center receipt-uploder">
                                    {receipt ?
                                        <div className=" pt-3 pb-3 card-img-uploader position-relative cursor-pointer">
                                            <img className="img-fluid" src={receipt} />
                                            <span className="icon-close" onClick={() => setReceipt()}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </div>
                                        :
                                        <div className="input-file cursor-pointer">
                                            <label>  <img className="img-fluid" src={Upload} />
                                                <input type="file" size="60" accept=".png,.jpeg,.jpg" name="receipt" onChange={onChange} />
                                            </label>
                                        </div>}
                                </div>
                            </Modal.Body>
                            <Modal.Footer className='justify-content-center' >
                                <div className="d-flex justify-content-center flex-wrap">

                                    <button onClick={() => setUploadModal(false)} className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 d-flex justify-content-center align-items-center"  >
                                        <span>CANCEL</span>
                                    </button>
                                    <button onClick={() => upload()} disabled={!receipt} className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 d-flex justify-content-center align-items-center"  >
                                        <span>CONFIRM</span>
                                        {submitLoader && <SubmitLoader />}
                                    </button>
                                </div>
                            </Modal.Footer>
                        </Modal>

                        <MessageAlert
                            type="success"
                            greeting="Great!"
                            description={"Receipt Uploaded Successfully Admin will review it and then tokens will be credited to your wallet."}
                            show={messageAlert}
                            onHide={() => setShowMessageAlert(false)}
                        />

                        <Modal show={cancelRequestModal} onHide={() => setCancelRequestModal(false)} className="deposit-request-modal" size="lg" backdrop="static" centered>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Confirm Request Deletion
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Are you sure you want to delete this wire request? </p>
                            </Modal.Body>
                            <Modal.Footer className='justify-content-center' >
                                <div className="d-flex justify-content-center flex-wrap">

                                    <button onClick={() => setCancelRequestModal(false)} className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 d-flex justify-content-center align-items-center"  >
                                        <span>CANCEL</span>
                                    </button>
                                    <button onClick={() => deleteRequest()} className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 d-flex justify-content-center align-items-center"  >
                                        <span>CONFIRM</span>
                                    </button>

                                </div>
                            </Modal.Footer>
                        </Modal>

                    </div>
            }
            {open && <Lightbox mainSrc={lightBoxImage} onCloseRequest={() => setOpen(!open)} />}
        </div>
    )
}

const mapStateToProps = state => ({
    history: state.history,
    error: state.error,
    wallets: state.wallets,
});

export default connect(mapStateToProps, { beforeHistory, listHistory, cancelWireRequest, uploadReceipt, beforeWallets, updateUserStatus })(HistoryDetail);