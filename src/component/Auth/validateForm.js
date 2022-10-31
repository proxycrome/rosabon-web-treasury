import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {
//   resetPassword,
// } from "../../redux/actions/auth/SignupAction";
import { registerUser, resetPassword } from "../../store/actions";

export const ValidateCompanyForm = (
  validateInfo,
  isCompanyNewsLetters,
  isCompanyTerms,
  referralCode,
  sourcer
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    phone: "",
    source: "" || sourcer,
    sourceOthers: "",
    contactFirstName: "",
    contactLastName: "",
    contactMiddleName: "",
    refferedBy: "" || referralCode,
    c_password: "",
    name: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setisSubmitted] = useState(false);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values, isCompanyTerms, referralCode, sourcer));
    setisSubmitted(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      // console.log(values, isCompanyNewsLetters);
      const {
        email,
        password,
        source,
        contactFirstName,
        contactLastName,
        sourceOthers,
        phone,
        name,
        refferedBy,
      } = values;
      let company = {
        contactFirstName,
        contactLastName,
        name,
      };
      let data = {
        company,
        email,
        isAssited: true,
        isNewsLetters: isCompanyNewsLetters,
        password,
        phone: phone.substr( 0, 1 ) === "0" ? phone.trim() : "0" + phone.trim(),
        role: "COMPANY",
        source: source ? source : sourcer,
        sourceOthers,
        usage: "TREASURY",
        refferedBy: refferedBy ? refferedBy : referralCode,
      };

      dispatch(registerUser(data, navigate));
    }
  }, [errors]);

  return { handleValueChange, values, handleSubmit, errors };
};

export function validateInfo(values, isCompanyTerms, referralCode, sourcer) {
  let errors = {};
  var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;
  if (!values.name) {
    errors.name = "Name field is required";
  }
  if (!values.refferedBy && !values.sourceOthers && !referralCode) {
    errors.refferedBy = "This field is required";
  }
  if (!values.source && !sourcer) {
    errors.source = "Field cannot be empty";
  }
  if (!values.email) {
    errors.email = "Email address is required";
  }
  // else if (/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = "Email is invalid";
  // }

  if (!values.password) {
    errors.password = "Password is required";
  }
  if (!re.test(values.password)) {
    errors.password =
      "Your password must contain at least one digit, 8 characters, one special character";
  }
  if (values.c_password !== values.password) {
    errors.c_password = "Password does not match";
  }
  if (!values.contactFirstName) {
    errors.contactFirstName = "Contact first name field is required";
  }
  if (!values.contactLastName) {
    errors.contactLastName = "Contact last name field is required";
  }
  if (!values.phone) {
    errors.phone = "Mobile number is required ";
  }
  if (!isCompanyTerms) {
    errors.isCompanyTerms = "Please check the terms and condition";
  }
  return errors;
}

export const ValidateUserForm = (
  validateInfo,
  isUserNewsLetters,
  isUserTerms,
  referralCode,
  sourcer
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    phone: "",
    source: "" || sourcer,
    sourceOthers: "" || sourcer === "OTHER" ? referralCode : null,
    firstName: "",
    lastName: "",
    middleName: "",
    refferedBy: "" || referralCode,
    c_password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setisSubmitted] = useState(false);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values, isUserTerms, sourcer, referralCode));
    setisSubmitted(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      const {
        email,
        password,
        source,
        firstName,
        lastName,
        sourceOthers,
        phone,
        refferedBy,
      } = values;
      let individualUser = {
        firstName,
        lastName,
      };
      let data = {
        individualUser,
        email,
        isAssited: true,
        isNewsLetters: isUserNewsLetters,
        password,
        phone: phone.substr( 0, 1 ) === "0" ? phone.trim() : "0" + phone.trim(),
        role: "INDIVIDUAL_USER",
        source: source ? source : sourcer,
        sourceOthers,
        usage: "TREASURY",
        refferedBy: refferedBy ? refferedBy : referralCode,
      };

      dispatch(registerUser(data, navigate));
    }
  }, [errors]);

  return { handleValueChange, values, handleSubmit, errors };
};

export function validateUserInfo(values, isUserTerms, sourcer, referralCode) {
  let errors = {};
  var re = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;

  if (!values.refferedBy && !values.sourceOthers && !referralCode) {
    errors.refferedBy = "This field is required";
  }
  if (!values.source && !sourcer) {
    errors.source = "Field cannot be empty";
  }
  if (!values.email) {
    errors.email = "Email address is required";
  }
  // else if (/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = "Email is invalid";
  // }

  if (!values.password) {
    errors.password = "Password is required";
  }
  if (!re.test(values.password)) {
    errors.password =
      "Your password must contain at least one uppercase, one lowercase, a special character, and must be at least 8 characters";
  }
  if (values.c_password !== values.password) {
    errors.c_password = "Password does not match";
  }
  if (!values.firstName) {
    errors.firstName = "First name field is required";
  }
  if (!values.lastName) {
    errors.lastName = "Last name field is required";
  }
  if (!values.phone) {
    errors.phone = "Mobile number is required ";
  }
  if (!isUserTerms) {
    errors.isUserTerms = "Please check the terms and condition";
  }
  return errors;
}

export const ValidatePasswordForm = (validatePassword, email, token) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    newPassword: "",
    c_password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setisSubmitted] = useState(false);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   
    setErrors(validatePassword(values));
    setisSubmitted(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      const { newPassword } = values;
      const formData = {
        email,
        newPassword,
        token,
      }

      console.log(formData);
      dispatch(resetPassword(formData));
    }
  }, [errors]);

  return { handleValueChange, values, handleSubmit, errors };
};

export function validatePassword(values) {
  let errors = {};
  var re = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;

  if (!values.newPassword) {
    errors.password = "Password is required";
  } else if (!re.test(values.newPassword)) {
    errors.newPassword =
      "Your password must contain at least one uppercase, one lowercase, a special character, and must be at least 8 characters";
  }
  if (values.c_password !== values.newPassword) {
    errors.c_password = "Password does not match";
  }

  return errors;
}
