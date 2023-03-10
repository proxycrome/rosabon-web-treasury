import React, { useState, useEffect, createContext, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ChoosePlanHolder from "../../../asset/chooseplaneHolder.png";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import { UncontrolledTooltip, Input } from "reactstrap";
import PlanPay from "./PlanPay";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { formatCurrValue, getCurrIcon, paymentAtMaturity } from "../Accesssories";
import {
  getCurrencies,
  getExRates,
  getInvestmentRates,
  getProducts,
  getSingleProduct,
  getTenor,
  getWithholdingTax,
  testDebitCard,
} from "../../../store/actions";
import { useMemo } from "react";
import Spinner from "../../common/loading";

export const PlanContext = createContext(null);

const PlanForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [conValue, setConValue] = useState("targetAmount");
  const { products, loading } = useSelector((state) => state.product);
  const { currencies } = useSelector((state) => state.currencies);
  const { exRates, investment_rates, withholding_tax } = useSelector(
    (state) => state.plan
  );
  // const { currencies } = useSelector((state) => state.currencies);
  // handle validation
  const [validate, setValidate] = useState(false);

  const productStatus = products?.statusCode;
  const product = products?.data?.body
    ? products?.data?.body.find((item) => item.id === parseInt(id))
    : {};
  const ex_rates = exRates?.data.body
    ? exRates?.data?.body?.filter((item) => item.status === "ACTIVE")
    : [];
  const withhold_tax = withholding_tax?.data.body
    ? withholding_tax?.data?.body
    : [];
  const inv_rates = investment_rates?.data.body
    ? investment_rates?.data?.body?.filter((item) => item.status === "ACTIVE")
    : [];
  const currencies_list = currencies?.data.body
    ? currencies?.data?.body?.filter((item) => item.status === "ACTIVE")
    : [];
  let date = new Date();
  const recentDate = moment(date).format("YYYY-MM-DD");

  useEffect(() => {
    dispatch(getExRates());
    dispatch(getCurrencies());
    dispatch(getTenor());
    dispatch(getSingleProduct(parseInt(id)));
    dispatch(getProducts());
    dispatch(getWithholdingTax());
    dispatch(getInvestmentRates());
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const [confirmPeriodicPay, setConfirmperiodicPay] = useState(false);
  const [formData, setFormData] = useState({
    product: product?.id,
    productCategory: product?.productCategory?.id,
    planName: "",
    currency: "",
    exchangeRate: "",
    amount: "",
    targetAmount: "",
    tenor: "",
    planDate: recentDate,
    savingFrequency: "",
    weeklyContributionDay: "",
    monthlyContributionDay: 0,
    interestReceiptOption: "",
    planStatus: "PENDING",
    contributionValue: "",
    directDebit: false,
    interestRate: 0.0,
    acceptPeriodicContribution: true,
    actualMaturityDate: "",
    autoRollOver: false,
    numberOfTickets: 0,
    autoRenew: false,
    dateCreated: recentDate,
    allowsLiquidation: false,
    planSummary: null,
    paymentMethod: "DEBIT_CARD",
    nameOfDirectDebitCard: null,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      product: product?.id,
      productCategory: product?.productCategory?.id,
    });
  }, [id]);

  const [summary, setSummary] = useState({
    planName: "",
    startDate: "",
    endDate: "",
    principal: 0.0,
    interestRate: 0,
    interestReceiptOption: "",
    calculatedInterest: 0.0,
    withholdingTax: 0,
    paymentMaturity: 0.0,
  });

  // calculate minimum and maximum tenor
  let minTenor = { tenorDays: Infinity };
  let maxTenor = { tenorDays: 0 };
  if (product?.tenors) {
    if (product.tenors?.length > 1) {
      product.tenors?.forEach((item) =>
        item.tenorDays < minTenor.tenorDays ? (minTenor = item) : null
      );
      product.tenors?.forEach((item) =>
        item.tenorDays > maxTenor.tenorDays ? (maxTenor = item) : null
      );
    } else {
      minTenor = product?.tenors[0]?.tenorDays;
      maxTenor = product?.tenors[0]?.tenorDays;
    }
    minTenor = moment(recentDate).add(minTenor?.tenorDays, "days")?._d;
    maxTenor = moment(recentDate).add(maxTenor?.tenorDays, "days")?._d;
  }

  const checkAtMaturity =
    formData.actualMaturityDate &&
    (formData.tenor === 0 || formData.tenor === null);

  const computeTenorDays = useCallback(() => {
    if (checkAtMaturity) {
      const customTenorDays = moment(formData.actualMaturityDate).diff(
        recentDate,
        "days"
      );

      const selectedTenor = product?.tenors?.filter(
        (item) => customTenorDays < item.tenorDays
      );

      function findMinValue(arr) {
        if (arr?.length) {
          let min = Infinity;

          for (let obj of arr) {
            min = obj?.tenorDays < min ? obj?.tenorDays : min;
          }

          return min;
        }
      }

      return findMinValue(selectedTenor);
    } else {
      return product?.tenors?.find(
        (item) => item.id === parseInt(formData.tenor)
      )?.tenorDays;
    }
  }, [formData.actualMaturityDate, formData.tenor]);

  // final update on the user plan details before switching to next screen
  useEffect(() => {
    if (isClicked) {
      let selectedTenor = product?.tenors?.find(
        (item) => item.id === parseInt(formData.tenor)
      );

      let endDate = moment(recentDate).add(
        selectedTenor?.tenorDays,
        "days"
      )?._d;
      setFormData({
        ...formData,
        product: product.id,
        productCategory: product.productCategory?.id,
        exchangeRate: formData.currency === "NGN" ? 1 : formData.exchangeRate,
        actualMaturityDate: checkAtMaturity
          ? moment(formData.actualMaturityDate).format("YYYY-MM-DD")
          : moment(endDate).format("YYYY-MM-DD"),
        contributionValue:
          formData.contributionValue === "" ? 0 : parseFloat(formData.contributionValue)?.toFixed(2),
        amount: formData.amount === "" ? 0 : parseFloat(formData.amount)?.toFixed(2),
        targetAmount: formData.targetAmount === "" ? 0 : parseFloat(formData.targetAmount)?.toFixed(2),
        currency: currencies_list.find(
          (item) => item.name === formData.currency
        )?.id,
        numberOfTickets: updateNumOfTickets(
          product?.properties?.hasTargetAmount
            ? formData.targetAmount
            : formData.amount
        ),
        monthlyContributionDay:
          formData.savingFrequency === "MONTHLY"
            ? formData.monthlyContributionDay
            : null,
        weeklyContributionDay:
          formData.savingFrequency === "WEEKLY"
            ? formData.weeklyContributionDay
            : null,
        tenor: checkAtMaturity ? null : formData.tenor,
        planSummary: summary,
        directDebit:
          formData.directDebit === "true" || formData.directDebit === true
            ? true
            : false,
        autoRollOver:
          formData.autoRollOver === "true" || formData.autoRollOver === true
            ? true
            : false,
        allowsLiquidation:
          formData.allowsLiquidation === "true" ||
          formData.allowsLiquidation === true
            ? true
            : false,
        // interestRate: fetchIntRate(formData.interestReceiptOption),
        savingFrequency:
          formData.savingFrequency !== "" ? formData.savingFrequency : null,
      });
    } else {
      setFormData({
        ...formData,
        tenor: checkAtMaturity ? 0 : formData.tenor,
        currency: currencies_list.find((item) => item.id === formData.currency)
          ?.name,
      });
    }
  }, [isClicked]);

  const [validSavingsFreq, setValidSavingsFreq] = useState(true);

  // function to compute target amount and computed value
  const contribValue = () => {
    const selectedTenor = product.tenors?.find(
      (item) => item.id === parseInt(formData.tenor)
    );

    const customTenorDays = moment(formData.actualMaturityDate).diff(
      recentDate,
      "days"
    );

    if (product?.properties?.hasTargetAmount) {
      if (
        formData.savingFrequency !== "" && checkAtMaturity
          ? customTenorDays
          : selectedTenor?.tenorDays
      ) {
        if (conValue === "targetAmount" && formData.targetAmount) {
          let computedValue = null;
          switch (formData.savingFrequency) {
            case "DAILY":
              computedValue =
                formData.targetAmount /
                (checkAtMaturity ? customTenorDays : selectedTenor?.tenorDays);
              setValidSavingsFreq(true);
              break;

            case "WEEKLY":
              if (customTenorDays < 7 || selectedTenor?.tenorDays < 7) {
                computedValue = null;
                setValidSavingsFreq(false);
              } else {
                if (checkAtMaturity) {
                  computedValue =
                    formData.targetAmount / Math.floor(customTenorDays / 7);
                } else {
                  computedValue =
                    formData.targetAmount /
                    Math.floor(selectedTenor?.tenorDays / 7);
                }
              }
              break;

            case "MONTHLY":
              if (customTenorDays < 30 || selectedTenor?.tenorDays < 30) {
                computedValue = null;
                setValidSavingsFreq(false);
              } else {
                if (checkAtMaturity) {
                  computedValue =
                    formData.targetAmount / Math.floor(customTenorDays / 30);
                } else {
                  computedValue =
                    formData.targetAmount /
                    Math.floor(selectedTenor?.tenorDays / 30);
                }
              }
              break;

            default:
              computedValue = null;
              break;
          }
          setFormData({
            ...formData,
            contributionValue: parseFloat(computedValue).toFixed(2),
          });
        } else if (
          conValue === "contributionValue" &&
          formData.contributionValue
        ) {
          if (product?.properties?.hasTargetAmount) {
            let computedValue = null;
            switch (formData.savingFrequency) {
              case "DAILY":
                computedValue =
                  formData.contributionValue *
                  (checkAtMaturity
                    ? customTenorDays
                    : selectedTenor?.tenorDays);
                setValidSavingsFreq(true);
                break;

              case "WEEKLY":
                if (customTenorDays < 7 || selectedTenor?.tenorDays < 7) {
                  computedValue = null;
                  setValidSavingsFreq(false);
                } else {
                  if (checkAtMaturity) {
                    computedValue =
                      formData.contributionValue *
                      Math.floor(customTenorDays / 7);
                  } else {
                    computedValue =
                      formData.contributionValue *
                      Math.floor(selectedTenor?.tenorDays / 7);
                  }
                }

                break;

              case "MONTHLY":
                if (customTenorDays < 30 || selectedTenor?.tenorDays < 30) {
                  computedValue = null;
                  setValidSavingsFreq(false);
                } else {
                  if (checkAtMaturity) {
                    computedValue =
                      formData.contributionValue *
                      Math.floor(customTenorDays / 30);
                  } else {
                    computedValue =
                      formData.contributionValue *
                      Math.floor(selectedTenor?.tenorDays / 30);
                  }
                }
                break;

              default:
                computedValue = null;
                break;
            }
            setFormData({
              ...formData,
              targetAmount: parseFloat(computedValue).toFixed(2),
            });
          }
        }
      } else {
        setFormData({
          ...formData,
          contributionValue: 0,
        });
      }
    }
  };

  // function to get investment rate
  const fetchIntRate = (intRecOption) => {
    let interestRate;
    let principal = product?.properties?.hasTargetAmount
      ? formData.targetAmount
      : formData.amount;

    const customTenorDays = moment(formData.actualMaturityDate).diff(
      recentDate,
      "days"
    );

    const selectedTenor = product.tenors?.find(
      (item) => item.id === parseInt(formData.tenor)
    );

    const maxTenorDays = () => {
      if (checkAtMaturity) {
        return customTenorDays;
      } else {
        return selectedTenor?.tenorDays;
      }
    };

    const invRateCurrency = inv_rates
      ?.filter((data) => data.product.id === parseInt(id))
      ?.find((item) => item.currency.name === formData.currency)
      ?.currency?.name;

    const currency = ex_rates?.find((item) => item.name === formData.currency);

    const convPrincipal = () => {
      let convertPrincipal;
      if (invRateCurrency === currency?.name) {
        convertPrincipal = principal;
      }
      return convertPrincipal;
    };

    let rate = inv_rates?.find((item) => {
      return (
        item.product.id === parseInt(id) &&
        item.currency.name?.toLowerCase() === formData.currency?.toLowerCase() &&
        convPrincipal() >= item.minimumAmount &&
        convPrincipal() <= item.maximumAmount &&
        maxTenorDays() >= item.minimumTenor &&
        maxTenorDays() <= item.maximumTenor
      );
    });
    let directDebitRate = rate?.percentDirectDebit
      ? rate?.percentDirectDebit
      : 0;
    if (rate !== undefined) {
      switch (intRecOption) {
        case "MONTHLY":
          interestRate = rate?.monthlyInterestRate;
          break;

        case "UPFRONT":
          interestRate = rate?.upfrontInterestRate;
          break;

        case "QUARTERLY":
          interestRate = rate?.quarterlyInterestRate;
          break;

        case "BI_ANNUAL":
          interestRate = rate?.biAnnualInterestRate;
          break;

        case "MATURITY":
          interestRate = rate?.maturityRate;
          break;

        default:
          interestRate = null;
          break;
      }
      if (interestRate === null) {
        interestRate = formData.directDebit ? 0 + directDebitRate : null;
        // interestRate = formData.directDebit ? 0 : 0;
        return interestRate;
      } else {
        interestRate =
          formData.directDebit === true || formData.directDebit === "true"
            ? interestRate + directDebitRate
            : interestRate;
        return interestRate;
      }
    } else {
      interestRate = undefined;
      return interestRate;
    }
  };

  // side effect updates exchange rates
  // useEffect(() => {
  //   if(typeof formData.currency === 'string') {
  //     const currency = ex_rates?.find(item => item.name === formData.currency)
  //     setFormData({
  //       ...formData,
  //       exchangeRate: formData.currency === "NGN" ? 1 :
  //       Number(parseFloat(currency?.sellingPrice).toFixed(2))
  //     })
  //   }
  // }, [formData.currency])

  const calcContribValue = useMemo(
    () => contribValue(),
    [
      formData.savingFrequency,
      // formData.tenor,
      formData.targetAmount,
      formData.contributionValue,
      formData.actualMaturityDate,
    ]
  );

  // calculate simple interest
  const calculateSI = (principal, rate, time) => {
    const SI = (principal * rate * (time / 365)) / 100;
    return Math.round(SI * 100 + Number.EPSILON) / 100;
  };

  // Update user plan summary
  useEffect(() => {
    let selectedTenor = product?.tenors?.find(
      (item) => item.id === parseInt(formData.tenor)
    );
    let endDate = moment(recentDate).add(selectedTenor?.tenorDays, "days")?._d;
    // calculate principal

    const customTenorDays = moment(formData.actualMaturityDate).diff(
      recentDate,
      "days"
    );

    const calc_withholding_tax =
      Math.round(
        summary.calculatedInterest * (withhold_tax[0]?.rate / 100) * 100 +
          Number.EPSILON
      ) / 100;

    // }
    setSummary({
      ...summary,
      planName: formData.planName,
      startDate: formData.dateCreated,
      endDate: checkAtMaturity
        ? moment(formData.actualMaturityDate).format("YYYY-MM-DD")
        : moment(endDate).format("YYYY-MM-DD"),
      interestRate: formData.interestRate,
      principal:
        product?.properties?.hasTargetAmount &&
        product?.properties?.hasSavingFrequency
          ? formData.contributionValue
          : product?.properties?.hasTargetAmount
          ? formData.targetAmount
          : formData.amount,
      withholdingTax: calc_withholding_tax,
      // interestPaymentFrequency: formData.interestReceiptOption,
      interestReceiptOption: formData.interestReceiptOption,
      calculatedInterest: calculateSI(
        product?.properties?.hasTargetAmount
          ? formData.targetAmount
          : formData.amount,
        formData.interestRate,
        checkAtMaturity ? customTenorDays : selectedTenor?.tenorDays
      ),
      paymentMaturity: paymentAtMaturity(
        formData.interestReceiptOption,
        product?.properties?.hasTargetAmount
          ? formData.targetAmount
          : formData.amount,
        withhold_tax[0]?.rate,
        checkAtMaturity
          ? Math.floor(
              moment(formData.actualMaturityDate).diff(recentDate, "days") / 30
            )
          : Math.floor(selectedTenor?.tenorDays / 30),
        calculateSI(
          product?.properties?.hasTargetAmount
            ? formData.targetAmount
            : formData.amount,
          formData.interestRate,
          checkAtMaturity ? customTenorDays : selectedTenor?.tenorDays
        )
      ),
    });
  }, [
    formData.planName,
    formData.savingFrequency,
    formData.tenor,
    formData.interestRate,
    formData.interestReceiptOption,
    formData.targetAmount,
    formData.amount,
    formData.contributionValue,
    formData.actualMaturityDate,
    summary.calculatedInterest,
  ]);

  // side effect Update interest rate and exchange rate
  useEffect(() => {
    if (typeof formData.currency === "string") {
      const currency = ex_rates?.find(
        (item) => item.name === formData.currency
      );
      setFormData({
        ...formData,
        exchangeRate:
          formData.currency === "NGN"
            ? 1
            : formData.currency === ""
            ? ""
            : Number(parseFloat(currency?.buyingPrice).toFixed(2)),
        interestRate: fetchIntRate(formData.interestReceiptOption),
      });
    }
  }, [
    formData.interestReceiptOption,
    id,
    formData.targetAmount,
    formData.amount,
    formData.directDebit,
    formData.currency,
    formData.tenor,
    formData.actualMaturityDate,
  ]);

  // Update number of tickets based on target amount or amount to be placed value
  const updateNumOfTickets = (value) => {
    let ticketNo;
    if (product?.properties?.allowsMonthlyDraw) {
      if (value === null) {
        return null;
      } else {
        ticketNo = value / product?.minTransactionLimit;
        return Math.floor(ticketNo);
      }
    } else {
      return 0;
    }
  };

  // function to match names with interest receipt options
  const labelIntRecOpt = useCallback((value) => {
    let label;
    switch (value) {
      case "hasUpfrontInterestRate":
        label = "UPFRONT";
        break;

      case "hasMonthlyInterestRate":
        label = "MONTHLY";
        break;

      case "hasQuarterlyInterestRate":
        label = "QUARTERLY";
        break;

      case "hasBiAnnualInterestRate":
        label = "BI_ANNUAL";
        break;

      case "hasMaturityRate":
        label = "MATURITY";
        break;

      case "hasBackendUpfrontInterestRate":
        label = "BACKEND_UPFRONT";
        break;

      case "hasBackendMonthlyInterestRate":
        label = "BACKEND_MONTHLY";
        break;

      case "hasBackendQuarterlyInterestRate":
        label = "BACKEND_QUARTERLY";
        break;

      case "hasBackendBiAnnualInterestRate":
        label = "BACKEND_BI_ANNUAL";
        break;

      case "hasBackendMaturityRate":
        label = "BACKEND_MATURITY";
        break;
      default:
        break;
    }
    return label;
  }, []);

  useEffect(() => {
    if (
      formData.directDebit === "true" &&
      product?.properties?.hasSavingFrequency
    ) {
      const cardName = new Date().getTime().toString();
      setFormData({
        ...formData,
        nameOfDirectDebitCard: cardName,
      });

      const data = {
        cardName: cardName,
      };
      dispatch(testDebitCard(data));
    }
  }, [formData.directDebit]);

  if (isClicked && formData.planSummary !== null) {
    return (
      <PlanContext.Provider value={{ form: formData, setForm: setFormData }}>
        <PlanPay
          goBack={() => {
            setIsClicked(false);
            setFormData({
              ...formData,
              tenor: checkAtMaturity ? 0 : formData.tenor,
            });
          }}
        />
      </PlanContext.Provider>
    );
  }

  const back = () => {
    navigate("/plan-product");
  };

  // function to get the minimum allowed target value for target amount
  const calculateMinAllowTargetVal = (targetValue) => {
    if (targetValue !== null) {
      if (formData.tenor !== "") {
        let selectedTenor = product?.tenors?.filter(
          (item) => item.id === parseInt(formData.tenor)
        )[0];
        return product?.minTransactionLimit * selectedTenor?.tenorMonths;
      }
    }
  };

  // function to calculate the minimum allowed contribution value
  const calculateMinContribVal = (contribVal) => {
    if (contribVal !== null) {
      if (formData.tenor !== "") {
        let selectedTenor = product?.tenors?.find(
          (item) => item.id === parseInt(formData.tenor)
        );
        let minContrib;
        switch (formData.savingFrequency) {
          case "DAILY":
            minContrib =
              (product?.minTransactionLimit * selectedTenor?.tenorMonths) /
              selectedTenor?.tenorDays;
            break;

          case "WEEKLY":
            minContrib =
              (product?.minTransactionLimit * selectedTenor?.tenorMonths) /
              (selectedTenor?.tenorDays / 4);
            break;

          case "MONTHLY":
            minContrib =
              (product?.minTransactionLimit * selectedTenor?.tenorMonths) /
              Math.floor(selectedTenor?.tenorDays / 30);
            break;

          default:
            break;
        }
        return minContrib;
      }
    }
  };

  // handle changes on all inputs
  const handleChange = (e) => {
    if (e.target.type === "number") {
      if (e.target.name === "contributionValue") {
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.value === "" ? "" : Number(parseFloat(e.target.value)),
        });
        setConValue(e.target.name);
      } else if (e.target.name === "targetAmount") {
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.value === "" ? "" : Number(parseFloat(e.target.value)),
        });
        setConValue(e.target.name);
      } else {
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.value === "" ? "" : Number(parseFloat(e.target.value)),
        });
      }
    } else {
      if (e.target.name === "currency") {
        setFormData({
          ...formData,
          // [e.target.name]: Number(e.target.value)
          [e.target.name]: e.target.value,
        });
      } else if (e.target.name === "tenor") {
        if (typeof e.target.value === "number" && e.target.value) {
          setFormData({
            ...formData,
            [e.target.name]: Number(e.target.value),
          });
        } else {
          setFormData({
            ...formData,
            [e.target.name]: Number(e.target.value),
          });
        }
      } else if (e.target.name === "monthlyContributionDay") {
        setFormData({
          ...formData,
          [e.target.name]: Number(e.target.value),
        });
      } else {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  // validate plan form
  const handleValidate = () => {
    setValidate(true);
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !product?.properties?.hasSavingFrequency &&
      summary.paymentMaturity !== null
    ) {
      setIsClicked(true);
    } else {
      if (
        confirmPeriodicPay &&
        summary.paymentMaturity !== null &&
        validSavingsFreq
      ) {
        setIsClicked(true);
      }
    }
  };

  const arrowBtnPreventChange = (e) => {
    if (e.which === 38 || e.which === 40) {
      e.preventDefault();
    }
  };

  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately, on the next tick (after the current function is done)
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit}>
      {calcContribValue}
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Choose Plan</span>
        </NavTitle>
      </ProfileNavBar>

      {loading ? (
        <div className="vh-100 w-100">
          <Spinner />
        </div>
      ) : (
        productStatus === "OK" && (
          <>
            <Wrapper>
              {/*Interest receipt option UncontrolledTooltip */}
              <UncontrolledTooltip placement="top" target="intRecOpt">
                You have an option of choosing when to be paid your interest
              </UncontrolledTooltip>
              {/* Direct debit UncontrolledTooltip */}
              {product?.properties?.hasDirectDebit && (
                <UncontrolledTooltip placement="top" target="directDebit">
                  The direct debit mandate automatically deducts your
                  contribution value from your bank account at zero cost
                </UncontrolledTooltip>
              )}
              {/*Auto renew UncontrolledTooltip */}
              {product?.properties?.acceptsRollover && (
                <UncontrolledTooltip placement="top" target="autoRollOver">
                  Allows for fund to be automatically rolled over at maturity
                </UncontrolledTooltip>
              )}
              {product?.properties?.allowsLiquidation && (
                <UncontrolledTooltip placement="top" target="allowLiquidation">
                  Allows for you to withdraw before maturity
                </UncontrolledTooltip>
              )}
              <div className="choose-plan">
                <h5>{product.productName} </h5>
                <div className="d-flex align-items-center" style={{ gap: 16 }}>
                  <img
                    className="image-holder"
                    src={
                      product?.imageUrl?.length > 10
                        ? product.imageUrl
                        : ChoosePlanHolder
                    }
                    alt="Product"
                  />
                  <div>
                    <div>
                      {product.productDescription
                        .split(",")
                        .slice(0, 3)
                        ?.map((item, id) => (
                          <p key={id} className="p-0 m-0 pb-2">
                            {item}{" "}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="container-fluid">
                <div className="row">
                  <h4>Plan Details</h4>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-5">
                    <label>Plan Name</label>
                    <div className="input-group">
                      <Input
                        className={`form-control ${validate && "validate"}`}
                        name="planName"
                        placeholder="Enter a plan name"
                        type="text"
                        required
                        defaultValue={formData.planName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-5">
                    <label>Currency</label>
                    <div className="input-group">
                      <Input
                        className={`form-select form-select-md ${
                          validate && "validate"
                        }`}
                        type="select"
                        onChange={handleChange}
                        name="currency"
                        required
                        value={formData.currency}
                      >
                        <option value="" disabled hidden>
                          Select investment currency
                        </option>
                        {product?.currency
                          ?.filter((item) => item.status === "ACTIVE")
                          ?.map((item, id) => (
                            <option key={id} value={item.name}>
                              {item.name}{" "}
                            </option>
                          ))}
                      </Input>
                    </div>
                  </div>

                  <div className="col-md-6 mb-5">
                    <label>Exchange rate</label>
                    <div className="input-group">
                      <div className=" input-group-prepend curr-icon">
                        {formData.currency && getCurrIcon("NGN")}
                      </div>
                      <Input
                        className={`form-control ${
                          formData.currency !== "" && "curr-input"
                        }`}
                        name="exchangeRate"
                        placeholder=""
                        disabled
                        type="number"
                        value={formData.exchangeRate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {!product?.properties?.hasTargetAmount && (
                    <div className="col-md-6 mb-5">
                      <label>Amount to be placed</label>
                      <div className="input-group">
                        <div className="input-group-prepend curr-icon">
                          {getCurrIcon(formData.currency)}
                        </div>
                        <Input
                          className={`form-control ${
                            formData.currency !== "" && "curr-input"
                          }
                            ${validate && "validate"}`}
                          name="amount"
                          required
                          placeholder=""
                          type="number"
                          disabled={product?.properties?.hasTargetAmount}
                          defaultValue={formData.amount}
                          min={product?.minTransactionLimit}
                          max={product?.maxTransactionLimit}
                          step="0.001"
                          lang="nb"
                          onChange={handleChange}
                          onWheel={numberInputOnWheelPreventChange}
                          onKeyDown={arrowBtnPreventChange}
                        />
                      </div>
                      {!product?.properties?.hasTargetAmount &&
                      formData.amount < product?.minTransactionLimit ? (
                        <small className="helper-text">
                          Value cannot be below {product?.minTransactionLimit}
                        </small>
                      ) : (
                        <></>
                      )}
                      {!product?.properties?.hasTargetAmount &&
                      formData.amount > product?.maxTransactionLimit ? (
                        <small className="helper-text">
                          Value cannot be above {product?.maxTransactionLimit}
                        </small>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}

                  {product?.properties?.hasTargetAmount && (
                    <div className="col-md-6 mb-5">
                      <label>Target amount</label>
                      <div className="input-group">
                        <div className="input-group-prepend curr-icon">
                          {getCurrIcon(formData.currency)}
                        </div>
                        <Input
                          className={`form-control 
                            ${formData.currency !== "" && "curr-input"} ${
                            validate && "validate"
                          }`}
                          name="targetAmount"
                          placeholder=""
                          disabled={
                            product?.properties?.hasTargetAmount === null ||
                            !product?.properties?.hasTargetAmount
                          }
                          type="number"
                          required
                          value={formData.targetAmount}
                          min={product?.minTransactionLimit}
                          max={product?.maxTransactionLimit}
                          step="0.001"
                          lang="nb"
                          onChange={handleChange}
                          onWheel={numberInputOnWheelPreventChange}
                          onKeyDown={arrowBtnPreventChange}
                        />
                      </div>
                      {product?.properties?.hasTargetAmount &&
                      formData.targetAmount < product?.minTransactionLimit ? (
                        <small className="helper-text">
                          Target value cannot be below{" "}
                          {product?.minTransactionLimit}
                        </small>
                      ) : (
                        <></>
                      )}
                      {product?.properties?.hasTargetAmount &&
                      formData.targetAmount > product?.maxTransactionLimit ? (
                        <small className="helper-text">
                          Target value cannot be above{" "}
                          {product?.maxTransactionLimit}
                        </small>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}

                  <div className="col-md-6 mb-5">
                    <label>Tenor</label>
                    <Input
                      className={`form-select form-select-md ${
                        validate && "validate"
                      }`}
                      type="select"
                      name="tenor"
                      required
                      onChange={handleChange}
                      value={formData.tenor}
                    >
                      <option value="" disabled hidden>
                        Select tenor
                      </option>
                      {product?.tenors
                        ?.filter((data) => data.tenorStatus === "ACTIVE")
                        ?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.tenorName}{" "}
                          </option>
                        ))}
                      <option value={0} hidden={!product?.allowCustomization}>
                        Customize Tenor
                      </option>
                    </Input>
                    {formData.tenor === 0 && (
                      <Input
                        className={`form-control mt-2`}
                        style={{ width: "100%" }}
                        name="actualMaturityDate"
                        placeholder=""
                        type="date"
                        min={moment(minTenor).format("YYYY-MM-DD")}
                        max={moment(maxTenor).format("YYYY-MM-DD")}
                        value={formData.actualMaturityDate}
                        onChange={handleChange}
                      />
                    )}
                  </div>

                  {product?.properties?.hasSavingFrequency && (
                    <div className="col-md-6 mb-5">
                      <label>Savings frequency</label>
                      <div
                        className={`${
                          formData.savingFrequency === "WEEKLY" ||
                          formData.savingFrequency === "MONTHLY"
                            ? "d-lg-flex"
                            : ""
                        }`}
                        style={{ gap: 14 }}
                      >
                        <Input
                          className={`form-select form-select-md ${
                            validate && "validate"
                          }`}
                          type="select"
                          name="savingFrequency"
                          required
                          disabled={!product?.properties?.hasSavingFrequency}
                          onChange={handleChange}
                          defaultValue={formData.savingFrequency}
                        >
                          <option value="" hidden disabled>
                            Select savings frequency
                          </option>
                          <option value="DAILY">Daily</option>
                          <option value="WEEKLY">Weekly</option>
                          <option value="MONTHLY">Monthly</option>
                        </Input>
                        {formData.savingFrequency === "WEEKLY" && (
                          <Input
                            className={`form-select form-select-md option-select ${
                              validate && "validate"
                            }`}
                            name="weeklyContributionDay"
                            type="select"
                            onChange={handleChange}
                            defaultValue={formData.weeklyContributionDay}
                            required={formData.savingFrequency === "WEEKLY"}
                          >
                            <option value="" hidden disabled>
                              Set Weekly Contribution Day
                            </option>
                            <option value="MONDAY">MONDAY</option>
                            <option value="TUESDAY">TUESDAY</option>
                            <option value="WEDNESDAY">WEDNESDAY</option>
                            <option value="THURSDAY">THURSDAY</option>
                            <option value="FRIDAY">FRIDAY</option>
                            <option value="SATURDAY">SATURDAY</option>
                            <option value="SUNDAY">SUNDAY</option>
                          </Input>
                        )}
                        {formData.savingFrequency === "MONTHLY" && (
                          <Input
                            className={`form-select form-select-md option-select ${
                              validate && "validate"
                            }`}
                            name="monthlyContributionDay"
                            type="select"
                            onChange={handleChange}
                            defaultValue={formData.monthlyContributionDay}
                            required={formData.savingFrequency === "MONTHLY"}
                          >
                            <option value={0} hidden disabled>
                              Set Monthly Contibution Day
                            </option>
                            {[...Array(28).keys()].map((item) => (
                              <option key={item + 1} value={item + 1}>
                                {item + 1}{" "}
                              </option>
                            ))}
                          </Input>
                        )}
                      </div>
                      {validSavingsFreq === false ? (
                        <small className="helper-text text-danger">
                          Select a Valid Savings Frequency
                        </small>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}

                  <div className="col-md-6 mb-5">
                    <label>Interest Receipt Option</label>
                    <div className="input-group">
                      <Input
                        className={`form-select form-select-md ${
                          validate && "validate"
                        }`}
                        name="interestReceiptOption"
                        type="select"
                        required={
                          !formData.interestReceiptOption ||
                          summary.paymentMaturity === null
                        }
                        onChange={handleChange}
                        id="intRecOpt"
                        defaultValue={formData.interestReceiptOption}
                      >
                        <option value="" disabled hidden>
                          Select interest receipt option
                        </option>
                        {productStatus === "OK" &&
                          Object.entries(
                            product?.properties?.interestOptions ?? {}
                          ).map(
                            ([key, value]) =>
                              value === true && (
                                <option
                                  key={key}
                                  value={labelIntRecOpt(key)}
                                  style={{ textTransform: "capitalize" }}
                                  hidden={
                                    key === "hasBackendMaturityRate" ||
                                    key === "hasBackendUpfrontInterestRate" ||
                                    key === "hasBackendMonthlyInterestRate" ||
                                    key === "hasBackendQuarterlyInterestRate" ||
                                    key === "hasBackendBiAnnualInterestRate"
                                  }
                                >
                                  {labelIntRecOpt(key)?.toLowerCase()}
                                </option>
                              )
                          )}
                      </Input>
                    </div>
                    {summary.paymentMaturity === null ? (
                      <small className="helper-text text-danger">
                        Select a valid Interest receipt option
                      </small>
                    ) : (
                      <></>
                    )}
                  </div>

                  {product?.properties?.hasSavingFrequency && (
                    <div className="col-md-6 mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <label>Contribution value</label>
                      </div>
                      <div className="input-group">
                        <div className=" input-group-prepend curr-icon">
                          {getCurrIcon(formData.currency)}
                        </div>
                        <Input
                          className={`form-control ${
                            validate && "validate"
                          } curr-input`}
                          name="contributionValue"
                          placeholder=""
                          type="number"
                          value={formData.contributionValue}
                          onChange={handleChange}
                          step="0.001"
                          lang="nb"
                          disabled={!product?.properties?.hasSavingFrequency}
                          required={product?.properties?.hasTargetAmount}
                          onWheel={numberInputOnWheelPreventChange}
                          onKeyDown={arrowBtnPreventChange}
                        />
                      </div>
                      {product?.properties?.hasSavingFrequency && (
                        <>
                          <div className=" d-flex flex-column align-items-start">
                            <div className="d-flex align-items-start">
                              <label className="helper-text">
                                I agree to pay this amount periodically
                              </label>
                              <input
                                type="checkbox"
                                style={{
                                  width: 14,
                                  height: 14,
                                  marginTop: "5px",
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                                name="confirmPeriodicPay"
                                defaultValue={confirmPeriodicPay}
                                checked={confirmPeriodicPay}
                                required={
                                  product?.properties?.hasSavingFrequency
                                }
                                onChange={(e) => {
                                  setConfirmperiodicPay(!confirmPeriodicPay);
                                  e.target.setCustomValidity("");
                                }}
                                onInvalid={(e) => {
                                  e.target.setCustomValidity(
                                    "Kindly confirm periodic payment."
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {product?.properties?.hasDirectDebit && (
                    <div className="col-md-6 mb-5">
                      <label>Direct Debit</label>
                      <div className="input-group">
                        <Input
                          className="form-select form-select-md"
                          placeholder="Setup Direct Debit"
                          type="select"
                          onChange={handleChange}
                          name="directDebit"
                          disabled={!product?.properties?.hasDirectDebit}
                          id="directDebit"
                          value={formData.directDebit}
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Input>
                      </div>
                    </div>
                  )}

                  <div className="col-md-6 mb-5">
                    <label>Interest Rate (%)</label>
                    <div className="input-group">
                      <Input
                        className={`form-control ${validate && "validate"}`}
                        name="interestRate"
                        placeholder=""
                        type="number"
                        defaultValue={formData.interestRate}
                        required={!formData.interestRate}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>
                  {product?.properties?.allowsMonthlyDraw && (
                    <div className="col-md-6 mb-5">
                      <label>Number of tickets</label>
                      <div className="input-group">
                        <Input
                          className="form-control"
                          name="numberOfTickets"
                          placeholder=""
                          type="number"
                          disabled
                          value={updateNumOfTickets(
                            product?.properties?.hasTargetAmount
                              ? formData.targetAmount
                              : formData.amount
                          )}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}

                  {product?.properties?.acceptsRollover && (
                    <div className="col-md-6 mb-5">
                      <label>Auto renew</label>
                      <div className="input-group">
                        <Input
                          className="form-select form-select-md"
                          type="select"
                          placeholder=""
                          disabled={!product?.properties?.acceptsRollover}
                          name="autoRollOver"
                          onChange={handleChange}
                          id="autoRollOver"
                          value={formData.autoRollOver}
                        >
                          <option value="" disabled hidden>
                            Setup an option
                          </option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Input>
                      </div>
                    </div>
                  )}
                  {product?.properties?.allowsLiquidation && (
                    <div className="col-md-6 mb-4">
                      <label>Allow liquidation</label>
                      <div className="input-group">
                        <Input
                          className="form-select form-select-md"
                          type="select"
                          placeholder=""
                          name="allowsLiquidation"
                          disabled={!product?.properties?.allowsLiquidation}
                          id="allowLiquidation"
                          onChange={handleChange}
                          defaultValue={formData.allowsLiquidation}
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Input>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Wrapper>
            <WrapperFooter>
              <div className="footer-body">
                <div className="d-flex align-items-center justify-content-between footer-content">
                  <div>
                    <button
                      style={{ color: "#111E6C", width: "300px" }}
                      onClick={back}
                    >
                      Back
                    </button>
                  </div>
                  <div>
                    <button
                      style={{
                        backgroundColor: "#111E6C",
                        color: "#FFFFFF",
                        width: "300px",
                      }}
                      type="submit"
                      onClick={handleValidate}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </WrapperFooter>
          </>
        )
      )}
    </form>
  );
};

export default PlanForm;

const Wrapper = styled.div`
  padding: 60px;
  .image-holder {
    width: 95px;
    height: 93px;
  }
  @media (max-width: 570px) {
    padding: 20px !important;
    .image-holder {
      display: none;
    }
    .choose-plan {
      width: 90% !important;
    }
  }
  .choose-plan {
    width: 100%;
    height: 213px;
    background: #ffffff;
    border-bottom: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 30px;
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
  h4 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 16px;
    letter-spacing: -0.03em;
    color: #242424;
    padding-top: 60px;
    padding-bottom: 20px;
  }
  input {
    width: 239.5px;
    height: 54px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .validate:required:invalid {
    border: 2px solid red;
  }
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #828282;
    padding-bottom: 15px;
    padding-left: 10px;
  }

  select {
    height: 54px;
  }
  .curr-icon {
    position: absolute;
    margin-top: 15px;
    margin-left: 20px;
    z-index: 10;
  }
  .curr-input {
    padding-left: 34px;
  }
  .helper-text {
    font-size: 11px;
  }
`;

const WrapperFooter = styled.div`
  background: #ffffff;
  box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  padding: 40px 80px;
  @media (max-width: 600px) {
    padding: 40px 20px;
  }
  @media (max-width: 800px) {
    .footer-content {
      display: flex !important;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    button {
      margin: 10px 0;
    }
  }
  button {
    background: #f2f2f2;
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 10px 15px;
  }
  .blue-btn {
    color: #f2f2f2;
    background: #111e6c;
  }
  .option-select {
    width: 35%;
  }
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
