import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./earnInterest.css"

const ProfitPlan = ({ data }) => {
    return (
        <div className="profit-plan p-0">
            <div className=" p-0 ">
                <div className="wallet-card w-100">
                    <div className="card-body">
                        <h3 className="text-white">Profit in {data?.selectedCurrency}</h3>
                    </div>
                    <hr></hr>
                    <div className="card-body pt-2">
                        <div className="d-flex justify-content-between mb-2 flex-wrap">
                            <div><span>Yearly profit percentage</span></div>
                            <div><span className="value">{data?.type}  {data?.profit}%</span></div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="card-body pb-4">
                        <div className="d-flex justify-content-between flex-wrap">
                            {
                                data.type !== "available" ?
                                    <>
                                        <div className="mb-2 mb-md-0"> <span>All together when plans ends</span></div>
                                        <div>
                                            {/* <span className="warning-circle">
                                                <FontAwesomeIcon className="exclamation-icon" icon={faExclamation} />
                                            </span> */}
                                        </div>
                                    </> : <div className="mb-2 mb-md-0"> <span>Available in your account daily</span></div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfitPlan 