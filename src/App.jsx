import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";

import "./App.scss";
import Main from "./components/Main/Main";
import FixedButtons from "./components/FixedButtons/FixedButtons";

function App() {
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    setBankList(JSON.parse(localStorage.getItem('BANK_LIST')) || [])
  }, [])

  function addBankHandler(bankObj) {
    setBankList((prev) => {
      const newArr = [bankObj, ...prev]
      localStorage.setItem('BANK_LIST', JSON.stringify(newArr))
      return newArr
    });
  }
  function deleteBankHandler(id) {
    setBankList((prev) => {
      const newArr = prev.filter((e) => e.id !== id)
      localStorage.setItem('BANK_LIST', JSON.stringify(newArr))
      return newArr
    });
  }
  function editBankHandler(bankObj, id) {
    setBankList((prev) => {
      const newArr = prev.map((e) => (e.id === id ? bankObj : e))
      localStorage.setItem('BANK_LIST', JSON.stringify(newArr))
      return newArr
    });
  }

  return (
    <React.Fragment>
      <Main
        onEdit={editBankHandler}
        onDelete={deleteBankHandler}
        bankList={bankList}
      />
      {ReactDOM.createPortal(
        <FixedButtons onAddingBank={addBankHandler} bankList={bankList} />,
        document.getElementById("btn-root")
      )}
    </React.Fragment>
  );
}

export default App;
