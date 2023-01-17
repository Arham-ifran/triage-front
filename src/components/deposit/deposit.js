import React, { useState, useEffect } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import Copy from "../../assets/images/copy.svg";
import BottomIcon from "../../assets/images/arrow-down.svg";
import ArrowUp from "../../assets/images/arrow-up.svg";
import "../wallets/wallets.css";
import "./deposit.css";
import Select from "react-select";
import { connect } from "react-redux";
import {
  getWalletLists,
  beforeWallets,
  createPayment,
  createWireRequest,
} from "../../redux/wallet/wallet.action";
import networks from "../../config/networks";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ConnectWalletModal from "../connectWalletModal/connectWalletModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import SubmitLoader from "../submitLoader/submitLoader";
import CurrencyComparison from "../currencyComparison/currencyComparison";
import Navbar from "../shared/navbar/navbar";
import {
  verifyPromoCode,
  beforePromoCode,
} from "../promoCode/promoCode.action";
import {
  getSettings,
  beforeSettings,
} from "../../redux/settings/settings.action";
import { useParams, useNavigate } from "react-router-dom";
import { ENV } from "../../config/config";
import BankDetails from "./BankDetails";
const paymentOpt = [
  { value: 1, label: "Purchase via wire transfer" },
  // { value: 2, label: 'Transfer With Fiat' },
];

function Deposit(props) {
  const { currencyParam } = useParams();
  const navigate = useNavigate();
  let userData = ENV.getUserKeys();

  const [paymentOptions, setPaymentOptions] = useState([...paymentOpt]);
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0]); //1-transfer token, 2-wire transfer
  const [fullPageLoader, setFullPageLoader] = useState(true);
  const [wallets, setWallets] = useState([]);
  const [currienciesOptions, setCurrenciesOptions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [loader, setLoader] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [amountToPay, setAmountToPay] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [show, setShow] = useState(false);
  const [promoCodeVerified, setPromoCodeVerified] = useState("");
  const [validation, setValidation] = useState(false);
  const [referrerPercentValue, setReferrerPercentValue] = useState("");
  const [msg, setMsg] = useState("");

  const [requestModal, setRequestModal] = useState(false);
  const [bankDetailsModal, setBankDetailsModal] = useState(false);
  const [wireRequestLength, setWireRequestLength] = useState(0);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    props.beforeWallets();
    props.getWalletLists();
    props.getSettings();
  }, []);

  useEffect(() => {
    if (props.settings.settingsAuth) {
      const { referrarPercentage } = props.settings.settings;
      setReferrerPercentValue(referrarPercentage);
      props.beforeSettings();
    }
  }, [props.settings.settingsAuth]);

  useEffect(() => {
    if (props.wallets.getWalletsAuth) {
      setFullPageLoader(false);
      setWallets(props.wallets.wallets);
      setWireRequestLength(props.wallets.wireRequests);
      // managing wallet array
      manageCurrenciesOptions(props.wallets.wallets);
    }
  }, [props.wallets.getWalletsAuth]);

  const manageCurrenciesOptions = (walletsArray) => {
    const arrayObj = walletsArray.map((e) => {
      return {
        label: (
          <span>
            <img src={e.logo} alt="" />
            {e.symbol}
          </span>
        ),
        value: e.symbol,
        logo: e.logo,
        networkId: e.networkId,
        qrCode: e.qrCode,
        walletAddress: e.walletAddress,
        id: e._id,
        type: e.type,
      };
    });
    setCurrenciesOptions([...arrayObj]);
    let currency = arrayObj[0];
    if (currencyParam) {
      currency = arrayObj.filter((e) => {
        if (e.value == currencyParam) {
          return e;
        }
      });
      currency = currency[0];
    }

    setSelectedCurrency({ ...currency }); // set the first one as a default currencies
    manageNetwork({ ...currency });
    managePaymentOpts(currency);
  };

  const managePaymentOpts = (selectedCurrency) => {
    // add more payment option if user select the triage default token
    if (selectedCurrency.type === 1) {
      setPaymentOptions([
        ...paymentOpt,
        { value: 2, label: "Purchase with Fiat" },
      ]);
    } else if (selectedCurrency.type === 2) {
      setPaymentOptions([...paymentOpt]);
      paymentMethodChangeHandler(1);
    } else if (selectedCurrency.type === 3) {
      setPaymentOptions([...paymentOpt]);
      paymentMethodChangeHandler(1);
    } else {
    }
  };

  const changeCurrencyHandler = (currency) => {
    navigate(`/deposit/${currency.value}`);
    setSelectedCurrency({ ...currency });
    manageNetwork(currency);
    managePaymentOpts(currency);
  };

  const manageNetwork = (selectedCurrency) => {
    // every currency should have one network
    const network = networks.filter(
      (e) => e.value === selectedCurrency?.networkId
    );
    setSelectedNetwork({ ...network[0] });
  };

  const changeNetworkHandler = (network) => {
    setSelectedNetwork({ ...network });
  };

  // managing the information div will remove from here
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  // end

  const paymentMethodChangeHandler = (value) => {
    const methods = paymentOptions.filter((e) => e?.value === value);
    setPaymentMethod({ ...methods[0] });
  };

  // const handleShow = () => setShow(true);

  const payNow = (e) => {
    e?.preventDefault();

    // validation check on amount which should not be 0

    // // check whether the wallet is connected then send the connected wallet address in payment payload

    setLoader(true);
    let payload = {
      amountPaid: amountToPay,
      userId: userData._id,
      tokenName: selectedCurrency?.value,
      tokenId: selectedCurrency?.id,
      tokenAddress: selectedCurrency?.walletAddress,
      referreralId: userData.refferedBy && userData.refferedBy,
      referrerPercent: (referrerPercentValue * amountToPay) / 100,
    };
    if (
      promoCodeVerified.PromoMatch === "true" &&
      promoCodeVerified.promo.codeType === 1
    ) {
      payload.promoCodeId = promoCodeVerified.promo._id;
    }
    props.createPayment(payload);
  };

  const tokenWallet = () => {
    // return wallet address according to the token network, if it is from eth it will return the wallet of ethereum where it will return the token
    if (selectedCurrency?.networkId === 5) {
      //for goerli
      return {
        walletAddress: props.user?.user?.tokenWallets?.ethereum,
        qrCode: props.user?.user?.tokenWallets?.ethereumQR,
      };
    } else if (selectedCurrency?.networkId === 56) {
      //for binance
      return {
        walletAddress: props.user?.user?.tokenWallets?.ethereum,
        qrCode: props.user?.user?.tokenWallets?.ethereumQR,
      };
    } else if (selectedCurrency?.networkId === 97) {
      //for binance
      return {
        walletAddress: props.user?.user?.tokenWallets?.ethereum,
        qrCode: props.user?.user?.tokenWallets?.ethereumQR,
      };
    } else if (selectedCurrency?.networkId === 1) {
      //for ethereum mainnet
      return {
        walletAddress: props.user?.user?.tokenWallets?.ethereum,
        qrCode: props.user?.user?.tokenWallets?.ethereumQR,
      };
    } else {
    }
  };

  const verifyPromoCode = (e) => {
    e.preventDefault();

    props.verifyPromoCode(promoCode);
  };

  useEffect(() => {
    if (props.promocodes.verifyPromoCodeAuth) {
      props.beforePromoCode();
      setPromoCodeVerified(props.promocodes.promoCode);
    }
  }, [props.promocodes.verifyPromoCodeAuth]);

  const createRequest = (e) => {
    e?.preventDefault();
    setRequestModal(true);
  };

  const handleWireRequest = () => {
    let payload = {
      amountPaid: amountToPay,
      userId: userData._id,
    };
    if (
      promoCodeVerified.PromoMatch === "true" &&
      promoCodeVerified.promo.codeType === 1
    ) {
      payload.promoCodeId = promoCodeVerified.promo._id;
    }
    if (userData?.refferedBy) {
      payload.referralId = userData.refferedBy;
      payload.referrerPercent = (referrerPercentValue * amountToPay) / 100;
      payload.tokenAddress = selectedCurrency?.walletAddress;
    }
    props.createWireRequest(payload);
    setBankDetailsModal(true);
    setRequestModal(false);
  };

  // useEffect(()=> {
  //     if(props.wallets.createRequestAuth)
  //     navigate('/wallets/details')
  // },[props.wallets.createRequestAuth])

  return (
    <div className="deposit-page">
      {fullPageLoader ? (
        <FullPageLoader />
      ) : (
        <div className="deposit-details wallet-details p-3">
          <Container>
            <div>
              {/* <div className="d-flex justify-content-end top-head flex-wrap pt-75">
                                    <Navbar />
                                </div> */}
              <h2>Deposit {currencyParam ? currencyParam : ""}</h2>
              {/* <CodeModal /> */}
              <Row>
                <Col xxl={8} xl={7} className="mb-3 mb-xxsl-0">
                  <div className="transfer-method">
                    <strong className="mb-4">TRANSFER</strong>
                    {wireRequestLength > 0 ? (
                      <div className="deposit-notice d-flex align-items-start align-items-sm-center flex-column flex-sm-row">
                        <div className="flex-fill mb-3 mb-sm-0">
                          <p>
                            You have already submitted a wire transfer request.
                          </p>
                          <p>
                            Please upload the transfer receipt or cancel the
                            previous request.
                          </p>
                        </div>
                        <button
                          className="btn-read-more btn-triage-div btn-triage"
                          onClick={() => navigate(`/wallets/details`)}
                        >
                          <span>More</span>
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    <span className="mb-3 d-block">Wallet</span>
                    <div className="d-flex selection-field flex-wrap flex-xl-nowrap">
                      <div>
                        <span className="circle mb-3 mb-xl-0">
                          <img src={selectedCurrency?.logo} alt="" />
                        </span>
                      </div>
                      <div className="triage-select w-100">
                        <Select
                          isSearchable={false}
                          classNamePrefix="triage-select"
                          value={selectedCurrency}
                          options={currienciesOptions}
                          onChange={changeCurrencyHandler}
                        />
                      </div>
                    </div>

                    <span className="d-block mb-2">Method</span>
                    <div className="mb-4">
                      <div className="d-flex selection-field flex-wrap">
                        <div className="positon-relative"></div>
                        <div className="flex-fill">
                          <Select
                            isSearchable={false}
                            classNamePrefix="triage-select"
                            value={paymentMethod}
                            onChange={(e) => {
                              paymentMethodChangeHandler(e.value);
                            }}
                            options={paymentOptions}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="mb-2 d-block">Amount</span>
                      <div>
                        <form
                          onSubmit={
                            paymentMethod.value === 1 ? createRequest : payNow
                          }
                        >
                          <Row className="align-items-baseline">
                            <Col xl={9}>
                              <div className="amount-input mb-4">
                                <input
                                  type="text"
                                  onKeyDown={(e) => {
                                    ENV.decimalNumberValidator(e);
                                  }}
                                  step={0.1}
                                  placeholder="Enter Amount"
                                  required={true}
                                  onChange={(e) => {
                                    setAmountToPay(e.target.value);
                                  }}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <span className="mb-2 d-block">Promo Code</span>
                            <Col xl={9}>
                              <div className="amount-input mb-4">
                                <input
                                  type="text"
                                  placeholder="Enter Promo Code"
                                  value={promoCode}
                                  onChange={(e) => {
                                    setPromoCode(e.target.value);
                                    setPromoCodeVerified("");
                                  }}
                                />
                                {promoCodeVerified.PromoMatch === "true" &&
                                promoCodeVerified.promo.codeType === 1 ? (
                                  <span>
                                    <label className="success-text">
                                      Promo Code Added, Successfully.
                                    </label>
                                  </span>
                                ) : promoCodeVerified.PromoMatch === "true" &&
                                  promoCodeVerified.promo.codeType === 2 ? (
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
                              </div>
                            </Col>
                            <Col xl={3} className="ps-2 pl-2 pl-md-0 pe-0 ">
                              <button
                                onClick={(e) => verifyPromoCode(e)}
                                disabled={promoCode ? false : true}
                                className=" btn-triage-div btn-triage mb-4 apply-btn"
                              >
                                <span>Apply Code </span>
                              </button>
                            </Col>
                          </Row>
                          <Row>
                            <CurrencyComparison
                              setValidation={setValidation}
                              currency={{ value: "usd" }}
                              amount={amountToPay}
                              extraTokens={
                                promoCodeVerified.PromoMatch === "true" &&
                                promoCodeVerified.promo.codeType === 1
                                  ? promoCodeVerified.promo.bonus
                                  : ""
                              }
                              requestModal={requestModal}
                            />
                          </Row>

                          {paymentMethod.value === 1 ? (
                            <button
                              className="btn-triage-div btn-triage me-4 bg-whitet"
                              disabled={
                                loader || amountToPay <= 0 || !validation
                                  ? true
                                  : false
                              }
                            >
                              <span>Create Request</span>
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="paypal-btn btn-triage-div btn-triage mb-4"
                              disabled={
                                loader || amountToPay <= 0 || !validation
                                  ? true
                                  : false
                              }
                            >
                              <span>
                                {" "}
                                <FontAwesomeIcon
                                  className="me-2 pay-span"
                                  icon={faPaypal}
                                />
                              </span>
                              <span className="pay-span">Pay </span>{" "}
                              <span className="pal-span">Pal</span>{" "}
                              {loader && <SubmitLoader />}
                            </button>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xxl={4} xl={5}>
                  <div
                    className={isActive ? "increase transition" : "tarnsition"}
                  >
                    <div className="transfer-info">
                      {/* <div className="bottom-icon transition" onClick={toggleClass}  >
                                                    <img style={{ cursor: "pointer" }} className="arrow-down" src={BottomIcon} alt="" />
                                                    <img style={{ cursor: "pointer" }} className="arrow-up" src={ArrowUp} alt="" />
                                                </div> */}
                      <h2>TRANSFER INFORMATION</h2>
                      <p>
                        Please enter the amount you are going to purchase.
                        Please enter any available valid promo code to get extra
                        tokens.{" "}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <Modal
              show={requestModal}
              onHide={() => setRequestModal(false)}
              className="deposit-request-modal "
              size="lg"
              backdrop="static"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Confirm Request!
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <CurrencyComparison
                    setValidation={setValidation}
                    currency={{ value: "usd" }}
                    amount={amountToPay}
                    extraTokens={
                      promoCodeVerified.PromoMatch === "true" &&
                      promoCodeVerified.promo.codeType === 1
                        ? promoCodeVerified.promo.bonus
                        : ""
                    }
                    requestModal={requestModal}
                  />
                </Row>
              </Modal.Body>
              <Modal.Footer className="justify-content-center">
                <div className="d-flex justify-content-center flex-wrap">
                  <button
                    onClick={() => setRequestModal(false)}
                    className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 d-flex justify-content-center align-items-center"
                  >
                    <span>CANCEL</span>
                  </button>
                  <button
                    onClick={() => handleWireRequest()}
                    className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 d-flex justify-content-center align-items-center"
                  >
                    <span>CONFIRM</span>
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
            <BankDetails
              bankDetailsModal={bankDetailsModal}
              setBankDetailsModal={setBankDetailsModal}
            />
          </Container>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  wallets: state.wallets,
  user: state.user,
  promocodes: state.promocodes,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getWalletLists,
  beforeWallets,
  createPayment,
  verifyPromoCode,
  beforePromoCode,
  getSettings,
  beforeSettings,
  createWireRequest,
})(Deposit);
