import { useState } from "react";
import BottomIcon from "../../assets/images/card-bottom.svg"
import React from "react";

function CardDetails(props) {
    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };

    return (
        <div
            className={isActive ? 'wallet-card ' : null}
        >
            <div className="bottom-icon transition" onClick={toggleClass}  >
                <img style={{ cursor: "pointer" }} src={BottomIcon} alt="" />
            </div>
        </div>
    );
}
export default CardDetails