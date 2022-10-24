import React, { useEffect } from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Switch from "react-switch";
import { getProducts, getCurrencies } from "../../../store/actions";
import Spinner from '../../../component/common/loading';
import { getCurrIcon } from '../Accesssories';

const PlanModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { singlePlan, loading } = useSelector((state) => state.plan);
  const plan = singlePlan?.data.body ? singlePlan?.data.body : {}
  const planStatus = singlePlan?.data.statusCode
  const { currencies  } = useSelector((state) => state.currencies);
  const currencies_list = currencies?.data.body ? currencies?.data.body: []
  const current_currency = currencies_list.find(item=>item.id===plan?.currency?.id)?.name

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCurrencies());
  },[])

  return (
    <Wrapper>
      { loading ? (
        <div className="vh-100 w-100">
          <Spinner />
        </div>
      ) : 
        planStatus === "OK" && (
          <div style={{width: "fit-content"}}>
            <div 
              className=" d-flex justify-content-between flex-nowrap plan-row" 
              style={{marginBottom:27}} 
            >
              <div >
                <p style={{fontSize:14,fontWeight:600}} >{plan.planName} </p>
                <p>
                  {plan?.product.productName}
                </p>
              </div>
              <div >
                <button className='button-close' onClick={handleClose} >
                  <i
                    style={{ cursor: 'pointer' }}
                    className="fa-solid fa-xmark"
                  ></i> {"  "}
                  Close
                </button>
              </div>
            </div>
            <div className='d-flex justify-content-between flex-nowrap plan-row no-gutters' >
              <div >
                <p className='p-light' >Start date</p>
                <p className='p-dark' >{plan.planSummary.startDate} </p>
              </div>
              <div className='right' >
                <p className='p-light' >Maturity date</p>
                <p className='p-dark' >{plan?.planSummary.endDate} </p>
              </div>
            </div>
            <div className='container-fluid mb-4'>
              <svg width="346" height="1" viewBox="0 0 346 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.6" x2="346" y2="0.6" stroke="#E0E0E0" stroke-width="0.8" stroke-dasharray="5 5"/>
              </svg>
            </div>
            <div className=' d-flex justify-content-between flex-nowrap plan-row no-gutters' >
              <div>
                <p className='p-light' >Target</p>
                <p className='p-dark flex' >
                  {getCurrIcon(current_currency)}{plan.targetAmount} 
                </p>
              </div>
              <div className='right' >
                <p className='p-light' >Monthly contribution</p>
                <p className='p-dark flex justify-content-end'>
                  {getCurrIcon(current_currency)}{plan.contributionValue} 
                </p>
              </div>
            </div>
            <div className=' d-flex justify-content-between flex-nowrap plan-row no-gutters' >
              <div >
                <p className='p-light' >Principal</p>
                <p className='p-dark flex' >
                  {getCurrIcon(current_currency)}{plan.planSummary.principal} 
                </p>
              </div>
              <div className='right'>
                <p className='p-light' >Tenor</p>
                <p className='p-dark' >
                  {plan?.tenor?.tenorName}
                </p>
              </div>
            </div>
            <div className='container-fluid mb-4'>
              <svg width="346" height="1" viewBox="0 0 346 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.6" x2="346" y2="0.6" stroke="#E0E0E0" stroke-width="0.8" stroke-dasharray="5 5"/>
              </svg>
            </div>
            <div className=' d-flex justify-content-between flex-nowrap plan-row no-gutters' >
              <div >
                <p className='p-light' >Interest rate</p>
                <p className='p-dark' >{plan.interestRate}%</p>
              </div>
              <div className='right' >
                <p className='p-light' >Interest earned</p>
                <p className='p-dark flex justify-content-end' >
                  {getCurrIcon(current_currency)}{plan.planSummary.calculatedInterest}
                </p>
              </div>
            </div>
            <div className=' d-flex justify-content-between flex-nowrap plan-row no-gutters' >
              <div >
                <p className='p-light' >Interest payment frequency</p>
                <p className='p-dark' >
                  {plan.planSummary.interestReceiptOption} 
                </p>
              </div>
              <div className='right' >
                <p className='p-light' >Current balance</p>
                <p className='p-dark flex justify-content-end' >
                  {getCurrIcon(current_currency)}100
                </p>
              </div>
            </div>
            <div className='container-fluid mb-4'>
              <svg width="346" height="1" viewBox="0 0 346 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.6" x2="346" y2="0.6" stroke="#E0E0E0" stroke-width="0.8" stroke-dasharray="5 5"/>
              </svg>
            </div>
            <div className=' d-flex justify-content-between flex-nowrap plan-row no-gutters' >
              <div >
                <p className='p-light' >Payment Type</p>
                <p className='p-dark' >{plan.paymentMethod} </p>
              </div>
              <div className='right'>
                <p className='p-light' >Direct Debit Option</p>
                <p className='p-dark' >
                  {plan.directDebit ? "Yes" : "No"}
                </p>
              </div>
            </div>
            <div className=' d-flex justify-content-between flex-nowrap plan-row no-gutters' >
              <div>
                <p className='p-light' >Number of Tickets</p>
                <p className='p-dark' >{plan.numberOfTickets} </p>
              </div>
              <div className='right' >
                <p className='p-light' >Auto Renewal</p>
                <p className='p-dark' >
                  <Switch
                    className="mr-2 mt-1"
                    onColor="#111E6C"
                    offColor="#E0E0E0"
                    checked={plan.autoRenew}
                    uncheckedIcon={false}
                    width={35}
                    height={18}
                  />
                </p>
              </div>
            </div>
          </div>
        )
      }
    </Wrapper>
  )
}

export default PlanModal

const Wrapper = styled.div`
  padding: 22px 35px;
  position: relative;
  .plan-row {
    display: flex;
    width: 100%;
  }
  .button-close {
    background: transparent;
    color: #111E6C;
    text-decoration: underline;
    font-size: 14px;
    font-weight: 600;
  }
  .right {
    text-align: right;
  }
  .p-dark {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 14px;
  }
  .p-light {
    font-size: 11px;
    color: #242424;
    font-weight: 300;
    letter-spacing: -0.01em;
    line-height: 14px;
  }
  .divider {
    position: absolute;
    width: 100%;
    border-bottom: 0.8px dotted #E0E0E0;
  }
  .flex {
    display: flex;
    gap: 4px;
  }
`