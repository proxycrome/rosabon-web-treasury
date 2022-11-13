import {
  CLEAR_TRANSACTIONS,
  CLEAR_WALLET_BALANCE,
  GET_EACH_WALLET_TRANSACTION,
  GET_EACH_WALLET_TRANSACTION_ERROR,
  GET_EACH_WALLET_TRANSACTION_SUCCESS,
  GET_MY_DEPOSIT_ACTIVITIES,
  GET_MY_DEPOSIT_ACTIVITIES_ERROR,
  GET_MY_DEPOSIT_ACTIVITIES_SUCCESS,
  GET_MY_REFERRALS,
  GET_MY_REFERRALS_ERROR,
  GET_MY_REFERRALS_SUCCESS,
  GET_MY_REFERRAL_ACTIVITIES,
  GET_MY_REFERRAL_ACTIVITIES_ERROR,
  GET_MY_REFERRAL_ACTIVITIES_SUCCESS,
  GET_REFERRAL_REDEEM_THRESHOLD,
  GET_REFERRAL_REDEEM_THRESHOLD_ERROR,
  GET_REFERRAL_REDEEM_THRESHOLD_SUCCESS,
  GET_SPECIAL_EARNING_ACTIVITIES,
  GET_SPECIAL_EARNING_ACTIVITIES_ERROR,
  GET_SPECIAL_EARNING_ACTIVITIES_SUCCESS,
  GET_TOTAL_EARNING,
  GET_TOTAL_EARNING_ERROR,
  GET_TOTAL_EARNING_SUCCESS,
  GET_TOTAL_REDEEMED_EARNING,
  GET_TOTAL_REDEEMED_EARNING_ERROR,
  GET_TOTAL_REDEEMED_EARNING_SUCCESS,
  GET_WALLET_BALANCE,
  GET_WALLET_BALANCE_ERROR,
  GET_WALLET_BALANCE_SUCCESS,
  GET_WALLET_TRANSACTIONS,
  GET_WALLET_TRANSACTIONS_ERROR,
  GET_WALLET_TRANSACTIONS_SUCCESS,
  POKE_USER,
  POKE_USER_ERROR,
  POKE_USER_SUCCESS,
  POST_TRANSFER_TO_PLAN,
  POST_TRANSFER_TO_PLAN_ERROR,
  POST_TRANSFER_TO_PLAN_SUCCESS,
  REDEEEM_SPECIAL_EARNING,
  REDEEEM_SPECIAL_EARNING_ERROR,
  REDEEEM_SPECIAL_EARNING_SUCCESS,
  REDEEM_REFERRAL_BONUS,
  REDEEM_REFERRAL_BONUS_ERROR,
  REDEEM_REFERRAL_BONUS_SUCCESS,
  REQUEST_WITHDRAWAL,
  REQUEST_WITHDRAWAL_ERROR,
  REQUEST_WITHDRAWAL_SUCCESS,
} from "./actionTypes";

const initialState = {
  loading: false,
  walletBalance: null,
  walletBalanceError: null,
  walletTransactions: null,
  walletTransError: null,
  withdrawMsg: null,
  withdrawMsgError: null,
  transaction: null,
  transactionError: null,
  myReferrals: null,
  myReferralsError: null,
  transferMsg: null,
  transferMsgError: null,
  pokeMsg: null,
  pokeMsgError: null,
  refActivities: null,
  refActivitiesError: null,
  refRedeemMsg: null,
  refRedeemError: null,
  depositActivites: null,
  depositActivitesError: null,
  referralThreshold: null,
  referralThresholdError: null,
  redeemEarningMsg: null,
  redeemEarningError: null,
  specialEarnings: null,
  specialEarningsError: null,
  totalEarning: null,
  totalEarningError: null,
  totalRedeemedEarning: null,
  totalRedeemedEarningError: null,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
    case GET_WALLET_BALANCE:
    case GET_WALLET_TRANSACTIONS:
      state = {
        ...state,
        loading: true,
      };
      break;

    case GET_WALLET_BALANCE_SUCCESS:
      state = {
        ...state,
        loading: false,
        walletBalance: action.payload,
        walletBalanceError: null,
      };
      break;

    case GET_WALLET_BALANCE_ERROR:
      state = {
        ...state,
        loading: false,
        walletBalance: null,
        walletBalanceError: action.payload,
      };
      break;

    case CLEAR_WALLET_BALANCE:
      state = {
        ...state,
        walletBalance: null,
        walletBalanceError: null,
      };
      break;

    case GET_WALLET_TRANSACTIONS_SUCCESS:
      state = {
        ...state,
        loading: false,
        walletTransactions: action.payload,
        walletTransError: null,
      };
      break;

    case GET_WALLET_TRANSACTIONS_ERROR:
      state = {
        ...state,
        loading: false,
        walletTransError: action.payload,
        walletTransactions: null,
      };
      break;

    case CLEAR_TRANSACTIONS:
      state = {
        ...state,
        walletTransactions: null,
        walletTransError: null,
      };
      break;

    case REQUEST_WITHDRAWAL:
      state = {
        ...state,
        loading: true,
        withdrawMsg: null,
        withdrawMsgError: null,
      };
      break;

    case REQUEST_WITHDRAWAL_SUCCESS:
      state = {
        ...state,
        loading: false,
        withdrawMsg: action.payload,
        withdrawMsgError: null,
      };
      break;

    case REQUEST_WITHDRAWAL_ERROR:
      state = {
        ...state,
        loading: false,
        withdrawMsg: null,
        withdrawMsgError: action.payload,
      };
      break;

    case GET_EACH_WALLET_TRANSACTION:
      state = {
        ...state,
        loading: true,
        transaction: null,
        transactionError: null,
      };
      break;

    case GET_EACH_WALLET_TRANSACTION_SUCCESS:
      state = {
        ...state,
        loading: false,
        transaction: action.payload,
        transactionError: null,
      };
      break;

    case GET_EACH_WALLET_TRANSACTION_ERROR:
      state = {
        ...state,
        loading: false,
        transaction: null,
        transactionError: action.payload,
      };
      break;

    case GET_MY_REFERRALS:
      state = {
        ...state,
        loading: true,
        myReferrals: null,
        myReferralsError: null,
      };
      break;

    case GET_MY_REFERRALS_SUCCESS:
      state = {
        ...state,
        loading: false,
        myReferrals: action.payload,
        myReferralsError: null,
      };
      break;

    case GET_MY_REFERRALS_ERROR:
      state = {
        ...state,
        loading: false,
        myReferrals: null,
        myReferralsError: action.payload,
      };
      break;

    case POST_TRANSFER_TO_PLAN:
      state = {
        ...state,
        loading: true,
        transferMsg: null,
        transferMsgError: null,
      };
      break;

    case POST_TRANSFER_TO_PLAN_SUCCESS:
      state = {
        ...state,
        loading: false,
        transferMsg: action.payload,
        transferMsgError: null,
      };
      break;

    case POST_TRANSFER_TO_PLAN_ERROR:
      state = {
        ...state,
        loading: false,
        transferMsg: null,
        transferMsgError: action.payload,
      };
      break;

    case POKE_USER:
      state = {
        ...state,
        loading: true,
        pokeMsg: null,
        pokeMsgError: null,
      };
      break;

    case POKE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        pokeMsg: action.payload,
        pokeMsgError: null,
      };
      break;

    case POKE_USER_ERROR:
      state = {
        ...state,
        loading: false,
        pokeMsg: null,
        pokeMsgError: action.payload,
      };
      break;

    case GET_MY_REFERRAL_ACTIVITIES:
      state = {
        ...state,
        loading: true,
        refActivities: null,
        refActivitiesError: null,
      };
      break;

    case GET_MY_REFERRAL_ACTIVITIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        refActivities: action.payload,
        refActivitiesError: null,
      };
      break;

    case GET_MY_REFERRAL_ACTIVITIES_ERROR:
      state = {
        ...state,
        loading: false,
        refActivities: null,
        refActivitiesError: action.payload,
      };
      break;

    case REDEEM_REFERRAL_BONUS:
      state = {
        ...state,
        loading: true,
        refRedeemMsg: null,
        refRedeemError: null,
      };
      break;

    case REDEEM_REFERRAL_BONUS_SUCCESS:
      state = {
        ...state,
        loading: false,
        refRedeemMsg: action.payload,
        refRedeemError: null,
      };
      break;

    case REDEEM_REFERRAL_BONUS_ERROR:
      state = {
        ...state,
        loading: false,
        refRedeemMsg: null,
        refRedeemError: action.payload,
      };
      break;

    case GET_MY_DEPOSIT_ACTIVITIES:
      state = {
        ...state,
        loading: true,
        depositActivites: null,
        depositActivitesError: null,
      };
      break;

    case GET_MY_DEPOSIT_ACTIVITIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        depositActivites: action.payload,
        depositActivitesError: null,
      };
      break;

    case GET_MY_DEPOSIT_ACTIVITIES_ERROR:
      state = {
        ...state,
        loading: false,
        depositActivites: null,
        depositActivitesError: action.payload,
      };
      break;

    case GET_REFERRAL_REDEEM_THRESHOLD:
      state = {
        ...state,
        loading: true,
        referralThreshold: null,
        referralThresholdError: null,
      };
      break;

    case GET_REFERRAL_REDEEM_THRESHOLD_SUCCESS:
      state = {
        ...state,
        loading: false,
        referralThreshold: action.payload,
        referralThresholdError: null,
      };
      break;

    case GET_REFERRAL_REDEEM_THRESHOLD_ERROR:
      state = {
        ...state,
        loading: false,
        referralThreshold: null,
        referralThresholdError: action.payload,
      };
      break;

    case REDEEEM_SPECIAL_EARNING:
      state = {
        ...state,
        loading: true,
        redeemEarningMsg: null,
        redeemEarningError: null,
      };
      break;

    case REDEEEM_SPECIAL_EARNING_SUCCESS:
      state = {
        ...state,
        loading: false,
        redeemEarningMsg: action.payload,
        redeemEarningError: null,
      };
      break;

    case REDEEEM_SPECIAL_EARNING_ERROR:
      state = {
        ...state,
        loading: false,
        redeemEarningMsg: null,
        redeemEarningError: action.payload,
      };
      break;

    case GET_SPECIAL_EARNING_ACTIVITIES:
      state = {
        ...state,
        loading: true,
        specialEarnings: null,
        specialEarningsError: null,
      };
      break;

    case GET_SPECIAL_EARNING_ACTIVITIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        specialEarnings: action.payload,
        specialEarningsError: null,
      };
      break;

    case GET_SPECIAL_EARNING_ACTIVITIES_ERROR:
      state = {
        ...state,
        loading: false,
        specialEarnings: null,
        specialEarningsError: action.payload,
      };
      break;

    case GET_TOTAL_EARNING:
      state = {
        ...state,
        loading: true,
        totalEarning: null,
        totalEarningError: null,
      };
      break;

    case GET_TOTAL_EARNING_SUCCESS:
      state = {
        ...state,
        loading: false,
        totalEarning: action.payload,
        totalEarningError: null,
      };
      break;

    case GET_TOTAL_EARNING_ERROR:
      state = {
        ...state,
        loading: false,
        totalEarning: null,
        totalEarningError: action.payload,
      };
      break;

    case GET_TOTAL_REDEEMED_EARNING:
      state = {
        ...state,
        laoding: true,
        totalRedeemedEarning: null,
        totalRedeemedEarningError: null,
      };
      break;

    case GET_TOTAL_REDEEMED_EARNING_SUCCESS:
      state = {
        ...state,
        laoding: false,
        totalRedeemedEarning: action.payload,
        totalRedeemedEarningError: null,
      };
      break;

    case GET_TOTAL_REDEEMED_EARNING_ERROR:
      state = {
        ...state,
        laoding: false,
        totalRedeemedEarning: null,
        totalRedeemedEarningError: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default wallet;
