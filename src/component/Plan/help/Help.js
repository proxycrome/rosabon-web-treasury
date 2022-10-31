import React, { useState, useEffect } from "react";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import styled from "styled-components";
import { Input, Collapse } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getFaq } from "../../../store/actions";
import Spinner from "../../common/loading";

const Help = () => {
  const [col1, setCol1] = useState("");
  // const [searchData, setSearchData] = useState("");

  const t_col1 = (val) => {
    if (col1 === val) {
      setCol1("");
    } else {
      setCol1(val);
    }
  };
  const dispatch = useDispatch();
  const { faqs, loading } = useSelector((state) => state.help);

  useEffect(() => {
    dispatch(getFaq());
  }, [dispatch]);
  return (
    <div>
      <WrapperBody>
        <ProfileNavBar className="shadow-lg">
          <NavTitle>
            <span className="fw-bold">FAQ</span>
          </NavTitle>
        </ProfileNavBar>
        {loading ? (
          <div className="vh-100 w-100">
            <Spinner />
          </div>
        ) : (
          <Wrapper>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="w-50">Frequently Asked Questions</h3>
              <div className="input-group w-50 position-relative search-group">
                {/* <Input
                placeholder="Search Using Keywords"
                type="text"
                className="form-control"
              />
              <i className="fa-solid fa-magnifying-glass position-absolute search"></i>
              <i className="fa-solid fa-xmark position-absolute clear"></i> */}
              </div>
            </div>
            <hr className="my-5" />
            <div className="accordion" id="accordionExample">
              {faqs?.data?.body?.map((data) => (
                <div className="accordion-item" key={data.id}>
                  <h2
                    className="accordion-header"
                    id="heading"
                    onClick={() => t_col1(data.id)}
                  >
                    <div
                      className={`accordion-button ${
                        col1 === data.id ? "" : "collapsed"
                      }`}
                      style={{ backgroundColor: "#FFFFFF" }}
                      type="button"
                    >
                      {data.faqCategory.name}
                    </div>
                  </h2>
                  <Collapse isOpen={col1 === data.id}>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <h5>{data.question}</h5>
                        <p className="p-0 m-0">{data.answer}</p>
                      </div>
                    </div>
                  </Collapse>
                </div>
              ))}
            </div>
          </Wrapper>
        )}
      </WrapperBody>
    </div>
  );
};

export default Help;

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
  width: 80%;
  padding-right: 10%;
  padding-left: 50px;
  padding-top: 50px;
  @media (max-width: 900px) {
    padding-right: 20%;
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
  h3 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #222222;
  }
  h4 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.01em;
    color: #242424;
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
  h5 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.01em;
    color: #4f4f4f;
  }
  input {
    width: 440px;
    height: 50px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    letter-spacing: -0.01em;
    color: #bdbdbd;
  }

  .search-group {
    width: auto;
    height: auto;
    .search {
      color: #828282;
      top: 30%;
      left: 10px;
    }
    .clear {
      color: #828282;
      top: 30%;
      right: 10px;
    }
  }
`;
