import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthUsers } from '../../../store/actions'
import Company from './CompanyKYC'
import Personale from './PersonalKYC'
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { users } = useSelector((state) => state.user_profile)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      dispatch(getAuthUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  if (users?.role === 'INDIVIDUAL_USER') {
    return <Personale />
  } else if (users?.role === 'COMPANY') {
    return (
      <>
        <Company />
      </>
    )
  }
}

export default Index
