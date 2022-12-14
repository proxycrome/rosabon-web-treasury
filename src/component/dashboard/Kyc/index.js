import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthUsers } from '../../../store/actions'
import Company from './CompanyKYC'
import Personale from './PersonalKYC'

const Index = () => {
  const { users } = useSelector((state) => state.user_profile)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthUsers());
  }, [])

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
