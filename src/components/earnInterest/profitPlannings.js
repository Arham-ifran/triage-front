import React, { useState, useEffect } from "react";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import Icon from "../../assets/images/level-logo.svg";
import "./earnInterest.css";
import ProfitPlan from "./profitPlan";
import ReviewModal from "./reviewPlanModal";
import ConfirmationLockModal from "./confirmationLockModal";
import {
  getPlansProfit,
  beforePlansProfit,
} from "../../redux/dashboard/dashboard.action";
import { connect } from "react-redux";
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import { getBalanceOfToken } from "../../utils/web3";
import { ENV } from "../../config/config";
import {
  listLevels,
  beforeLevels,
  levelsInvestments,
} from "../accountLevel/accountLevel.action";
import {
  verifyPromoCode,
  beforePromoCode,
} from "../promoCode/promoCode.action";

const ProfitPlannings = (props) => {
  const {
    setStep,
    selectedPlanCriteria,
    selectedToken,
    showConfirmationModal,
    setShowConfirmationModal,
    setBonus,
    setPromoCodeUsed,
  } = props;
  const accountLevelsLimit = ENV.accountLevelsPointsLimit;
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [tokenBalance, setTokenBalance] = useState();
  const [profitPlans, setProfitPlans] = useState([]);
  const [fullPageLoader, setFullPageLoader] = useState(false);
  const [bronzeLogo, setBronzeLogo] = useState("");
  const [silverLogo, setSilverLogo] = useState("");
  const [userLevel, setUserLevel] = useState(0);
  const [userSubLevel, setUserSubLevel] = useState(0);
  const [goldLogo, setGoldLogo] = useState("");
  const [PlatinumLogo, setPlatinumLogo] = useState("");
  const [minpoints, setMinPoints] = useState({
    bronzeMinPoints: "",
    silverMinPoints: "",
    goldMinPoints: "",
    platinumMinPoints: "",
  });

  const [selectedProfitPlan, setSelectedProfitPlan] = useState(null);

  const [amount, setAmount] = useState();
  const [error, setError] = useState({});

  const [selectedCurrencyBal, setSelectedCurrencyBal] = useState(0);
  const [isLockedConfirmed, setIsLockedConfirmed] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeVerified, setPromoCodeVerified] = useState("");

  useEffect(() => {
    props.beforePlansProfit();
    getMaxBalance();
    props.listLevels();
    props.levelsInvestments(props?.user?.userBalance);
  }, []);

  useEffect(() => {
    if (props.user?.userBalance) {
      setTokenBalance(props.user?.userBalance);
    }
  }, [props.user.userBalance]);

  useEffect(() => {
    let profitrArray = [
      {
        type: "available",
        profit: selectedPlanCriteria.availableProfit,
        selectedCurrency: selectedToken.name,
        months: selectedPlanCriteria.months,
      },
      {
        type: "locked",
        profit: selectedPlanCriteria.lockedProfit,
        selectedCurrency: selectedToken.name,
        months: selectedPlanCriteria.months,
      },
    ];
    setProfitPlans(profitrArray);
  }, [selectedPlanCriteria]);

  useEffect(() => {
    if (props.accountLevel.minInvestmentAuth) {
      props.beforeLevels();
      const {
        bronzeMinInvestment,
        silverMinInvestment,
        goldMinInvestment,
        platinumMinInvestment,
        level,
        subLevel,
        timePeriods,
      } = props.accountLevel.accountsInvestments;
      setMinPoints({
        ...minpoints,
        bronzeMinPoints: bronzeMinInvestment,
        silverMinPoints: silverMinInvestment,
        goldMinPoints: goldMinInvestment,
        platinumMinPoints: platinumMinInvestment,
      });
      setUserLevel(level);
      setUserSubLevel(subLevel);
    }
  }, [props.accountLevel.minInvestmentAuth]);

  useEffect(() => {
    if (props.accountLevel.listLevelAuth) {
      props.beforeLevels();
      for (let i = 0; i < props.accountLevel.listLevel.length; i++) {
        if (props.accountLevel.listLevel[i].level === 1) {
          setBronzeLogo(props.accountLevel.listLevel[i].image);
        } else if (props.accountLevel.listLevel[i].level === 2) {
          setSilverLogo(props.accountLevel.listLevel[i].image);
        } else if (props.accountLevel.listLevel[i].level === 3) {
          setGoldLogo(props.accountLevel.listLevel[i].image);
        } else if (props.accountLevel.listLevel[i].level === 4) {
          setPlatinumLogo(props.accountLevel.listLevel[i].image);
        }
      }
    }
  }, [props.accountLevel.listLevelAuth]);

  useEffect(() => {
    if (showConfirmationModal) {
      setStep(4);
    }
  }, [showConfirmationModal]);

  // useEffect(() => {
  //     if(isLockedConfirmed){
  //         // setAmount(0)
  //         setStep(3)
  //         setIsLockedConfirmed(false)
  //         props.setIsLockedConfirmed(false)
  //     }
  // }, [isLockedConfirmed])

  const checkValidation = async () => {
    let validate = true;
    let err = {};
    // let bal = await getBalanceOfToken(selectedToken?.networkId, selectedToken?.walletAddress, props.user?.user?.tokenWallets?.ethereum)
    if (!selectedProfitPlan) {
      err["isSelected"] = "Please Select the Profit plan.";
      validate = false;
    } else if (amount <= 0 || !amount) {
      err["amount"] = "Amount is Required.";
      validate = false;
    } else if (amount < selectedProfitPlan?.minInvestment) {
      err[
        "amount"
      ] = `You must have to invest atleast ${selectedProfitPlan?.minInvestment} ${selectedProfitPlan?.selectedCurrencyName}.`;
      validate = false;
    } else if (props?.user?.userBalance < amount) {
      err["amount"] = `You dont have enough balance.`;
      validate = false;
    } else {
    }
    setError({ ...err });
    return validate;
  };

  const savePlan = async () => {
    let validate = await checkValidation();
    if (!validate) {
      console.log("Validation Failed");
    } else {
      setShowReceiptModal(true);
    }
  };

  const getMaxBalance = async () => {
    setSelectedCurrencyBal(props?.user?.userBalance);
  };

  const verifyPromoCode = (e) => {
    e.preventDefault();

    props.verifyPromoCode(promoCode);
  };

  useEffect(() => {
    if (props.promocodes.verifyPromoCodeAuth) {
      props.beforePromoCode();
      setPromoCodeVerified(props.promocodes.promoCode);
      let promoCodeVerified = props.promocodes.promoCode;

      setBonus(
        promoCodeVerified.PromoMatch === "true" &&
          promoCodeVerified.promo.codeType === 2
          ? promoCodeVerified.promo.bonus
          : ""
      );
      setPromoCodeUsed(promoCodeVerified?.promo?.title);
    }
  }, [props.promocodes.verifyPromoCodeAuth]);

  return (
    <div className="p-3 wallet-details w-100">
      <Container>
        <div className="profit-planning ">
          {showReceiptModal && (
            <ReviewModal
              bonus={
                promoCodeVerified.PromoMatch === "true" &&
                promoCodeVerified.promo.codeType === 2
                  ? promoCodeVerified.promo.bonus
                  : ""
              }
              show={showReceiptModal}
              onHide={() => setShowReceiptModal(false)}
              setShowConfirmationModal={setShowConfirmationModal}
              selectedProfitPlan={selectedProfitPlan}
              amount={amount}
              selectedToken={selectedToken}
              selectedPlanCriteria={selectedPlanCriteria}
            />
          )}

          {/* {
                        showConfirmationModal && 
                        <ConfirmationLockModal
                            // show={showConfirmationModal}
                            // onHide={() => setShowConfirmationModal(false)}
                            // selectedProfitPlan={selectedProfitPlan}
                            // amount={amount}
                            // setAmount={setAmount}
                            // setStep={setStep}
                            // selectedToken={selectedToken}
                            // selectedPlanCriteria={selectedPlanCriteria}
                            // isLockedConfirmed={isLockedConfirmed}
                            // setIsLockedConfirmed={setIsLockedConfirmed}
                        />
                    } */}

          <h2 className="mb-4">Profit planning</h2>
          <p>
            Choose the best paln that works for you . The higher your level on
            the platform the more profit you will get .
          </p>

          <div className="d-flex flex-wrap flex-md-nowrap align-items-center pb-5">
            <div className="me-2 mb-3 mb-md-0">
              <span className=" pin-circle bg-white">
                <img
                  src={
                    userLevel === 1
                      ? bronzeLogo
                      : userLevel === 2
                      ? silverLogo
                      : userLevel === 3
                      ? goldLogo
                      : userLevel === 4
                      ? PlatinumLogo
                      : Icon
                  }
                  alt=""
                />
              </span>
            </div>
            <div className="w-100">
              <div className="progress-level p-0 pt-3">
                <div className="d-flex justify-content-between flex-wrap">
                  <div>
                    {" "}
                    <strong className="ms-1">
                      {userLevel === 1
                        ? `Bronze Sub Level ${userSubLevel}`
                        : userLevel === 2
                        ? `Silver Sub Level ${userSubLevel}`
                        : userLevel === 3
                        ? `Gold Sub Level ${userSubLevel}`
                        : userLevel === 4
                        ? `Platinum Sub Level ${userSubLevel}`
                        : "Basic"}
                    </strong>
                  </div>
                  {/* <div> <strong className="text-primary">Get 15% on next Level</strong></div> */}
                </div>

                <div>
                  <ProgressBar
                    now={props?.user?.userBalance}
                    max={
                      userLevel === 1
                        ? minpoints.silverMinPoints
                        : userLevel === 2
                        ? minpoints.goldMinPoints
                        : userLevel === 3
                        ? minpoints.platinumMinPoints
                        : minpoints.bronzeMinPoints
                    }
                  />
                  <div className="d-flex justify-content-between  flex-wrap mb-3">
                    <div>
                      {" "}
                      <span>
                        You now have{" "}
                        {props?.user?.userBalance
                          ? props?.user?.userBalance
                          : 0}{" "}
                        points
                      </span>
                    </div>
                    {userLevel !== 4 && (
                      <div>
                        {" "}
                        <span>
                          To next level{" "}
                          {userLevel === 1
                            ? minpoints.silverMinPoints
                            : userLevel === 2
                            ? minpoints.goldMinPoints
                            : userLevel === 3
                            ? minpoints.platinumMinPoints
                            : minpoints.bronzeMinPoints}{" "}
                          points
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {fullPageLoader ? (
              <FullPageLoader />
            ) : (
              <Row>
                {profitPlans?.map((e) => {
                  return (
                    <Col xxl={6} xl={6} md={6} className="mb-3">
                      <div
                        className={
                          selectedProfitPlan?.type === e.type
                            ? "active-card"
                            : ""
                        }
                        onClick={() => {
                          setSelectedProfitPlan(e);
                          props?.setSelectedProfitPlan(e);
                        }}
                      >
                        <ProfitPlan data={e} selectedToken={selectedToken} />
                      </div>
                    </Col>
                  );
                })}
                {!profitPlans.length && <p>Profit is not avaiable yet.</p>}
              </Row>
            )}
          </div>
          {/* {
                        profitPlans.length ?
                            <div className="pt-5 mb-3">
                                <div className="input-div exchange-details">
                                    <input type="number" value={amount} onChange={(e) => { setAmount(e.target.value); props?.setAmount(e.target.value) }} />
                                    <div className="input-tag" onClick={() => { setAmount(selectedCurrencyBal); props?.setAmount(selectedCurrencyBal) }} >
                                        <span>Max</span>
                                    </div>
                                </div>
                            </div> : ''
                    }
                    {
                        error["isSelected"] && <small className="text-danger error">{error?.isSelected}</small>
                    }
                    {
                        error["amount"] && <p className="text-danger error">{error?.amount}</p>
                    } */}

          <Row>
            <Col xl={6}>
              <label className="text-white mb-0 ps-1">Amount</label>
              <div>
                {profitPlans.length ? (
                  <div className="">
                    <div className="input-div exchange-details">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          props?.setAmount(e.target.value);
                        }}
                      />
                      <div
                        className="input-tag"
                        onClick={() => {
                          setAmount(selectedCurrencyBal);
                          props?.setAmount(selectedCurrencyBal);
                        }}
                      >
                        <span>Max</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {error["isSelected"] && (
                  <small className="text-danger error">
                    {error?.isSelected}
                  </small>
                )}
                {error["amount"] && (
                  <p className="text-danger error">{error?.amount}</p>
                )}
              </div>
            </Col>
            <Col xl={6}>
              <Row>
                <label className="text-white">Promo Code</label>
                <Col xxl={8} xl={8} lg={8} md={8} sm={8} className="ps-2 pl-2">
                  {/* <label>Promo Code</label> */}
                  <div className="amount-input mb-2 mb-lg-0">
                    <input
                      type="text"
                      placeholder="Enter Promo Code"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoCodeVerified("");
                      }}
                    />
                  </div>
                  {/* {promoCodeVerified.success ? <span><label className="pt-2 text-white">Promo Code Added, Successfully.</label></span> : <span><label className="text-danger error">{promoCodeVerified.message}</label></span>} */}
                </Col>

                <Col
                  xxl={4}
                  xl={4}
                  lg={4}
                  md={4}
                  sm={4}
                  className="ps-2 pl-2 pl-md-0  "
                >
                  <button
                    onClick={(e) => verifyPromoCode(e)}
                    disabled={promoCode ? false : true}
                    className="btn-triage-div btn-triage w-100 apply-btn "
                  >
                    <span>Apply Code </span>
                  </button>
                </Col>
              </Row>
              {promoCodeVerified.PromoMatch === "true" &&
              promoCodeVerified.promo.codeType === 2 ? (
                <span>
                  <label className="success-text">
                    Promo Code Added, Successfully.
                  </label>
                </span>
              ) : promoCodeVerified.PromoMatch === "true" &&
                promoCodeVerified.promo.codeType === 1 ? (
                <span>
                  <label className="text-danger error ">
                    Oops! Invalid Promo Code
                  </label>
                </span>
              ) : promoCodeVerified.PromoMatch === "false" ? (
                <span>
                  <label className="text-danger error">
                    Oops! Invalid Promo Code
                  </label>
                </span>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </div>
      </Container>
      <Container>
        <div className="d-flex justify-content-end pt-4 flex-wrap">
          <button
            className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3"
            onClick={() => {
              setStep(2);
            }}
          >
            <span>Back</span>
          </button>
          <button
            className="btn-triage-div btn-triage mb-3 mb-md-0"
            disabled={selectedProfitPlan ? false : true}
            onClick={() => {
              savePlan();
            }}
          >
            <span>Next</span>
          </button>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  user: state.user,
  accountLevel: state.accountLevel,
  promocodes: state.promocodes,
});

export default connect(mapStateToProps, {
  getPlansProfit,
  beforePlansProfit,
  beforeLevels,
  listLevels,
  verifyPromoCode,
  beforePromoCode,
  levelsInvestments,
})(ProfitPlannings);
