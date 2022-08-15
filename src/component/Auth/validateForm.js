import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerCompany,
  registerUser,
} from "../../redux/actions/auth/SignupAction";

export const ValidateCompanyForm = (
  validateInfo,
  isCompanyNewsLetters,
  isCompanyTerms
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    phone: "",
    source: "",
    sourceOthers: "",
    contactFirstName: "",
    contactLastName: "",
    contactMiddleName: "",
    refferedBy: "",
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
    setErrors(validateInfo(values, isCompanyTerms));
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
        phone,
        role: "COMPANY",
        source,
        sourceOthers,
        usage: "TREASURY",
        refferedBy,
      };
      
      dispatch(registerCompany(data));
    }
  }, [errors]);

  return { handleValueChange, values, handleSubmit, errors };
};

export function validateInfo(values, isCompanyTerms) {
  let errors = {};
  var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;
  if (!values.name) {
    errors.name = "Name field is required and should be at least 4 characters";
  }
  if (!values.refferedBy && !values.sourceOthers) {
    errors.refferedBy =
      "This field is required and should be at least 4 characters";
  }
  if (!values.source) {
    errors.source = "Source field is required";
  }
  if (!values.email) {
    errors.email =
      "Email field is required and should be at least 4 characters";
  }
  // else if (/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = "Email is invalid";
  // }

  if (!values.password) {
    errors.password =
      "Password field is required and should be at least 4 characters";
  }
  // else if (re.test(values.password)) {
  //   errors.password =
  //     "Your password must contain at least one digit, 8 characters, one special character";
  // }
  if (!values.c_password) {
    errors.c_password =
      "Confirm password field is required and should be at least 4 characters";
  } else if (values.c_password !== values.password) {
    errors.c_password = "Password does not match";
  }
  if (!values.contactFirstName) {
    errors.contactFirstName =
      "Contact first name field is required and should be at least 4 characters";
  }
  if (!values.contactLastName) {
    errors.contactLastName =
      "Contact last name field is required and should be at least 4 characters";
  }
  if (!values.phone) {
    errors.phone =
      "Contact number field is required and should be greater than 11 digits";
  }
  if (!isCompanyTerms) {
    errors.isCompanyTerms = "Please check the terms and condition";
  }
  return errors;
}

export const ValidateUserForm = (
  validateInfo,
  isUserNewsLetters,
  isUserTerms
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    phone: "",
    source: "",
    sourceOthers: "",
    firstName: "",
    lastName: "",
    middleName: "",
    refferedBy: "",
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
    setErrors(validateInfo(values, isUserTerms));
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
        phone,
        role: "INDIVIDUAL_USER",
        source,
        sourceOthers,
        usage: "TREASURY",
        refferedBy,
      };
      
      dispatch(registerUser(data));
    }
  }, [errors]);

  return { handleValueChange, values, handleSubmit, errors };
};

export function validateUserInfo(values, isUserTerms) {
  let errors = {};
  var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;

  if (!values.refferedBy && !values.sourceOthers) {
    errors.refferedBy =
      "This field is required and should be at least 4 characters";
  }
  if (!values.source) {
    errors.source = "Source field is required";
  }
  if (!values.email) {
    errors.email =
      "Email field is required and should be at least 4 characters";
  }

  if (!values.password) {
    errors.password =
      "Password field is required and should be at least 4 characters";
  }

  if (!values.c_password) {
    errors.c_password =
      "Confirm password field is required and should be at least 4 characters";
  } else if (values.c_password !== values.password) {
    errors.c_password = "Password does not match";
  }
  if (!values.firstName) {
    errors.firstName =
      "First name field is required and should be at least 4 characters";
  }
  if (!values.lastName) {
    errors.lastName =
      "Last name field is required and should be at least 4 characters";
  }
  if (!values.phone) {
    errors.phone =
      "User number field is required and should be greater than 11 digits";
  }
  if (!isUserTerms) {
    errors.isUserTerms = "Please check the terms and condition";
  }
  return errors;
}
