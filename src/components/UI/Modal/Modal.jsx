import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

function Modal(props) {
  let content = props.isOpen && (
    <div className={styles.modal}>{props.children}</div>
  );
  return (
    <React.Fragment>
      {ReactDOM.createPortal(content, document.getElementById("modal-root"))}
    </React.Fragment>
  );
}

export default Modal;
