import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  setActiveKey,
  unSetKycData,
  setKycData,
  getPersonalDoc,
  updatePersonalDoc,
  beforeKyc,
} from "./kyc.action";
import { updateProfile } from "../../redux/user/user.action";
import DatePicker from "react-date-picker";
import Select from "react-select";
import validator from "validator";
import { ENV } from "../../config/config";
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import "./KYC.css";
import { Form } from "react-bootstrap";
import codes from "country-calling-code";

function Personal(props) {
  const [data, setData] = useState({});
  const [date, onDateChange] = useState(new Date());
  const [code, setCode] = useState("");
  const [countryCode, setCountryCode] = useState([]);
  const [country, setCountry] = useState();
  const [loader, setLoader] = useState(true);
  const [msg, setMsg] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  let storedData = ENV.getUserKeys();

  useEffect(() => {
    let data = {
      firstName: "",
      lastName: "",
      phone: "",
      userId: storedData._id,
    };
    if (storedData.firstName !== undefined)
      data = { ...data, firstName: storedData.firstName };
    if (storedData.lastName !== undefined)
      data = { ...data, lastName: storedData.lastName };
    if (storedData.dob !== undefined) data = { ...data, dob: storedData.dob };

    setCountryCode(
      codes.map((item) => {
        return {
          value: item.countryCodes[0],
          label: item.country + " (+" + item.countryCodes[0] + ")",
          country: item.country,
        };
      })
    );
    props.setKycData(data);
    props.getPersonalDoc(storedData._id);
  }, []);

  useEffect(() => {
    if (props.kyc.personalDocAuth) {
      let personalData = props.kyc.personalDoc;
      setData({ ...data, phone: personalData?.phone });

      setCountry(personalData?.country);
      setCode(personalData?.countryCode);
      props.beforeKyc();
    }
  }, [props.kyc.personalDocAuth]);

  useEffect(() => {
    if (props.kyc.kycDataAuth) {
      let storedData = props.kyc.kycData;
      if (storedData.dob) {
        onDateChange(new Date(storedData.dob));
      }
      setData(storedData);
      props.unSetKycData();
      setLoader(false);
    }
  }, [props.kyc.kycDataAuth]);

  const onSelectChange = (e) => {
    setCode("+" + e.value);
    setCountry(e.country);
    setData({ ...data, countryCode: "+" + e.value, country: e.country });
  };

  const handlePhoneData = (e) => {
    setMsg({ ...msg, phone: "" });
    setData({ ...data, phone: e.target.value });
  };

  const save = () => {
    const checkCode = parseInt(code);

    if (
      !validator.isEmpty(`${date}`) &&
      !isNaN(Date.parse(date)) &&
      !validator.isEmpty(`${data.firstName}`) &&
      !validator.isEmpty(`${data.phone}`) &&
      !validator.isEmpty(`${data.lastName}`) &&
      typeof data.phone !== "undefined" &&
      !isNaN(checkCode) &&
      data.phone.length > 3 &&
      data.phone.length < 10
    ) {
      let newData = { ...data, dob: date };
      setMsg({
        date: "",
        firstName: "",
        lastName: "",
        phone: "",
      });
      props.setKycData(newData);
      let formData = new FormData();

      for (const key in data) formData.append(key, data[key]);
      formData.append("appliedKYC", 1);
      props.updatePersonalDoc(formData);
      props.updateProfile(newData);
      setLoader(true);
      props.setActiveKey("second");
    } else {
      let date1 = "";
      let firstName = "";
      let lastName = "";
      let phone = "";
      let code = "";

      if (validator.isEmpty(data.firstName)) {
        firstName = "First Name Required.";
      }
      if (validator.isEmpty(data.lastName)) {
        lastName = "Last Name Required.";
      }
      if (isNaN(Date.parse(date))) {
        date1 = "Date Of Birth Required.";
      } else if (typeof data.phone == "undefined" || isNaN(checkCode)) {
        phone = "Phone Number is Required";
      } else if (data.phone.length < 3 || data.phone.length > 10) {
        phone = "Please Enter Valid Phone Number.";
      } else if (validator.isMobilePhone(data.phone)) {
        phone = "Please Enter Valid Phone Number.";
      }

      setMsg({ date: date1, firstName, lastName, phone });
    }
  };

  return (
    <div className="profile personal">
      {loader ? (
        <FullPageLoader />
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          {/* <Form></Form> */}
          {/* <Form onSubmit={''}> */}
          <div>
            <div className="account-inputs">
              <label>
                First Name<span className="text-danger"> *</span>
              </label>
              <input
                placeholder="First Name"
                defaultValue={data.firstName}
                name="firstName"
                onChange={(e) => {
                  setData({ ...data, firstName: e.target.value });
                  setMsg({ ...msg, firstName: "" });
                }}
              />
              <span className={msg.firstName ? `` : `d-none`}>
                <label className="pl-1 text-danger error">
                  {msg.firstName}
                </label>
              </span>
            </div>
            <div className="account-inputs">
              <label>
                Last Name<span className="text-danger"> *</span>
              </label>
              <input
                placeholder="Last Name"
                defaultValue={data.lastName}
                name="lastName"
                onChange={(e) => {
                  setData({ ...data, lastName: e.target.value });
                  setMsg({ ...msg, lastName: "" });
                }}
              />
              <span className={msg.lastName ? `` : `d-none`}>
                <label className="pl-1 text-danger error">{msg.lastName}</label>
              </span>
            </div>
            <div className="account-inputs">
              <label>
                Phone Number<span className="text-danger"> *</span>
              </label>
              <div className="phone">
                <div className="account-inputs phone-number-select d-flex  flex-wrap">
                  <div className="country-name-selector">
                    <Select
                      value={countryCode.filter(
                        (countryCode) => countryCode.country === country
                      )}
                      onChange={(e) => onSelectChange(e)}
                      options={countryCode}
                      classNamePrefix="country-code-select"
                    />
                  </div>
                  <div className="d-flex number-holder-div flex-fill">
                    <input
                      value={code}
                      className="country-code"
                      name="countryCode"
                    />
                    <input
                      type="text"
                      value={data.phone}
                      name="phone"
                      className="number-holder w-100"
                      onKeyDown={(e) => ENV.integerNumberValidator(e)}
                      onChange={(e) => handlePhoneData(e)}
                    />
                  </div>
                </div>
              </div>
              <span className={msg.phone ? `` : `d-none`}>
                <label className="pl-1 text-danger error">{msg.phone}</label>
              </span>
            </div>
            <div className="account-inputs pb-4">
              <label className="d-block">
                Date of birth<span className="text-danger"> *</span>
              </label>
              <DatePicker
                display="inline"
                touchUi={true}
                value={date}
                onChange={onDateChange}
                maxDate={new Date()}
              />
            </div>
            <span className={msg.date ? `` : `d-none`}>
              <label className="pl-1 text-danger error">{msg.date}</label>
            </span>
            <div className="d-flex justify-content-center align-items-center pt-4 flex-wrap">
              <button
                className="btn-triage-div btn-triage mb-3 mb-sm-0"
                onClick={save}
              >
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
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
  unSetKycData,
  setKycData,
  updateProfile,
  getPersonalDoc,
  updatePersonalDoc,
  beforeKyc,
})(Personal);
