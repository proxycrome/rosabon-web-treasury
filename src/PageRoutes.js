import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './component/Auth/Login'
import Signup from './component/Auth/signup'
import { Profile } from './pages/ProfileUpdate'
import ProfileUpdate from './component/dashboard/ProfileUpdate'
import ForgotPassword from './component/Auth/ForgotPassword'
import Congratulatios from './component/Auth/Congratulatios'
import ResetPassword from './component/Auth/ResetPassword'
import PersonalProfile from './pages/PersonalProfile'
import CompanyProfile from './pages/CompanyProfile'
import Authentication from './component/Auth'




function PageRoutes() {
  return (
    <Routes>
        <Route path="/login" element={ <Authentication/> } />
        <Route path="/signup" element={ <Authentication signup="signup"/> } />
        <Route path="/" element={ <ProfileUpdate/> } />
        <Route path="/forgot-password" element={ <ForgotPassword/> } />
        <Route path="/congrates" element={ <Congratulatios/> } />
        <Route path="/reset-password" element={ <ResetPassword/> } />
        <Route path="/personal-profile" element={ <PersonalProfile/> } />
        <Route path="/company-profile" element={ <CompanyProfile/> } />
    </Routes>
  )
}

export default PageRoutes