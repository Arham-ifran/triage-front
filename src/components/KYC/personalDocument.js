import { useState, useEffect } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import Upload from "../../assets/images/upload.svg";
import Passport from "./passport";
import Driving_ID from "./drivingId";
import ID_Card from "./idCard";
import { connect } from "react-redux";
import {
  setActiveKey,
  unSetKycData,
  updatePersonalDoc,
  getPersonalDoc,
  beforeKyc,
} from "./kyc.action";
import { ENV } from "../../config/config";
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import "./KYC.css";

function Personal_Document(props) {
  let storedData = ENV.getUserKeys();
  const [data, setData] = useState({
    personalDocumentPassportFront: "",
    personalDocumentPassportBack: "",
    personalDocumentIDCardFront: "",
    personalDocumentIDCardBack: "",
    personalDocumentDrivingIDFront: "",
    personalDocumentDrivingIDBack: "",
    personalDocumentType: "1",
  });
  const [saveData, setSaveData] = useState({
    personalDocumentType: "1",
    userId: storedData._id,
  });
  const [msg, setMsg] = useState({
    personalDocumentPassportFront: "",
    personalDocumentPassportBack: "",
  });
  const [imageChangeCheck, setImageChangeCheck] = useState(false);
  const [loader, setLoader] = useState(true);
  const [controller, setController] = useState([false, false, false]);

  useEffect(() => {
    if (imageChangeCheck) {
      setImageChangeCheck(false);
    }
  }, [imageChangeCheck]);

  useEffect(() => {
    if (saveData.userId) props.getPersonalDoc(saveData.userId);
  }, []);

  useEffect(() => {
    if (props.kyc.personalDocAuth) {
      let personalData = props.kyc.personalDoc;
      if (personalData) {
        if (
          personalData.personalDocumentPassportFront ||
          personalData.personalDocumentPassportBack ||
          personalData.personalDocumentIDCardFront ||
          personalData.personalDocumentIDCardBack ||
          personalData.personalDocumentDrivingIDFront ||
          personalData.personalDocumentDrivingIDBack
        ) {
          let localArr = new Array(3).fill(true);
          localArr[personalData.personalDocumentType - 1] = false;
          setController(localArr);
        }
        setData(personalData);
        if (personalData.personalDocumentType)
          setSaveData({
            ...saveData,
            personalDocumentType: personalData.personalDocumentType,
          });
      }
      setLoader(false);
      props.beforeKyc();
    }
  }, [props.kyc.personalDocAuth]);

  useEffect(() => {
    if (props.kyc.updateAuth) {
      setLoader(false);
      props.beforeKyc();
    }
  }, [props.kyc.updateAuth]);

  const onChange = (e) => {
    setMsg({
      personalDocumentPassportFront: "",
      personalDocumentPassportBack: "",
    });
    if (e.target.files[0]) {
      let newData = data;
      newData[e.target.name] = URL.createObjectURL(e.target.files[0]);
      setData(newData);
      let newSaveData = saveData;
      newSaveData[e.target.name] = e.target.files[0];
      setSaveData(newSaveData);
      setImageChangeCheck(true);
    }
  };

  const save = () => {
    if (
      (data.personalDocumentPassportFront &&
        data.personalDocumentPassportBack) ||
      (data.personalDocumentIDCardFront && data.personalDocumentIDCardBack) ||
      (data.personalDocumentDrivingIDFront &&
        data.personalDocumentDrivingIDBack)
    ) {
      setMsg({
        personalDocumentPassportFront: "",
        personalDocumentPassportBack: "",
      });
      let localArr = new Array(3).fill(true);
      localArr[parseInt(data.personalDocumentType) - 1] = false;
      setController(localArr);
      let formData = new FormData();
      for (const key in saveData) formData.append(key, saveData[key]);
      props.updatePersonalDoc(formData);
      setLoader(true);
      props.setActiveKey("forth");
    } else {
      let personalDocumentPassportFront = "";
      let personalDocumentPassportBack = "";
      if (
        !data.personalDocumentPassportFront &&
        !data.personalDocumentIDCardFront &&
        !data.personalDocumentDrivingIDFront
      ) {
        personalDocumentPassportFront =
          "Personal Document Front Side Required.";
      }
      if (
        !data.personalDocumentPassportBack &&
        !data.personalDocumentIDCardBack &&
        !data.personalDocumentDrivingIDBack
      ) {
        personalDocumentPassportBack = "Personal Document Back Side Required.";
      }
      setMsg({ personalDocumentPassportFront, personalDocumentPassportBack });
    }
  };
  return (
    <div className="personal-document">
      {loader ? (
        <FullPageLoader />
      ) : (
        <>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey={
              data.personalDocumentType ? data.personalDocumentType : "1"
            }
          >
            <div className="d-flex justify-content-center align-items-center">
              <div className="tabs-sec">
                <Nav variant="pills">
                  <Nav.Item className="me-0 me-sm-4">
                    <Nav.Link
                      className="text-white"
                      eventKey="1"
                      href="#"
                      onClick={() => {
                        setSaveData({ ...saveData, personalDocumentType: "1" });
                        setData({ ...data, personalDocumentType: "1" });
                      }}
                      disabled={
                        controller && controller.length ? controller[0] : false
                      }
                    >
                      Passport
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="me-4 ms-0 ms-sm-4">
                    <Nav.Link
                      className="text-white"
                      eventKey="2"
                      href="#"
                      onClick={() => {
                        setSaveData({ ...saveData, personalDocumentType: "2" });
                        setData({ ...data, personalDocumentType: "2" });
                      }}
                      disabled={
                        controller && controller.length ? controller[1] : false
                      }
                    >
                      ID Card
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="ms-0 ms-sm-4">
                    <Nav.Link
                      className="text-white"
                      eventKey="3"
                      href="#"
                      onClick={() => {
                        setSaveData({ ...saveData, personalDocumentType: "3" });
                        setData({ ...data, personalDocumentType: "3" });
                      }}
                      disabled={
                        controller && controller.length ? controller[2] : false
                      }
                    >
                      Driving ID
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
            <Tab.Content>
              {data.personalDocumentType == "1" ? (
                <Passport />
              ) : data.personalDocumentType == "2" ? (
                <ID_Card />
              ) : data.personalDocumentType == "3" ? (
                <Driving_ID />
              ) : (
                ""
              )}
            </Tab.Content>
          </Tab.Container>
          <div className="passport">
            <div className="pt-4 d-flex justify-content-center align-items-center">
              <Row>
                <Col xl={6} className="mb-3 mb-xl-0">
                  <span className="ps-2 mb-2">
                    Front<span className="text-danger"> *</span>
                  </span>
                  <div className="card d-flex justify-content-center align-items-center">
                    <div className="mb-4 input-file">
                      <label>
                        {" "}
                        <img className="img-fluid" src={Upload} />
                        <input
                          type="file"
                          size="60"
                          accept=".png,.jpeg,.jpg"
                          onChange={onChange}
                          name={
                            data.personalDocumentType == "1"
                              ? `personalDocumentPassportFront`
                              : data.personalDocumentType == "2"
                              ? `personalDocumentIDCardFront`
                              : "personalDocumentDrivingIDFront"
                          }
                        />
                      </label>
                    </div>
                    <div>
                      <span>Please upload a document</span>
                    </div>
                  </div>
                  {data?.personalDocumentPassportFront ||
                  data?.personalDocumentIDCardFront ||
                  data?.personalDocumentDrivingIDFront ? (
                    <div className=" pt-3 pb-3 card-img-uploader">
                      <img
                        className="img-fluid"
                        src={
                          data?.personalDocumentPassportFront
                            ? data?.personalDocumentPassportFront
                            : data?.personalDocumentIDCardFront
                            ? data?.personalDocumentIDCardFront
                            : data?.personalDocumentDrivingIDFront
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <span
                    className={
                      msg.personalDocumentPassportFront ? `` : `d-none`
                    }
                  >
                    <label className="pl-1 text-danger error">
                      {msg.personalDocumentPassportFront}
                    </label>
                  </span>
                </Col>
                <Col xl={6}>
                  <span className="ps-2 mb-2">
                    Back<span className="text-danger"> *</span>
                  </span>

                  <div className="card d-flex justify-content-center align-items-center">
                    <div className="mb-4 input-file">
                      <label>
                        {" "}
                        <img className="img-fluid" src={Upload} />
                        <input
                          type="file"
                          size="60"
                          accept=".png,.jpeg,.jpg"
                          onChange={onChange}
                          name={
                            data.personalDocumentType == "1"
                              ? `personalDocumentPassportBack`
                              : data.personalDocumentType == "2"
                              ? `personalDocumentIDCardBack`
                              : "personalDocumentDrivingIDBack"
                          }
                        />
                      </label>
                    </div>
                    <div>
                      <span>Please upload a document</span>
                    </div>
                  </div>
                  {data?.personalDocumentPassportBack ||
                  data?.personalDocumentIDCardBack ||
                  data?.personalDocumentDrivingIDBack ? (
                    <div className="card-img-uploader pt-3 pb-3">
                      <img
                        className="img-fluid"
                        src={
                          data?.personalDocumentPassportBack
                            ? data?.personalDocumentPassportBack
                            : data?.personalDocumentIDCardBack
                            ? data?.personalDocumentIDCardBack
                            : data?.personalDocumentDrivingIDBack
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <span
                    className={msg.personalDocumentPassportBack ? `` : `d-none`}
                  >
                    <label className="pl-1 text-danger error">
                      {msg.personalDocumentPassportBack}
                    </label>
                  </span>
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-center align-items-center pt-4">
              <button className="btn-triage-div btn-triage" onClick={save}>
                <span>Save</span>
              </button>
              {/* <button className="btn-triage-div btn-triage bg-white" onClick={() => { props.setActiveKey('third') }}><span>Next</span></button> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  kyc: state.kyc,
});

export default connect(mapStateToProps, {
  setActiveKey,
  unSetKycData,
  updatePersonalDoc,
  getPersonalDoc,
  beforeKyc,
})(Personal_Document);
