import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import ModalComponent from '../../../ModalComponent';
import { TransactionPreview } from '../../../Accessories/BVNConfirm';


const TransactionDetails = () => {
  const [modalState, setModalState] = useState(false);

  const data = {
    columns: [
      {
        label: 'ID',
        field: 'id',
        width: 150,
      },
      {
        label: 'Date',
        field: 'date',
        width: 100,
      },
      {
        label: 'Description',
        field: 'description',
        width: 100,
      },
      {
        label: 'Type',
        field: 'type',
        width: 100,
      },
      {
        label: 'Amount',
        field: 'amount',
        width: 100,
      },
      {
        label: 'Balance',
        field: 'balance',
        width: 100,
      },
    ],
    rows: [
      {
        id: (
          <Link to="#" onClick={() => setModalState(true)}>
            <div>NO_1947034</div>
          </Link>
        ),
        date: 'Apr 18 2022',
        description: 'Part-withdrawal',
        type: 'Debit',
        amount: '- ₦1,500,000',
        balance: '₦1,000,000',
      },
      {
        id: 'NO_1947034',
        date: 'Apr 18 2022',
        description: 'Part-withdrawal',
        type: 'Debit',
        amount: '- ₦1,500,000',
        balance: '₦1,000,000',
      },
      {
        id: 'NO_1947034',
        date: 'Apr 18 2022',
        description: 'Part-withdrawal',
        type: 'Debit',
        amount: '- ₦1,500,000',
        balance: '₦1,000,000',
      },
      {
        id: 'NO_1947034',
        date: 'Apr 18 2022',
        description: 'Part-withdrawal',
        type: 'Debit',
        amount: '- ₦1,500,000',
        balance: '₦1,000,000',
      },
      {
        id: 'NO_1947034',
        date: 'Apr 18 2022',
        description: 'Part-withdrawal',
        type: 'Debit',
        amount: '- ₦1,500,000',
        balance: '₦1,000,000',
      },
      {
        id: 'NO_1947034',
        date: 'Apr 18 2022',
        description: 'Part-withdrawal',
        type: 'Debit',
        amount: '- ₦1,500,000',
        balance: '₦1,000,000',
      },
      {
        id: 'NO_1947034',
        date: 'Apr 18 2022',
        description: 'Part-withdrawal',
        type: 'Debit',
        amount: '- ₦1,500,000',
        balance: '₦1,000,000',
      },
      {
        id: 'NO_1947034',
        date: 'Apr 18 2022',
        description: 'Part-withdrawal',
        type: 'Debit',
        amount: '- ₦1,500,000',
        balance: '₦1,000,000',
      },
      {
        id: 'NO_1947034',
        date: 'Apr 18 2022',
        description: 'Part-withdrawal',
        type: 'Debit',
        amount: '- ₦1,500,000',
        balance: '₦1,000,000',
      },
      {
        id: 'NO_1947034',
        date: 'Apr 18 2022',
        description: 'Part-withdrawal',
        type: 'Debit',
        amount: '- ₦1,500,000',
        balance: '₦1,000,000',
      },
      {
        id: 'NO_1947034',
        date: 'Apr 18 2022',
        description: 'Part-withdrawal',
        type: 'Debit',
        amount: '- ₦1,500,000',
        balance: '₦1,000,000',
      },
    ],
  };

  return (
    <>
      <Wrapper>
        <div className="row d-flex justify-content-between align-items-center mb-5">
          <div className="col-md-6 col-sm-12">
            <h6>Filter By Transaction Date</h6>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder="Start Date"
                    type="text"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="End Date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="mb-3">
            <h4>April 28 - May 13</h4>
          </div>
        </div>
        <div>
          <MDBDataTable responsive striped bordered data={data} />
        </div>
        <ModalComponent
          show={modalState}
          size={'md'}
          handleClose={() => setModalState(false)}
        >
          <TransactionPreview
            handleClose={() => setModalState(false)}
          />
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
