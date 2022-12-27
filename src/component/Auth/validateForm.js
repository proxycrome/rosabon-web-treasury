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
    sourceOthersId: "",
    sourceNotInTheList: "",
    contactFirstName: "",
    contactLastName: "",
    contactMiddleName: "",
    refferedBy: "" || referralCode,
    c_password: "",
    name: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setisSubmitted] = useState(false);

  const handlePhoneValueChange = (value) => {
    setValues({
      ...values,
      phone: value,
    });
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    if (name === "source") {
      setValues({
        ...values,
        [name]: value,
        sourceOthersId: "",
        sourceNotInTheList: "",
      });
    } else if (name === "sourceOthersId") {
      setValues({
        ...values,
        [name]: value,
        sourceNotInTheList: "",
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values, isCompanyTerms, referralCode, sourcer));
    setisSubmitted(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      const {
        email,
        password,
        source,
        contactFirstName,
        contactLastName,
        sourceOthersId,
        phone,
        name,
        refferedBy,
        sourceNotInTheList,
      } = values;
      let company = {
        contactFirstName: contactFirstName.trim(),
        contactLastName: contactLastName.trim(),
        name: name.trim(),
      };
      let data = {
        company,
        email: email.trim(),
        isAssited: false,
        isNewsLetters: isCompanyNewsLetters,
        password,
        phone: phone.startsWith("2340")
          ? phone.replace(/2340/, "0")
          : phone.startsWith("234")
          ? phone.replace(/234/, "0")
          : phone,
        role: "COMPANY",
        source: source ? source : sourcer,
        sourceOthersId:
          sourceOthersId === "NOT_IN_LIST" || sourceOthersId === ""
            ? null
            : Number(sourceOthersId),
        sourceNotInTheList:
          sourceOthersId === "NOT_IN_LIST" ? sourceNotInTheList.trim() : null,
        usage: "TREASURY",
        refferedBy: refferedBy ? refferedBy.trim() : referralCode,
      };
      dispatch(registerUser(data, navigate));
    }
  }, [errors]);

  return {
    handleValueChange,
    handlePhoneValueChange,
    values,
    handleSubmit,
    errors,
  };
};

export function validateInfo(values, isCompanyTerms, referralCode, sourcer) {
  let errors = {};
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;
  if (!values.name) {
    errors.name = "Name field is required";
  }
  if (!values.refferedBy && !values.sourceOthersId && !referralCode) {
    errors.refferedBy = "This field is required";
  }
  if (!values.source && !sourcer) {
    errors.source = "Field cannot be empty";
  }
  if (!values.email) {
    errors.email = "Email address is required";
  }

  if (values.sourceOthersId === "NOT_IN_LIST" && !values.sourceNotInTheList) {
    errors.sourceNotInTheList = "Field cannot be empty";
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

  if (values.phone === "234" || values.phone.startsWith("2340")) {
    errors.phone = "Enter a valid phone number";
  }

  if (values.phone.length < 13) {
    errors.phone = "Enter a valid phone number";
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
    sourceOthersId: "",
    sourceNotInTheList: "",
    firstName: "",
    lastName: "",
    middleName: "",
    refferedBy: "" || referralCode,
    c_password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setisSubmitted] = useState(false);

  const handlePhoneValueChange = (value) => {
    setValues({
      ...values,
      phone: value,
    });
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    if (name === "source") {
      setValues({
        ...values,
        [name]: value,
        sourceOthersId: "",
        sourceNotInTheList: "",
      });
    } else if (name === "sourceOthersId") {
      setValues({
        ...values,
        [name]: value,
        sourceNotInTheList: "",
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
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
        phone,
        sourceOthersId,
        refferedBy,
        sourceNotInTheList,
      } = values;
      let individualUser = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      };
      let data = {
        individualUser,
        email: email.trim(),
        isAssited: false,
        isNewsLetters: isUserNewsLetters,
        password,
        phone: phone.startsWith("2340")
          ? phone.replace(/2340/, "0")
          : phone.startsWith("234")
          ? phone.replace(/234/, "0")
          : phone,
        role: "INDIVIDUAL_USER",
        source: source ? source : sourcer,
        sourceOthersId:
          sourceOthersId === "NOT_IN_LIST" || sourceOthersId === ""
            ? null
            : Number(sourceOthersId),
        sourceNotInTheList:
          sourceOthersId === "NOT_IN_LIST" ? sourceNotInTheList.trim() : null,
        usage: "TREASURY",
        refferedBy: refferedBy ? refferedBy.trim() : referralCode,
      };
      dispatch(registerUser(data, navigate));
    }
  }, [errors]);

  return {
    handleValueChange,
    handlePhoneValueChange,
    values,
    handleSubmit,
    errors,
  };
};

export function validateUserInfo(values, isUserTerms, sourcer, referralCode) {
  let errors = {};
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;

  if (!values.refferedBy && !values.sourceOthersId && !referralCode) {
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

  if (values.sourceOthersId === "NOT_IN_LIST" && !values.sourceNotInTheList) {
    errors.sourceNotInTheList = "Field cannot be empty";
  }

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

  if (values.phone === "234" || values.phone.startsWith("2340")) {
    errors.phone = "Enter a valid phone number";
  }

  if (values.phone.length < 13) {
    errors.phone = "Enter a valid phone number";
  }

  if (!isUserTerms) {
    errors.isUserTerms = "Please check the terms and condition";
  }
  return errors;
}

export const ValidatePasswordForm = (validatePassword, email) => {
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
      const { newPassword, c_password } = values;
      const formData = {
        email,
        newPassword,
        confirmPassword: c_password,
      };
      dispatch(resetPassword(formData, navigate));
    }
  }, [errors]);

  return { handleValueChange, values, handleSubmit, errors };
};

export function validatePassword(values) {
  let errors = {};
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;

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
