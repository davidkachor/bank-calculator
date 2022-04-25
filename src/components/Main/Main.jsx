import styles from "./Main.module.scss";
import MainItem from "./MainItem";

function Main(props) {
  let content;
  switch (props.bankList.length) {
    default:
      content = props.bankList.map((e, i) => (
        <MainItem
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          itemId={e.id}
          key={e.id}
          bankName={e.bankName}
          interestRate={e.interestRate}
          maxLoan={e.maxLoan}
          minPayment={e.minPayment}
          loanTerm={e.loanTerm}
        />
      ));
      break;
    case 0:
      content = (
        <p className={styles["main-message"]}>
          You haven`t added any banks yet. Press the '+' button to add the first
          one!
        </p>
      );
      break;
  }

  return (
    <main>
      <p className={styles["main-title"]}>Here is Your added Banks!</p>
      <div className={styles["main-item-list"]}>{content}</div>
    </main>
  );
}

export default Main;
