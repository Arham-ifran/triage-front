import React from "react";
import "./dashboard.css"
import { Table } from "react-bootstrap";

function Locked_Profit({ stats }) {
    return (
        <div className="available-profit">

            <div className="history p-3 ">
            {stats?.length > 0 ? <div className="table-responsive">
                <Table className="mb-0" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats?.length && stats.map(item => {
                            return <tr>
                                <td>{item?.depositedAmount}</td>
                                <td>{item?.totalToBeReceived}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div> :
                <div className="main-content ">
                    <strong className="">No Record Found</strong>
                </div>
                }
            </div>
        </div>
    )
}
export default Locked_Profit
