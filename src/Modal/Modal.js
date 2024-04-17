import React, { useEffect, useRef } from "react";
import Close from "../icons/Close";
import "./Modal.css";

const Modal = ({ header, children, closeButton }) => {
    const bodyElement = document.body;
    const modalRef = useRef();

    const closeModal = () => {
        modalRef.current.classList.add("closing");
        bodyElement.style.overflowY = "auto";
        bodyElement.style.paddingRight = "0px";
        closeButton();
    }

    useEffect(() => {
        bodyElement.style.overflowY = "hidden";
        bodyElement.style.paddingRight = "17px";
        modalRef.current.classList.remove("closing");
        // children.props.hello = "hello";
        console.log(children.props, "CHILDREN")

    }, [bodyElement.style])

    return (
        <>
            <div className="modal-mask" onClick={closeModal}></div>
            <div ref={modalRef} className="modal">
                <div className="header">
                    <div className="title">
                        {header}
                    </div>
                    <div className="close-button" onClick={closeModal}><Close /></div>
                </div>
                {React.cloneElement(children, { closeModal: closeModal })}
            </div>
        </>
    )
}

export default Modal;