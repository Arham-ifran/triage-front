import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./earnInterest.css"
import SavingPlan from "./savingPlan";
import { connect } from 'react-redux'
import { getSavingPlans,beforeSavingPlans } from '../../redux/dashboard/dashboard.action'
import { beforeLevels, levelsInvestments } from '../accountLevel/accountLevel.action'
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import {ENV} from "../../config/config"

const LockPeriod = (props) => {
    const { setStep } = props
    const [savingPlans, setSavingPlans] = useState(null)
    const [fullPageLoader, setFullPageLoader] = useState(true)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [criteriaId, setCriteriaId] = useState(null)


    useEffect(() => {
            props.levelsInvestments(props?.user?.userBalance)
    }, [])

    useEffect(() => {
        if (props.accountLevel.minInvestmentAuth) {
            props.beforeLevels();
            setFullPageLoader(false)
            const { userCriteria } = props.accountLevel.accountsInvestments 
            setCriteriaId(userCriteria._id)
            setSavingPlans(userCriteria.profitInMonths)
        }
    }, [props.accountLevel.minInvestmentAuth])

    

    return (
        <div className="lock-period wallet-details p-3">
            <Container >
                <h2 className="mb-4">Choose preferable lock period</h2>
                <div>
                    {
                        fullPageLoader ?
                            <FullPageLoader /> :
                            <Row >
                                {
                                    !savingPlans.length &&
                                    <div className="d-flex justify-content-center not-available align-items-center">
                                        <p className="text-white">No Plans Available</p>
                                    </div>

                                }
                                {
                                    savingPlans?.map((e) => {
                                        e._id = criteriaId
                                        return (
                                            <Col xxl={3} xl={4} md={6} className="mb-4">
                                                <div className={`wallet-card-div ${e.months == selectedPlan?.months ? "active-card" : ""}`} 
                                                onClick={
                                                    () => { setSelectedPlan(e);  props.setSelectedPlanCriteria(e) }
                                                 } >
                                                    <SavingPlan data={e} selectedToken={props?.selectedToken} />
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                    }
                </div>

            </Container>
            <Container>
                <div className="d-flex justify-content-end pt-4 flex-wrap flex-sm-nowrap">
                    {/* <button className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3" ><span>Deposit</span></button> */}
                    <button className="btn-triage-div btn-triage me-0 mb-3 mb-md-0 me-sm-3 " onClick={() => setStep(1)}><span>Back</span></button>
                    <button className="btn-triage-div btn-triage mb-3 mb-md-0 ms-1 " onClick={() => setStep(3)} disabled={selectedPlan ? false : true}><span>Next</span></button>
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    dashboard: state.dashboard,
    user: state.user,
    accountLevel: state.accountLevel
})

export default connect(mapStateToProps, { getSavingPlans,beforeSavingPlans,beforeLevels, levelsInvestments })(LockPeriod)