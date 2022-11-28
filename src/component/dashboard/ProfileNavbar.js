import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from "reactstrap";
import {
  getAuthUsers,
  getNotification,
  logout,
  readNotification,
  toggleSidebar,
} from "../../store/actions";
import arrow from "../../asset/Arrow.png";
import avatar from "../../asset/avi.jpg";

export function ProfileNavBar({ children, view, feedback }) {
  const [menu, setMenu] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user_profile);
  const { users } = profile;

  const { notifications } = useSelector((state) => state.notification);
  const unreadNotifications = notifications?.filter(
    (item) => item.readStatus === "UNREAD"
  );

  const toggle = () => {
    setMenu(!menu);
  };

  const handleClick = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = (e) => {
    dispatch(logout(navigate, dispatch));
  };

  useEffect(() => {
    const tokenString = JSON.parse(localStorage.getItem("token"));
    if (tokenString) {
      dispatch(getAuthUsers());
    } else {
      navigate("/login");
    }
    dispatch(getNotification());
  }, [dispatch, navigate]);

  return (
    <WrappeNavBar>
      <div className="shadow-sm pe-4">
        <div className="profile_nav py-2">
          <div className="page-title mx-3">{children}</div>
          <div className="hamburger mx-5" onClick={handleClick} style={{ cursor: "pointer" }}>
            <i className="fa fa-bars"></i>
          </div>
          <ul className="d-flex justify-content-end">
            <li className="profile_nav_bel">
              <Badge badgeContent={unreadNotifications?.length} color="primary">
                <DropDown
                  notifications={unreadNotifications}
                  viewNote={view}
                  dispatch={dispatch}
                />
              </Badge>
            </li>
            <li>
              <Dropdown
                isOpen={menu}
                toggle={toggle}
                className="d-inline-block user-dropdown"
              >
                <DropdownToggle
                  tag="a"
                  className="btn header-item waves-effect border-0"
                  id="page-header-user-dropdown"
                >
                  <span className="d-none d-xl-inline-block ml-1 text-transform mx-2">
                    {users && users.role === "COMPANY"
                      ? users.company.name
                      : users && users.role === "INDIVIDUAL_USER"
                      ? users.individualUser.firstName
                      : ""}
                  </span>
                  <img
                    className="rounded-circle header-profile-user mr-3"
                    src={avatar}
                    width="50"
                    alt="Avatar"
                  />
                  <i className="fa-solid fa-chevron-down mx-2"></i>
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <NavLink className="nav_link" to="/profile">
                      <div>
                        <i className="ri-user-line align-middle mr-1"></i>{" "}
                        Profile
                      </div>
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem className="text-danger" onClick={handleLogout}>
                    <i className="ri-shut-down-line align-middle mr-1 text-danger"></i>{" "}
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </WrappeNavBar>
  );
}

const WrappeNavBar = styled.div`
  width: 100%;
  // position: sticky;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(98, 134, 154, 0.12);
  text-align: right;
  top: 0;
  z-index: 1000;

  .page-title h2 {
    font-size: 20px !important;
  }

  @media (min-width: 1201px) {
    .hamburger {
      display: none;
    }
  }

  @media only screen and (min-width: 0px) and (max-width: 1200px) {
    width: 100%;
    top: 0;
    left: 0;
    .page-title {
      display: none;
    }
    .hamburger {
      font-size: 30px;
    }
  }
  .nav_link {
    text-decoration: none;
  }
  .profile_nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-bell {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f2f2f2;
    border-radius: 5px;
    padding: 8px;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .fa-bell {
    font-size: 16px;
  }
`;

const Notification = styled.div`
  width: 360px;
  height: 50vh;
  overflow-y: scroll;
  header {
    padding: 20px;
  }
`;

export const DropDown = ({ status, notifications, viewNote, dispatch }) => {
  const [menu, setMenu] = useState(false);
  const [getStatus, setGetStatus] = useState("");

  const [col1, setCol1] = useState("");

  const t_col1 = (val) => {
    if (col1 === val) {
      setCol1("");
      setGetStatus("");
    } else {
      setCol1(val);
      setGetStatus("READ");
      dispatch(readNotification(val));
    }
  };

  const handleClose = () => {
    setMenu(false);
    dispatch(getNotification());
  };

  useEffect(() => {
    setMenu(viewNote);
  }, [viewNote]);

  const toggle = () => {
    setMenu(!menu);
  };

  return (
    <Dropdown
      isOpen={menu}
      toggle={toggle}
      className="d-inline-block user-dropdown"
    >
      <DropdownToggle
        tag="a"
        className="btn waves-effect outline-0 border-0"
        id="page-header-user-dropdown"
      >
        <span className="nav-bell">
          <i className="fas fa-bell" id="note"></i>
        </span>
      </DropdownToggle>
      <DropdownMenu end className="">
        <Notification>
          <header>
            <div>
              <img src={arrow} alt="arrow" onClick={handleClose} />
            </div>
          </header>

          {notifications?.length > 0 ? (
            notifications?.map((data) => (
              <div
                style={{
                  padding: "10px 20px",
                  border: "1px solid #ccc",
                }}
                className="mb-1 mx-1"
                key={data.id}
              >
                <h6
                  className="pb-3 d-flex gap-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => t_col1(data.id)}
                >
                  <small
                    className={
                      data.readStatus === "READ" ||
                      (data.readStatus === "READ" &&
                        getStatus === "READ" &&
                        col1 === data.id)
                        ? "text-success"
                        : data.readStatus === "UNREAD" &&
                          getStatus === "READ" &&
                          col1 === data.id
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {getStatus === "READ" && col1 === data.id
                      ? getStatus
                      : data.readStatus}
                    :
                  </small>
                  {data?.message?.split(" ")?.slice(0, 7)?.join(" ")}...
                </h6>
                <Collapse isOpen={col1 === data.id}>
                  <p className="pb-3">{data.message}</p>
                </Collapse>
              </div>
            ))
          ) : (
            <div
              className="d-flex justify-content-end align-items-center"
              style={{ width: "100%", height: "70%" }}
            >
              <h3 style={{ textAlign: "center", color: "#ccc" }}>
                No Available Notifications
              </h3>
            </div>
          )}
        </Notification>
      </DropdownMenu>
    </Dropdown>
  );
};
