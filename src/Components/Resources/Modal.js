import React from 'react';
import "./Modal.css"

const Modal = ({ isOpen, closeModal, hobby }) => {
    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{hobby.title}</h2>
                        <p>{hobby.content}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
