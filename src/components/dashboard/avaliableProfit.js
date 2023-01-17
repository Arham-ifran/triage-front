import React from "react";
import "./dashboard.css"
import { Table } from "react-bootstrap";

function Availabe_Profit({ stats }) {
    return (
        <div className="available-profit">

            <div className="history p-3 ">
                {stats?.length > 0 ? <div className="table-responsive">
                    <Table className="mb-0" striped bordered hover>
                        <thead>
                            <tr>
                                <th>Deposited Amount</th>
                                <th>Daily Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.length && stats.map(item => {
                                return <tr>
                                    <td>{item?.depositedAmount}</td>
                                    <td>{item?.availableProfit.toFixed(4)}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                </div> :
                    <div className="main-content ">
                        <strong className="">No Record Found</strong>
                    </div>}
            </div>
        </div>
    )
}
export default Availabe_Profit
