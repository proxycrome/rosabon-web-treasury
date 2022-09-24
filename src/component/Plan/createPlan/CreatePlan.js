import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ChoosePlanHolder from "../../../asset/chooseplaneHolder.png";
import { Collapse } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { getCatWithProducts } from "../../../redux/actions/product/productCategoriesAction";
import { getSingleProduct } from "../../../redux/actions/product/productAction";

const CreatePlan = () => {
  const [open, setOpen] = useState(false);

  const { catWithProducts, catWithProductsError } = useSelector((state) => state.product)
  const productStatus = catWithProducts?.statusCode
  const products = catWithProducts?.data.body ? catWithProducts?.data.body : []

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCatWithProducts());
  }, [])

  const handleSingleProduct = (id) => {
    dispatch(getSingleProduct(id));
  }

  // console.log(open)
  return (
    <Wrapper>
      {
        productStatus === "OK" ? 
         products.map((item) => (
          <div className=" pb-5" key={item.productCategoryId} >
            <div>
              <div className="d-flex align-items-center justify-content-between savins-drop">
                <h5>{item.productCategoryName} </h5>
                <div>
                  {open ? (
                    <i
                      onClick={() => setOpen(!open)}
                      className="fa-solid fa-chevron-up"></i>
                  ) : (
                    <i
                      onClick={() => setOpen(!open)}
                      className="fa-solid fa-chevron-down"></i>
                  )}
                </div>
              </div>
              <p className="para-header">
                Choose from a {item.productCategoryName} plan
              </p>
            </div>
            <div className="plan-list">
              {item.products.map((product) => (
                <div className="choose-plan" key={product.id}>
                  <div className="d-flex align-items-center justify-content-around">
                    <img
                      className="image-holder"
                      src={product.imgUrl === "" ? product.imgUrl : ChoosePlanHolder}
                      alt="ChoosePlanHolder"
                    />
                    <div>
                      <h5>{product.productName} </h5>
                      <div>
                        {/* <p className="p-0 m-0 pb-2">
                          Lorem Ipsum is simply dummy text of the{" "}
                        </p>
                        <p className="p-0 m-0 pb-2">
                          {" "}
                          printing and typesetting industry.
                        </p>
                        <p className="p-0 m-0 pb-2">
                          Lorem Ipsum is simply dummy text of the{" "}
                        </p> */}
                        {product.productDescription}
                      </div>
                    </div>
                  </div>
                  <Link to="/create-plan" onClick={() => handleSingleProduct(product.id)} >
                    <button>Create Plan</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
         ))
        : (<></>)
      }
      {/* <div>
        <div>
          <div className="d-flex align-items-center justify-content-between savins-drop">
            <h5>Fix Savings </h5>
            <div>
              {open ? (
                <i
                  onClick={() => setOpen(!open)}
                  className="fa-solid fa-chevron-up"></i>
              ) : (
                <i
                  onClick={() => setOpen(!open)}
                  className="fa-solid fa-chevron-down"></i>
              )}
            </div>
          </div>
          <p className="para-header">Choose from a fixed savings plan</p>
        </div>
        <div className="plan-list">
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div>
          <div className="d-flex align-items-center justify-content-between savins-drop">
            <h5>Target Savings </h5>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <p className="para-header">Choose from a Target savings plan</p>
        </div>
        <div className="plan-list">
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div>
          <div className="d-flex align-items-center justify-content-between savins-drop">
            <h5>Target Income </h5>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <p className="para-header">Choose from a Target Income plan</p>
        </div>
        <div className="plan-list">
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
        </div>
      </div> */}
    </Wrapper>
  );
};

export default CreatePlan;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  width: 90%;
  padding-left: 30px;
  @media (max-width: 1200px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media (max-width: 970px) and (min-width: 800px) {
    .image-holder {
      display: none;
    }
    .choose-plan {
      width: 358px !important;
      height: 213px;
      padding: 10px 5px;
      > div {
        display: block !important;
        margin-left: 30px !important;
      }
      button {
        margin-left: 30px !important;
      }
    }
  }
  @media (max-width: 800px) {
    padding: 0 5rem;
    .image-holder {
      display: none;
    }
    .choose-plan {
      width: 448px !important;
      height: 213px;
      padding: 10px 5px;
      > div {
        display: block !important;
        margin-left: 30px !important;
      }
      button {
        margin-left: 30px !important;
      }
    }
    .plan-list {
      grid-template-columns: repeat(1, 1fr) !important;
    }
  }
  @media (max-width: 600px) {
    padding: 0 1rem;
    .choose-plan {
      width: 90% !important;
      height: 213px;
      padding: 10px 5px;
    }
  }
  .choose-plan {
    width: 448px;
    height: 213px;
    background: #ffffff;
    box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
    border-radius: 8px;
    padding: 30px 10px;
    margin-top: 30px;
    margin-right: 20px;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 148.4%;
      display: flex;
      align-items: flex-end;
      letter-spacing: -0.01em;
      color: #4f4f4f;
    }
    button {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: right;
      letter-spacing: -0.03em;
      color: #111e6c;
      background: #f2f2f2;
      border-radius: 10px;
      outline: none;
      border: none;
      padding: 10px 30px;
      margin-left: 140px;
      margin-top: 10px;
    }
  }
  .plan-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;
