import { useEffect, useState } from "react";
import Upload from "../../assets/images/upload.svg";
import { connect } from "react-redux";
import {
  setActiveKey,
  updatePersonalDoc,
  getPersonalDoc,
  beforeKyc,
} from "./kyc.action";
import { beforeUser, getUser } from "../../redux/user/user.action";
import { ENV } from "../../config/config";
import { toast } from "react-toastify";
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import "./KYC.css";

function Additional_Files(props) {
  let storedData = ENV.getUserKeys();
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({});
  const [image, setImage] = useState("");
  const [persData, setPersData] = useState({});

  useEffect(() => {
    if (storedData._id) props.getPersonalDoc(storedData._id);
  }, []);

  useEffect(() => {
    if (props.kyc.updateAuth) {
      setLoader(false);
      props.beforeKyc();
    }
  }, [props.kyc.updateAuth]);

  useEffect(() => {
    if (props.kyc.personalDocAuth) {
      let personalData = props.kyc.personalDoc;
      if (personalData) {
        setPersData(personalData);
        if (personalData.additionalDocument)
          setImage(personalData.additionalDocument);
      }
      setLoader(false);
      props.beforeKyc();
    }
  }, [props.kyc.personalDocAuth]);

  useEffect(() => {
    if (props.user.getUserAuth) {
      let user = props.user.getUserData;
      props.beforeUser();
      setLoader(false);
      if (
        user.firstName &&
        user.lastName &&
        user.dob &&
        persData.personalDocumentFront &&
        persData.personalDocumentBack &&
        persData.phone &&
        persData.country &&
        persData.addressDocument
      ) {
        props.setActiveKey("sixth");
      } else {
        toast.info("Please fill all required fields for completion.");
      }
    }
  }, [props.user.getUserAuth]);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setData({ ...data, additionalDocument: e.target.files[0] });
    }
  };

  const save = () => {
    let formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    formData.append("userId", storedData._id);
    formData.append("appliedKYC", 2);
    props.updatePersonalDoc(formData);
    setLoader(true);
    next();
  };

  const next = () => {
    props.getUser(storedData._id);
    props.getPersonalDoc(storedData._id);
    setLoader(true);
    props.setActiveKey("sixth");
  };

  return (
    <div className="additional-files">
      {loader ? (
        <FullPageLoader />
      ) : (
        <>
          <div className="pt-4 d-flex justify-content-center align-items-center">
            <div className="file-content">
              <strong>Additional files</strong>
              <p>Please upload any additional file needed (optional)</p>
              <div className="card d-flex justify-content-center align-items-center">
                <div className="mb-4 input-file">
                  <label>
                    {" "}
                    <img className="img-fluid" src={Upload} alt="" />
                    <input
                      type="file"
                      size="60"
                      accept=".png,.jpeg,.jpg"
                      onChange={onChange}
                    />
                  </label>
                </div>
                <div>
                  <span>Please upload a document</span>
                </div>
              </div>
              <>
                {image ? (
                  <div className="d-flex justify-content-center align-items-center card-img-uploader">
                    <div className="text-center pt-3 pb-3 uploaded-files">
                      <img className="img-fluid" src={image} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
              <div className="d-flex justify-content-center align-items-center pt-4 flex-wrap">
                <button
                  className="btn-triage-div btn-triage mb-3 mb-sm-0"
                  onClick={save}
                >
                  <span>Save</span>
                </button>
                {/* <button className="btn-triage-div btn-triage bg-white" onClick={next}><span>Next</span></button> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  kyc: state.kyc,
  user: state.user,
});

export default connect(mapStateToProps, {
  setActiveKey,
  updatePersonalDoc,
  getPersonalDoc,
  beforeKyc,
  beforeUser,
  getUser,
})(Additional_Files);
