import React from "react";
import { Button, Modal } from "react-bootstrap";
import SubmitLoader from "../submitLoader/submitLoader";

function ConfirmationModal({ msg, title, action, show, setShow, loader }) {

    const handleClose = () => setShow(false);

    return (
        <Modal centered  backdrop="static"  className="triage-model" show={show} onHide={handleClose}>
            <Modal.Header className="align-items-baseline" closeButton>
            <h3>{title}</h3>
            </Modal.Header>
            <Modal.Body className="text-center"><h4>{msg}</h4></Modal.Body>
            <Modal.Footer className="align-items-center justify-content-center bg-black">
                <Button variant="secondary" className="btn-triage-div btn-triage" onClick={handleClose}>
                   <span>Cancel</span>
                </Button>
                <Button className=" d-flex justify-content-center align-items-center btn-triage-div btn-triage" onClick={() => {action()}}>
                   <span> Yes</span> {loader && <SubmitLoader />}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ConfirmationModal