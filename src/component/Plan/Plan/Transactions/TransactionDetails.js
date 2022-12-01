import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Label, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import ModalComponent from "../../../ModalComponent";
import { TransactionPreview } from "../../../Accessories/BVNConfirm";
import { getSinglePlanHistory } from "../../../../store/actions";
import moment from "moment";

const TransactionDetails = () => {
  const date = {
    startDate: "",
    endDate: "",
  };
  const [modalState, setModalState] = useState(false);
  const [formData, setFormData] = useState(date);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getSinglePlanHistory(parseInt(id)));
  }, []);

  const { single_plan_history } = useSelector((state) => state.plan);
  const history = single_plan_history ? single_plan_history?.content : [];
  console.log(history);

  useEffect(() => {
    const filteredPlanHistory = history?.filter((item) => {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      const itemDate = moment(item.dateOfTransaction, "YYYY-MM-DD").format(
        "YYYY-MM-DD"
      );

      // console.log(itemDate);
      const date = new Date(itemDate);

      return date >= startDate && date <= endDate;
    });
    setFilteredHistory(filteredPlanHistory);
  }, [formData]);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const history_list =
    (
      filteredHistory.length > 0 || 
      (formData.startDate !== "" && formData.endDate !== "") 
    )
      ? filteredHistory.map((item) => ({
          id: `${item?.transactionId}`,
          date: `${moment(item.dateOfTransaction, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )}`,
          description: `${item?.description}`,
          type: `${item?.type}`,
          amount: `₦ ${item?.amount}`,
          balance: `₦ ${item?.balance}`,
        }))
      : history?.map((item) => ({
          id: `${item?.transactionId}`,
          date: `${moment(item.dateOfTransaction, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )}`,
          description: `${item?.description}`,
          type: `${item?.type}`,
          amount: `₦ ${item?.amount}`,
          balance: `₦ ${item?.balance}`,
        }));

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        width: 150,
      },
      {
        label: "Date",
        field: "date",
        width: 100,
      },
      {
        label: "Description",
        field: "description",
        width: 100,
      },
      {
        label: "Type",
        field: "type",
        width: 100,
      },
      {
        label: "Amount",
        field: "amount",
        width: 100,
      },
      {
        label: "Balance",
        field: "balance",
        width: 100,
      },
    ],
    rows: history_list,
  };

  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);

  return (
    <>
      <Wrapper>
        <div className="row top d-flex justify-content-between">
          <div className="col-md-6 col-sm-12">
            <h3>Filter By Transaction Date</h3>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="d-flex flex-column">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    className="form-control"
                    placeholder="Start date"
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="d-flex flex-column">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    className="form-control"
                    placeholder="End date"
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="mb-3">
            <h4>
              {formData.startDate &&
                formData.endDate &&
                `${month[startDate.getMonth()]} ${startDate.getDate()} - ${
                  month[endDate.getMonth()]
                } ${endDate.getDate()}`}
            </h4>
          </div>
        </div>
        <div>
          <MDBDataTable responsive striped data={data} searching={false} />
        </div>
        <ModalComponent
          show={modalState}
          size={"md"}
          handleClose={() => setModalState(false)}
        >
          <TransactionPreview handleClose={() => setModalState(false)} />
        </ModalComponent>
      </Wrapper>
    </>
  );
};

export default TransactionDetails;

const Wrapper = styled.div`
  padding: 40px;
  .plan-content {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 30px
  }
  @media (max-width: 996px) {
    .plan-content {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      padding: 40px;
    }
  }
  @media (max-width: 750px) {
    .plan-content {
      display: grid !important;
      grid-template-columns: repeat(1, 1fr) !important;
      padding: 50px;
    }
  }
  @media (max-width: 500px) {
    .plan-content {
      padding: 20px;
    }
  }

  .top {
    height: 150px;
  }

  .dotted {
    width: 100%;
    background: #f9fafb;
    height: 4px;
    border: 0.8px dashed #e0e0e0;
  }
  .horizontal-line {
  }
  .horizontal-circle-left {
    z-index: 5;
    background: #f9fafb;
    border-radius: 0px 30px 30px 0px;
    width: 26px;
    height: 26px;
  }
  .horizontal-circle-right {
    background: #f9fafb;
    border-radius: 0px 30px 30px 0px;
    transform: matrix(-1, 0, 0, 1, 0, 0);
    width: 26px;
    height: 26px;
  }
  .plan {
    width: 100%;
    height: 263px;
    background: #ffffff;
    box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.47);
    border-radius: 8px;
    h4 {
      font-weight: 700;
      font-size: 13px;
      line-height: 18px;
    }
    p {
      font-weight: 300;
      font-size: 13px;
      line-height: 16px;
    }
    .Active, .Pending, .Matured {
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      letter-spacing: -0.01em;
    }
    .Active {
      color: #219653;
    }
    .Pending {
      color: #F2994A;
    }
    .Matured {
      color: #2D9CDB;
    }
  }
  input {
    background: #fbf8f8;
    border-radius: 5px;
  }
  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #242424;
  }
  .btn-view {
    width: 328px;
    height: 54px;
    background: #F2F2F2;
    border-radius: 10px;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px
    color: #111E6C;
  }
`;
