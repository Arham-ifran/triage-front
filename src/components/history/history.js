import { Container } from "react-bootstrap";
import Navbar from "../shared/navbar/navbar";
import HistoryDetail from "./historyDetail";
import "./history.css"


function History_side() {

    return (
        <div className="history-level wallet-details p-3">
            <div className="history-level-details d-flex">
                <Container>
                    {/* <div className="d-flex justify-content-end top-head flex-wrap pt-75">
                        <Navbar />
                    </div> */}
                    <div>
                        <h2>History</h2>
                        <HistoryDetail />
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default History_side;