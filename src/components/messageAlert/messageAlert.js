import Button from 'react-bootstrap/Button';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { render } from '@testing-library/react';
import "./messageAlert.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCross, faExclamationTriangle, faTicket, faXmark } from '@fortawesome/free-solid-svg-icons';

function MessageAlert(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='alert-modal'
            backdrop="static"
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className='p-0'>
                <div className='d-flex justify-content-center align-items-center success-alert'>
                    <span className='alert-circle-icon'>
                        {
                            props?.type === "success" ?  
                            <FontAwesomeIcon className='text-white alerting-icon' icon={faCheck} /> : 
                            props?.type === "error" ?
                            <FontAwesomeIcon className=' alerting-icon-warning' icon={faExclamationTriangle} /> : 
                            props?.type === "warning" ?
                            <FontAwesomeIcon className='alerting-icon-cross' icon={faXmark} /> : ""
                        }
                    </span>
                </div>
                <div className='modal-text'>
                    <div>
                        <h4 className='text-center'>{props?.greeting}</h4>
                        <p>{props?.description}</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-triage-div btn-triage' onClick={() => props.onHide(false)}><span>Close</span></Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MessageAlert