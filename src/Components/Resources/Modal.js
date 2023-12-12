import React from 'react';
import "./Modal.css"

const Modal = ({ isOpen, closeModal, hobby }) => {
    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{hobby}</h2>
                        <p>Modal text related to the selected hobby.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
