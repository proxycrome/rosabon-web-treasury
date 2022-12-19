import React, { useState, useEffect } from "react";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import styled from "styled-components";
import { Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import { Toaster } from "react-hot-toast";
import { getReplies, getSingleTicket, postReply } from "../../../store/actions";
import Spinner from "../../common/loading";

const AdminMessage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [reply, setReply] = useState("");

  const { single_ticket, replies, loading } = useSelector(
    (state) => state.feedback
  );
  const ticket = single_ticket ? single_ticket : {};
  const messages = replies ? replies : [];

  useEffect(() => {
    dispatch(getReplies(parseInt(id)));
    dispatch(getSingleTicket(parseInt(id)));
  }, []);

  console.log({ replies });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      content: reply,
      images: [],
      ticketId: parseInt(id),
      title: moment(),
      platform: "TREASURY",
    };
    await dispatch(postReply(form));
    await dispatch(getReplies(parseInt(id)));
    await setReply("");
  };

  return (
    <div>
      <WrapperBody>
        <Toaster />
        <ProfileNavBar>
          <NavTitle>
            <span className="fw-bold">Feedback</span>
          </NavTitle>
        </ProfileNavBar>
        {loading ? (
          <div className="vh-100 w-100">
            <Spinner />
          </div>
        ) : (
          <>
            <Wrapper>
              <h4 className="title">Title </h4>
              <p className="p-0 m-0">{ticket?.title} </p>
              {messages.map((item) => (
                <div key={item.id}>
                  {item.replyType === "USER_REPLY" ? (
                    <div className="user-box mt-4">
                      <h4 className="">Your Message</h4>
                      <p className="p-0 m-0">{item.content} </p>
                      <small className="my-2">{item.createdAt}</small>
                    </div>
                  ) : (
                    <div className="message mt-4">
                      <h4>Admin</h4>
                      <p className="p-0 m-0">{item.content} </p>
                      <small className="my-2">{item.createdAt}</small>
                    </div>
                  )}
                </div>
              ))}
            </Wrapper>
            <WrapperFooter className="">
              <form
                onSubmit={handleSubmit}
                className="d-flex align-items-center justify-content-between msg"
              >
                <div className="input-group">
                  <Input
                    type="text"
                    className="form-control"
                    name="reply"
                    placeholder="Type your message"
                    value={reply}
                    disabled={ticket?.status === "CLOSED"}
                    onChange={(e) => setReply(e.target.value)}
                  />
                </div>
                <div className="ml-2">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={reply === ""}
                  >
                    {loading ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>
            </WrapperFooter>
          </>
        )}
      </WrapperBody>
    </div>
  );
};

export default AdminMessage;

const WrapperBody = styled.div`
  height: 100vh;
`;

const NavTitle = styled.div`
  display: flex;
  flex-direction: column;
  h2,
  span {
    text-align: left;
  }
  @media (max-width: 500px) {
    h2,
    span {
      display: none;
    }
  }
`;

const Wrapper = styled.div`
  width: 95%;
  height: calc(90% - 141px);
  padding-right: 40%;
  padding-left: 50px;
  padding-top: 50px;
  padding-bottom: 50px;
  overflow-y: auto;
  @media (max-width: 900px) {
    padding-right: 20%;
    input {
      width: 100%;
    }
  }
  @media (max-width: 650px) {
    width: 100%;
    padding-right: 50px;
    padding-left: 50px;
  }
  .select-field {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #242424;
    padding: 15px;
  }
  h4 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 150%;
    letter-spacing: -0.15px;
    color: #242424;
    /* padding-top: 50px; */
    /* padding-bottom: 20px; */
  }
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 161.9%;
    letter-spacing: -0.01em;
    color: #242424;
  }
  .message {
    margin-left: 250px;
    width: 300px;
    padding: 20px 20px 5px 20px;
    background: #87CEEB;
    border-radius: 10px 10px 0px 10px;
    p {
      color: #ffffff;
      font-weight: 600;
    }
    h4 {
      color: #ffffff;
    }
    small {
      color: #ffffff;
      font-size: 10px;
      display: flex;
      justify-content: end;
    }
  }

  .user-box {
    background: #111e6c;
    padding: 20px 20px 5px 20px;
    border-radius: 10px 10px 10px 0px;
    width: 300px;
    p {
      color: #ffffff;
      font-weight: 600;
    }
    h4 {
      color: #ffffff;
    }
    small {
      color: #ffffff;
      font-size: 10px;
      display: flex;
      justify-content: end;
    }
  }
`;

const WrapperFooter = styled.div`
  padding-right: 40%;
  padding-left: 50px;
  padding-top: 20px;
  width: 95%;
  .grey_btn {
    font-size: 14px;
    width: 120px;
    height: 53px;
    background: #f2f2f2;
    border-radius: 15px;
    color: #111e6c;
    margin-right: 2rem;
  }
  input {
    width: 100%;
    height: 53px;
    background-color: #f8f8f8;
    border-radius: 20px;
    padding-left: 37px;
    border: none;
  }
  .msg {
    gap: 19px;
  }
`;
