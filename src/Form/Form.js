import { useState } from "react"
import "./Form.css";


const InputField = ({ type, value, label, onChange, errorMessage }) => {
    return (
        <div className="input-container">
            <div className="label-wrapper">
                <label className="input-label">{label}</label>
                <div className={`error-message remove-on-mobile ${errorMessage ? "show-error" : "hide-error"}`}></div>
            </div>
            <div className="input-wrapper">
                <input type={type} value={value} className={`inputField ${errorMessage ? 'has-error' : ''}`} onChange={onChange} />
                <div className={`error-message ${errorMessage ? "show-error" : "hide-error"}`}>{errorMessage ? errorMessage : ""}</div>
            </div>
        </div>
    )
}

const Form = ({ personData, updateData, closeModal }) => {
    const [formData, setFormData] = useState({
        name: personData.name || "", email: personData.email || "", phone: personData.phone || "", website: personData.website || ""
    })
    const [error, setError] = useState({
        name: "", email: "", phone: "", website: ""
    });

    const validator = (key, val) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (val === "") {

            setError(prev => {
                return { ...prev, [key]: "This field is required" }
            })
            return;
        } else if (key === "email" && !val.match(emailRegex)) {
            setError(prev => {
                return { ...prev, [key]: "Invalid email" }
            })
            return;
        } else {
            setError(prev => {
                return { ...prev, [key]: "" }
            })
        }
    }
    const onChange = (key, val) => {
        validator(key, val);

        setFormData(prev => {
            return {
                ...prev, [key]: val
            }
        })
    }

    const onsubmit = (e) => {
        e.preventDefault();

        // error validation
        for (const key in error) {
            if (error[key] !== "") {
                return false;
            }
        }

        updateData(personData.id, formData);
        closeModal();
    }

    return (
        <div >
            <form className="form" onSubmit={onsubmit}>
                <div className="fields-wrapper">
                    <InputField errorMessage={error.name} label="Name:" type="text" value={formData.name} onChange={(e) => onChange("name", e.target.value)} />
                    <InputField errorMessage={error.email} label="Email:" type="email" value={formData.email} onChange={(e) => onChange("email", e.target.value)} />
                    <InputField errorMessage={error.phone} label="Phone:" type="text" value={formData.phone} onChange={(e) => onChange("phone", e.target.value)} />
                    <InputField errorMessage={error.website} label="Website:" type="text" value={formData.website} onChange={(e) => onChange("website", e.target.value)} />
                </div>
                <div className="action-buttons">
                    <button type="submit" className="form-btn cancel-btn">Cancel</button>
                    <button type="submit" className="form-btn ok-btn">OK</button>
                </div>
            </form>
        </div>
    )
}

export default Form;