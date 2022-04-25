import React, { useEffect, useState } from "react";
import styles from "./ModalBankForm.module.scss";
import ModalContent from "../UI/Modal/ModalContent";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

function ModalBankForm(props) {
  const [formIsValid, setFormIsValid] = useState(false);
  const [bankName, setBankName] = useState("");
  const [interestRate, setInterestRate] = useState(20);
  const [maxLoan, setMaxLoan] = useState(10000);
  const [minDownPayment, setMinDownPayment] = useState(10);
  const [loanTerm, setLoanTerm] = useState(3);

  useEffect(() => {
    setFormIsValid(
      bankName.length > 0 &&
        interestRate >= 0 &&
        maxLoan > 0 &&
        minDownPayment >= 0 &&
        loanTerm > 1
    );
  }, [bankName, interestRate, maxLoan, minDownPayment, loanTerm]);

  function changeHandler(type) {
    switch (type) {
      default:
        return () => console.log("onChange do nothing");
      case "BANK_NAME":
        return (e) => setBankName(e.target.value);
      case "INTEREST_RATE":
        return (e) => setInterestRate(+e.target.value);
      case "MAX_LOAN":
        return (e) => setMaxLoan(+e.target.value);
      case "MIN_DOWN_PAYMENT":
        return (e) => setMinDownPayment(+e.target.value);
      case "LOAN_TERM":
        return (e) => setLoanTerm(+e.target.value);
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 1000000000000000) + '',
      bankName: bankName,
      interestRate: interestRate,
      maxLoan: maxLoan,
      minPayment: minDownPayment,
      loanTerm: loanTerm,
    });
    setBankName("");
    setInterestRate(20);
    setMaxLoan(10000);
    setMinDownPayment(10);
    setLoanTerm(3);
    props.onClose();
  }

  return (
    <ModalContent
      onClose={props.onClose}
      isOpen={props.isOpen}
      title={"Adding new Bank"}
    >
      <form onSubmit={submitHandler} className={styles["bank-form"]} action="">
        <Input
          value={bankName}
          onChange={changeHandler("BANK_NAME")}
          labelClassName={styles["bank-form-label"]}
          inputClassName={styles["bank-form-input"]}
        >
          <span className={styles["label-title"]}>Bank Name</span>
        </Input>
        <Input
          value={interestRate}
          onChange={changeHandler("INTEREST_RATE")}
          type={"number"}
          step={"0.01"}
          min={"0"}
          max={"100"}
          labelClassName={styles["bank-form-label"]}
          inputClassName={styles["bank-form-input"]}
        >
          <span className={styles["label-title"]}>
            Interest Rate (in percentage)
          </span>
        </Input>
        <Input
          value={maxLoan}
          onChange={changeHandler("MAX_LOAN")}
          type={"number"}
          min={"0"}
          step={"100"}
          labelClassName={styles["bank-form-label"]}
          inputClassName={styles["bank-form-input"]}
        >
          <span className={styles["label-title"]}>Maximum loan (USD)</span>
        </Input>
        <Input
          value={minDownPayment}
          onChange={changeHandler("MIN_DOWN_PAYMENT")}
          type={"number"}
          step={"0.01"}
          min={"0"}
          max={"100"}
          labelClassName={styles["bank-form-label"]}
          inputClassName={styles["bank-form-input"]}
        >
          <span className={styles["label-title"]}>
            Minimum down payment (in percentage)
          </span>
        </Input>
        <Input
          value={loanTerm}
          onChange={changeHandler("LOAN_TERM")}
          type={"number"}
          step={"1"}
          min={"1"}
          labelClassName={styles["bank-form-label"]}
          inputClassName={styles["bank-form-input"]}
        >
          <span className={styles["label-title"]}>
            Loan term (amount of months)
          </span>
        </Input>
        <Button
          className={styles["submit-btn"]}
          type={"submit"}
          disabled={!formIsValid}
        >
          Submit!
        </Button>
      </form>
    </ModalContent>
  );
}

export default ModalBankForm;
