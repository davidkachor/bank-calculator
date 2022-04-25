import React, { useRef, useEffect, useState } from "react";
import styles from "./Select.module.scss";

function Select(props) {
  const selectedBank = useRef();
  const [selectTrigger, setSelectTrigger] = useState(0);

  useEffect(() => {
    props.onChange(selectedBank.current.value);
  }, [selectTrigger]);

  let content = props.bankList.map((e, i) => (
    <option key={i} value={e.id}>
      {e.bankName}
    </option>
  ));
  return (
    <select
      disabled={props.disabled}
      onChange={() => setSelectTrigger((prev) => ++prev)}
      ref={selectedBank}
      className={`${styles.select} ${props.className}`}
    >
      {content}
    </select>
  );
}

export default Select;
