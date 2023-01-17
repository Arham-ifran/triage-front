import { useEffect, useState } from "react";
import codes from "country-calling-code";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import Upload from "../../assets/images/upload.svg";
import {
  setActiveKey,
  updatePersonalDoc,
  getPersonalDoc,
  beforeKyc,
} from "./kyc.action";
import Select from "react-select";
import { ENV } from "../../config/config";
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import "./KYC.css";

function Address(props) {
  let storedData = ENV.getUserKeys();
  const [country, setCountry] = useState([]);
  const [data, setData] = useState({
    addressDocument: "",
    country: "",
  });
  const [msg, setMsg] = useState({
    country: "",
    addressDocument: "",
  });
  const [loader, setLoader] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (storedData._id) props.getPersonalDoc(storedData._id);
    setCountry(
      codes.map((item) => {
        return {
          value: item.country,
          label: item.country,
        };
      })
    );
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
        setData({
          addressDocument: personalData.addressDocument || null,
          country: personalData.country,
        });
        codes.map((item) => {
          if (`+${item.countryCodes[0]}` == personalData.countryCode) {
            console.log(
              "{value: item.countryCodes[0], label: item.country + ' (+' + item.countryCodes[0] + ')'}",
              {
                value: item.countryCodes[0],
                label: item.country + " (+" + item.countryCodes[0] + ")",
              }
            );
            setSelectedOption({
              value: item.countryCodes[0],
              label: item.country,
            });
            setCountry([{ value: item.country, label: item.country }]);
          }
        });
        if (personalData.addressDocument)
          setImage(personalData.addressDocument);
      }
      setLoader(false);
      props.beforeKyc();
    }
  }, [props.kyc.personalDocAuth]);

  const onSelectChange = (e) => {
    setMsg({ ...msg, country: "" });

    setData({
      ...data,
      country: e.value,
    });
    setSelectedOption({ value: e.value, label: e.value });
  };

  const onChange = (e) => {
    setMsg({ ...msg, addressDocument: "" });
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setData({ ...data, addressDocument: e.target.files[0] });
    }
  };

  const save = () => {
    console.log("country", data.country);
    if (data.country && data.addressDocument) {
      let formData = new FormData();
      for (const key in data) formData.append(key, data[key]);
      formData.append("userId", storedData._id);
      props.updatePersonalDoc(formData);
      setLoader(true);
      setMsg({
        country: "",
        addressDocument: "",
      });
      props.setActiveKey("fifth");
    } else {
      let country = "";
      let addressDocument = "";
      if (!data.country) {
        country = "Country Is Required.";
      }
      if (!data.addressDocument) {
        addressDocument = "Document With Address Is Required.";
      }
      setMsg({
        country,
        addressDocument,
      });
    }
  };

  return (
    <div className="address">
      {loader ? (
        <FullPageLoader />
      ) : (
        <>
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <div className="account-inputs">
                <div className="account-inputs pb-4">
                  <label>
                    Your Country<span className="text-danger"> *</span>
                  </label>
                  <div style={{ minHeight: "0" }} className="phone p-0">
                    <Select
                      className="w-100"
                      value={selectedOption}
                      onChange={onSelectChange}
                      options={country}
                      classNamePrefix="country-code-select"
                      // menuIsOpen="true"
                    />
                  </div>
                </div>
                {/* <div> */}
                <span className={msg.country ? `` : `d-none`}>
                  <label className="pl-1 text-danger error">
                    {msg.country}
                  </label>
                </span>
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className="pt-4 d-flex justify-content-center align-items-center">
            <div className="upload-div">
              <strong>
                Add document with address on it
                <span className="text-danger"> *</span>
              </strong>
              <p>Please upload document proving your current address</p>
              <div>
                <span className={msg.addressDocument ? `` : `d-none`}>
                  <label className="pl-1 text-danger error">
                    {msg.addressDocument}
                  </label>
                </span>
              </div>
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
                      name="addressDocument"
                    />
                  </label>
                </div>
                <div>
                  <span>Please upload a document</span>
                </div>
              </div>
              {image ? (
                <div className="d-flex justify-content-center align-items-center card-img-uploader">
                  <div className="text-center pt-3 pb-3 uploaded-files">
                    <img className="img-fluid" src={image} />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-center align-items-center pt-4 flex-wrap">
                <button
                  className="btn-triage-div btn-triage mb-3 mb-sm-0"
                  onClick={save}
                >
                  <span>Save</span>
                </button>
                {/* <button className="btn-triage-div btn-triage bg-white mb-3 mb-sm-0" onClick={() => { props.setActiveKey('fifth') }}><span>Next</span></button> */}
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
});

export default connect(mapStateToProps, {
  setActiveKey,
  updatePersonalDoc,
  getPersonalDoc,
  beforeKyc,
})(Address);
