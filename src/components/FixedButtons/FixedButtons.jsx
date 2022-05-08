import styles from "./FixedButtons.module.scss";
import Button from "../UI/Button/Button";
import ModalBankForm from "../ModalBankForm/ModalBankForm";
import { useState } from "react";
import ModalCalculator from "../ModalCalculator/ModalCalculator";

function FixedButtons(props) {
  const [bankFormIsOpen, setBankFormIsOpen] = useState(false);
  const [calculatorIsOpen, setCalculatorIsOpen] = useState(false);

  function openCalculatorHandler() {
    setCalculatorIsOpen(true);
  }
  function openAddBankFormHandler() {
    setBankFormIsOpen(true);
  }
  function closeHandler() {
    setBankFormIsOpen(false);
    setCalculatorIsOpen(false);
  }

  return (
    <div className={styles["fixed-btn-list"]}>
      <Button onClick={openCalculatorHandler} className={styles["fixed-btn"]}>
        $
      </Button>
      <Button onClick={openAddBankFormHandler} className={styles["fixed-btn"]}>
        +
      </Button>
      <ModalBankForm
        onSubmit={props.onAddingBank}
        onClose={closeHandler}
        isOpen={bankFormIsOpen}
      />
      {/*<ModalCalculator onClose={closeHandler} bankList={props.bankList} isOpen={calculatorIsOpen} />*/}
    </div>
  );
}

export default FixedButtons;
