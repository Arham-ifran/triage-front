import React from 'react'

const TextInput = ({name, type, label, errorMsg, changeData, value}) => {
    return (
        <>
            <div>
                <label>{label}</label>
                <input placeholder="Enter Email" type={type} name={name} value={value} onChange={(e) => changeData(name, e.target.value)}/>
            </div>
            {errorMsg && <p className="error position-absolute">{errorMsg}</p>}            
        </>
    )
}

export default TextInput