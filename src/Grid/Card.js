import { useState } from "react";
import Delete from "../icons/Delete";
import Edit from "../icons/Edit";
import Email from "../icons/Email";
import Heart from "../icons/Heart";
import Phone from "../icons/Phone";
import Website from "../icons/Website";
import "./Grid.css";
import ReactDOM from "react-dom";
import Form from "../Form/Form";
import Modal from "../Modal/Modal";


const Card = ({ personData, deleteData, updateData }) => {
    const [btnState, setBtnState] = useState({ like: false, edit: null });

    const closeModal = () => {
        setBtnState(prev => {
            return { ...prev, edit: null }
        })
    }
    return (
        <>
            <div className="card-holder">
                <div className="card-container">
                    <div className="card-image-container">
                        <div className="card-image">
                            <img src="https://avatars.dicebear.com/v2/avataaars/Samantha.svg?options[mood][]=happy" alt="img" />
                        </div>
                    </div>
                    <div className="card-content">
                        <h3 className="userName">
                            {personData.name}
                        </h3>
                        <div className="d-flex d-justify-left">
                            <Email />
                            <div className="text-padding">{personData.email}</div>
                        </div>
                        <div className="d-flex d-justify-left">
                            <Phone />
                            <div className="text-padding">{personData.phone}</div>
                        </div>
                        <div className="d-flex d-justify-left">
                            <Website />
                            <div className="text-padding">http://{personData.website}</div>
                        </div>
                    </div>
                    <div className="card-buttons d-flex d-align-center d-justify-spaceAround">
                        <button className="action-btn" onClick={() => setBtnState((prev) => {
                            return { ...prev, like: !prev.like }
                        })}>
                            <Heart color="red" isFilled={btnState.like} />
                        </button>
                        <button className="action-btn edit-btn" onClick={() => {
                            setBtnState(prev => {
                                return { ...prev, edit: personData.id }
                            })
                        }}>
                            <Edit />
                        </button>
                        <button className="action-btn delete-btn" onClick={() => { setBtnState(prev => prev); deleteData(personData.id) }}>
                            <Delete />
                        </button>
                    </div>
                </div>
                {btnState.edit === personData.id &&
                    ReactDOM.createPortal(
                        <Modal header="Basic Modal" closeButton={closeModal}>
                            <Form personData={personData} updateData={updateData} />
                        </Modal>
                        , document.body)
                }
            </div>
        </>
    )
}

export default Card;

