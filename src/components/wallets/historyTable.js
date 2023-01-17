import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import "./wallets.css"

function Tabs_Table() {
    return (
        <div className="tabs-body-table">

            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Amount Sent</th>
                            <th>Date</th>
                            <th>Amount credited</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ligula nec</td>
                            <td>20 / 06 / 2022</td>
                            <td>Bignuiom trhkml</td>
                        </tr>
                        <tr>
                            <td>Ligula nec</td>
                            <td>20 / 06 / 2022</td>
                            <td>Bignuiom trhkml</td>
                        </tr>
                        <tr>
                            <td>Ligula nec</td>
                            <td>20 / 06 / 2022</td>
                            <td>Bignuiom trhkml</td>
                        </tr>
                        <tr>
                            <td>Ligula nec</td>
                            <td>20 / 06 / 2022</td>
                            <td>Bignuiom trhkml</td>
                        </tr>
                        <tr>
                            <td>Ligula nec</td>
                            <td>20 / 06 / 2022</td>
                            <td>Bignuiom trhkml</td>
                        </tr>

                    </tbody>
                </Table>
            </div>
        </div>

    )
}
export default Tabs_Table