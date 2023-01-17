import React, { useState } from 'react';
import "./toast.css"
import Toast from 'react-bootstrap/Toast';
import { Button } from 'react-bootstrap';

function ToastModal({ show, setShow, type, description }) {

    return (
        <div className='toast-modal ps-2'>
            <Toast show={show} onClose={() => setShow(false)}>    
                <Toast.Header className='justify-content-between align-items-baseline p-3 bg-success  error-msg'>
                   <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <h3>Great!</h3>
                </Toast.Header>
                <Toast.Body className='text-center bg-success  error-msg'>{description}</Toast.Body>
            </Toast>
        </div>
    );
}

export default ToastModal;