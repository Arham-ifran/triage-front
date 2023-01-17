import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({label, name, changeData, errorMsg, value,passwordStrengthMsg}) => {
    

    const [type, setType] = useState(true)

    return (
        <>
            <div>
                <span className="eye-icon" style={{bottom:"-3px"}} onClick={() => setType((prevVal => !prevVal))}>
                    {
                        type ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon  icon={faEye} onClick={() => setType(false)} />
                    }
                </span>
                <label>{label}</label>
                <input type={type ? "password" : "text"} name={name} placeholder="Enter Password" value={value} onChange={(e) => changeData(name, e.target.value)}/>
            </div>
            {errorMsg && <p className="error position-absolute">{errorMsg}</p>}
            {passwordStrengthMsg && <p className="error position-absolute">{passwordStrengthMsg}</p>}

            
        </>
    )
}

export default PasswordInput