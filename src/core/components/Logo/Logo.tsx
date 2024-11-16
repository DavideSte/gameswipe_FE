import { IoGameController } from "react-icons/io5";
import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <div className={styles["logo"]}>
      <IoGameController className={styles["logo__icon"]} />
      <h3 className={styles["logo__name"]}>GameSwipe</h3>
    </div>
  );
}
