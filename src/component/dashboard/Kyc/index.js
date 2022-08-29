import React from 'react'
import { useSelector } from 'react-redux'
import Company from './CompanyKYC'
import Personale from './PersonalKYC'

const Index = () => {
  const { login } = useSelector((state) => state.auth)
  if (login.role.name === 'INDIVIDUAL_USER') {
    return <Personale />
  } else if (login.role.name === 'COMPANY') {
    return (
      <>
        <Company />
      </>
    )
  }
}

export default Index
