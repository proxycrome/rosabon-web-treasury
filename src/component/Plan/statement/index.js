import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { Label, Input } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import {
  getPlans,
  getSinglePlan,
  getSinglePlanHistory,
  getWalletTransactions,
} from "../../../store/actions";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import moment from "moment";

const Statement = () => {
  const date = {
    startDate: "",
    endDate: "",
  };
  const [category, setCategory] = useState("");
  const [planId, setPlanId] = useState();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(date);
  const [filteredWalletTransactions, setFilteredWalletTransactions] = useState(
    []
  );
  const [filteredPlanTransactions, setFilteredPlanTransactions] = useState([]);
  const dispatch = useDispatch();

  const { plans, single_plan_history, singlePlan } = useSelector(
    (state) => state.plan
  );
  const { walletTransactions } = useSelector((state) => state.wallet);
  const userPlans = plans?.data.body ? plans?.data.body : [];
  const planHistory = single_plan_history ? single_plan_history?.content : [];
  const walletHistory = walletTransactions ? walletTransactions?.entities : [];
  const plan = singlePlan?.data.body ? singlePlan?.data.body : {};

  const checkHistoryDisplay = () => {
    let history = [];
    if (category === "WALLET") {
      history = walletHistory;
    } else if (category === "PLAN" && planId) {
      history = planHistory;
    }
    return history;
  };

  const viewableUserPlans = userPlans.filter(
    (data) => data.planStatus !== "PENDING"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (category === "WALLET") dispatch(getWalletTransactions());
  }, [category]);

  useEffect(() => {
    if (planId) {
      dispatch(getSinglePlanHistory(parseInt(planId)));
      dispatch(getSinglePlan(planId));
    }
  }, [planId]);

  useEffect(() => {
    dispatch(getWalletTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (category === "PLAN") {
      const filteredPlanHistory = checkHistoryDisplay()?.filter((item) => {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        const itemDate = moment(item.dateOfTransaction, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        );

        // console.log(itemDate);
        const date = new Date(itemDate);

        return date >= startDate && date <= endDate;
      });
      setFilteredPlanTransactions(filteredPlanHistory);
    }

    if (category === "WALLET") {
      const filteredWalletTrans = checkHistoryDisplay()?.filter((item) => {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        const itemDate = moment(item.transactionDate, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        );

        console.log(itemDate);
        const date = new Date(itemDate);

        return date >= startDate && date <= endDate;
      });
      setFilteredWalletTransactions(filteredWalletTrans);
    }
  }, [formData]);

  useEffect(() => {
    dispatch(getPlans());
  }, []);

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
      filteredPlanTransactions.length > 0 || 
      (formData.startDate !== "" && formData.endDate !== "") 
    )
      ? filteredPlanTransactions.map((item) => ({
          id: `${item?.transactionId}`,
          date: `${moment(item.dateOfTransaction, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )}`,
          description: `${item?.description}`,
          type: `${item?.type}`,
          amount: `${item?.amount}`,
          balance: `${item?.balance}`,
        }))
      : checkHistoryDisplay()?.map((item) => ({
          id: `${item?.transactionId}`,
          date: `${moment(item.dateOfTransaction, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )}`,
          description: `${item?.description}`,
          type: `${item?.type}`,
          amount: `${item?.amount}`,
          balance: `${item?.balance}`,
        }));

  const planData = {
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
        label: `Amount (${plan?.currency?.name})`,
        field: "amount",
        width: 100,
      },
      {
        label: `Balance (${plan?.currency?.name})`,
        field: "balance",
        width: 100,
      },
    ],
    rows: history_list,
  };

  const walletData = {
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
        label: "Amount (NGN)",
        field: "amount",
        width: 100,
      },
      {
        label: "Balance (NGN)",
        field: "balance",
        width: 100,
      },
    ],
    rows:
      (
        filteredWalletTransactions?.length > 0 || 
        (formData.startDate !== "" && formData.endDate !== "") 
      )
        ? filteredWalletTransactions?.map((data) => ({
            id: `${data?.transactionId}`,
            date: `${moment(
              data?.transactionDate?.split(" ")[0],
              "DD-MM-YYYY"
            ).format("DD-MM-YYYY")}`,
            description: `${data?.transactionCategory}`,
            type: `${data?.transactionType}`,
            amount: `${
              data?.transactionType === "CREDIT"
                ? "+ " + data?.debit?.toLocaleString()
                : "- " + data?.debit?.toLocaleString()
            }`,
            balance: `${data?.balanceAfterTransaction?.toLocaleString()}`,
          }))
        : checkHistoryDisplay()?.map((data) => ({
            id: `${data?.transactionId}`,
            date: `${data?.transactionDate?.split(" ")[0]}`,
            description: `${data?.transactionCategory}`,
            type: `${data?.transactionType}`,
            amount: `${
              data?.transactionType === "CREDIT"
                ? "+ " + data?.debit?.toLocaleString()
                : "- " + data?.debit?.toLocaleString()
            }`,
            balance: `${data?.balanceAfterTransaction?.toLocaleString()}`,
          })),
  };

  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);

  const generatePDF = () => {
    const transaction = new JsPDF({
      orientation: "landscape",
      unit: "pt",
      size: "A4",
    });
    if (category === "WALLET") {
      // autoTable(transaction, { html: '#wallet-table' })
      autoTable(transaction, {
        head: [walletData?.columns?.map((item) => item?.label)],
        body: [...walletData?.rows?.map((item) => Object.values(item))],
      });
    }

    if (category === "PLAN" && planId) {
      autoTable(transaction, {
        head: [planData?.columns?.map((item) => item?.label)],
        body: [...planData?.rows?.map((item) => Object.values(item))],
      });
    }
    transaction.setFontSize(10);
    transaction.save("transaction.pdf");
  };

  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Statement</span>
        </NavTitle>
      </ProfileNavBar>
      <HistoryTableWarapper>
        <h4>Choose a time frame for your statement</h4>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-sm-4 col-md-6">
                  <div className=" ">
                    <div className="mb-4">
                      <label>Category</label>
                      <div className="input-group mb-4 mt-1">
                        <select
                          className="form-select form-select-md mb-3 select-field"
                          aria-label=".form-select-md"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          name="category"
                        >
                          <option value="">Choose Category</option>
                          <option value="WALLET">Wallet</option>
                          <option value="PLAN">Plan</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {category === "PLAN" && (
                  <div className="col-sm-4 col-md-6">
                    <div className=" ">
                      <div className="mb-4">
                        <label>Plan</label>
                        <div className="input-group mb-4 mt-1">
                          <select
                            className="form-select form-select-md mb-3 select-field"
                            aria-label=".form-select-md"
                            onChange={(e) => setPlanId(e.target.value)}
                            name="Plan"
                            value={planId}
                          >
                            <option value="">Select Plan</option>
                            {viewableUserPlans?.map((data) => (
                              <option key={data.id} value={data.id}>
                                {data.planName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="row">
                <div className="col-sm-4 col-md-6">
                  <div className=" ">
                    <div className="mb-4">
                      <Label>Start Date</Label>
                      <Input
                        className="form-control"
                        placeholder="Start date"
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 col-md-6">
                  <div className=" ">
                    <div className="mb-4">
                      <Label>End Date</Label>
                      <Input
                        className="form-control"
                        placeholder="End date"
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="mb-5">
          {formData.startDate &&
            formData.endDate &&
            `${month[startDate.getMonth()]} ${startDate.getDate()} - ${
              month[endDate.getMonth()]
            } ${endDate.getDate()}`}
        </h3>
        

        {category === "WALLET" ? (
          <div>
            <div>
              <MDBDataTable
                responsive
                striped
                data={walletData}
                searching={false}
                id="wallet-table"
              />
            </div>
          </div>
        ) : planId ? (
          <div>
            <div>
              <MDBDataTable
                responsive
                striped
                data={planData}
                searching={false}
                id="plan-table"
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {category === "WALLET" || category === "PLAN" ? (
          <div className="row">
            <div className="d-flex justify-content-center my-5">
              <button
                className="btn-view"
                onClick={generatePDF}
                disabled={
                  walletData.rows.length === 0 || planData.rows.length === 0
                }
              >
                Download Pdf
              </button>
            </div>
          </div>
        ) : null}
      </HistoryTableWarapper>
    </div>
  );
};

export default Statement;

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

const HistoryTableWarapper = styled.div`
  padding: 30px;
  tr {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #242424;
    cursor: pointer;
  }
  th {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #000000;
  }
  th,
  td {
    padding: 20px;
  }
  input {
    background: #fbf8f8;
    border-radius: 5px;
  }
  h3 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #000000;
    padding-top: 50px;
  }
  .grey-text {
    color: #bdbdbd;
    cursor: pointer;
  }
  h4 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 150%;
    letter-spacing: -0.15px;
    color: #242424;
    padding-top: 30px;
    padding-bottom: 20px;
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
