import React, { useState } from 'react';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import Discovery from '../../asset/Discovery.png';
import RFSLogoFullColour from '../../asset/RFSLogoFullColour.png';

export const ProfileSideBarList = ({ profile, handleChange }) => {
  const styleContent = profile === 'profile' ? 'profile' : ''
  const [is_active, setIsActive] = useState(null)
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openPlan, setOpenPlan] = useState(false);
  const [isTicket, setTicket] = useState(false)
  const [isOpenTicket, setIsOpenTicket] = useState(false)
  const [isCloseTicket, setIsCloseTicket] = useState(false)

  return (
    <WrappSideBarList classname="shadow">
      <div className="`${styleContent}`">
        <div>
          <div className="text-center">
            <div>
              <div className="pt-4">
                <div className="style-log">
                  <img
                    style={{ width: '70px', height: '30px' }}
                    src={RFSLogoFullColour}
                    alt="RFSLogo"
                  />
                  {/* <i className="style-hamburga fa-solid fa-bars"></i> */}
                </div>
              </div>
            </div>

            <div className="content-list">
              <ul className="pt-5">
                <NavLink className="nav_link" to="/">
                  <li>
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                  </li>
                </NavLink>

                <NavLink className="nav_link" to="/plan-product">
                  <li>
                    <i className="far fa-file-alt"></i>
                    <span>Create</span>
                  </li>
                </NavLink> 

                <NavLink className="nav_link" to="/plan-list" onClick={() => setOpenPlan(!openPlan)} >
                  <li>
                    <i className="fas fa-file-alt"></i>
                    <span>Plan</span>
                  </li>
                </NavLink>
                <Collapse isOpen={openPlan}>
                  <ul>
                    <NavLink className="nav_link" to="/archives">
                      <li>
                        <span>Archives</span>
                      </li>
                    </NavLink>
                  </ul>
                </Collapse>
                

                <NavLink className="nav_link" to="/user-wallet">
                  <li>
                    <i className="fas fa-sticky-note"></i>
                    <span>Wallet</span>
                  </li>
                </NavLink>
                <NavLink
                  className={
                    isTicket || isOpenTicket || isCloseTicket
                      ? 'nav_link active'
                      : 'nav_link'
                  }
                  to="/feedback"
                  onClick={() => setOpenFeedback(!openFeedback)}
                >
                  <li>
                    <i className="fas fa-thumbs-up"></i>
                    <span>Feedback</span>
                  </li>
                </NavLink>
                <Collapse isOpen={openFeedback}>
                  <ul>
                    <NavLink
                      style={{ textDecoration: 'none' }}
                      className={({ isActive }) => {
                        isActive ? setTicket(true) : setTicket(false)
                      }}
                      to="feedback-tickets"
                    >
                      <li className={isTicket ? 'active-bg' : ''}>
                        <span>My Tickets</span>
                      </li>
                    </NavLink>
                    <NavLink
                      style={{ textDecoration: 'none' }}
                      className={({ isActive }) => {
                        isActive ? setIsOpenTicket(true) : setIsOpenTicket(false)
                      }}
                      to="open-tickets"
                    >
                      <li className={isOpenTicket ? ' active-bg' : ''}>
                        <span>My Open Tickets</span>
                      </li>
                    </NavLink>
                    <NavLink
                      style={{ textDecoration: 'none' }}
                      className={({ isActive }) => {
                        isActive
                          ? setIsCloseTicket(true)
                          : setIsCloseTicket(false)
                      }}
                      to="close-tickets"
                    >
                      <li className={isCloseTicket ? ' active-bg' : ''}>
                        <span>My Closed Tickets</span>
                      </li>
                    </NavLink>
                  </ul>
                </Collapse>
                <NavLink style={{ textDecoration: 'none' }} to="/help">
                  <li>
                    <i className="fas fa-exclamation-circle"></i>
                    <span>Help</span>
                  </li>
                </NavLink>

                {/*  <li>
                  <i className="fas fa-cog"></i>
                  <span>Settings</span>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </WrappSideBarList>
  )
}

const WrappSideBarList = styled.div`
  position: sticky;
  top: 0;
  overflow-y: inherit;

  @media (max-width: 900px) {
    display: none;
  }
  @media (max-width: 1200px) {
    .profile {
      display: none;
    }
  }
  .nav_link {
    text-decoration: none;
  }
  .active {
    li {
      background: linear-gradient(92.71deg, #111e6c -64.5%, #4b5dc6 151.56%);
      border-radius: 5px;
      border-radius: 5px;
      color: #ffffff !important;
    }
  }
  .active-bg {
    color: #111e6c;
  }
  li {
    i {
      padding-right: 15px;
    }
  }
  span {
    padding-right: 20px;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    padding-left: 1.5rem;
  }
  li {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 17px;
    letter-spacing: -0.04em;
    text-align: left;
    color: #242424;
    cursor: pointer;
    padding: 15px;
    margin-bottom: 8px;
    text-decoration: none;
  }
`

export const ProfileSideBar = () => {
  return (
    <div style={{}}>
      <ProfileSideBarWrapper>
        <div className="text-center">
          <div className="pt-5">
            <img
              style={{ width: '70px', height: '30px' }}
              src={RFSLogoFullColour}
              alt="RFSLogo"
            />
          </div>
          <div style={{ paddingTop: '100px' }}>
            <img
              style={{ width: '191px', height: '255px' }}
              src={Discovery}
              alt="Discovery"
            />
          </div>
          <div style={{ paddingTop: '10px' }}>
            <h3>Almost There!</h3>
            <p>
              We only need a few info to <br /> review before unlocking your{' '}
              <br /> full access{' '}
            </p>
          </div>
        </div>
      </ProfileSideBarWrapper>
    </div>
  )
}

const ProfileSideBarWrapper = styled.div`
  background: #111e6c;
  height: 100vh;
  @media (max-width: 900px) {
    display: none;
  }
  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    text-align: center;
    color: #ffffff;
  }
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.15px;
    color: #bdbdbd;
  }
`
