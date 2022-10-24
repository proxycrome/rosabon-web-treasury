import React from 'react';
import { usePaystackPayment } from 'react-paystack';

export const Paystack = ({email, amount}) => {
  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: amount,
    publicKey: process.env.PAYSTACK_PK,
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const initializePayment = usePaystackPayment(config);
  return (
    <div>Paystack</div>
  )
};