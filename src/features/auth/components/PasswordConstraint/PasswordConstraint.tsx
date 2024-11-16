import { CircleCheckBig, Circle } from "lucide-react";
import styles from "./PasswordConstraint.module.scss";

export default function PasswordConstraint({ isValid, text }: { isValid: boolean; text: string }) {
  return (
    <div className={`${styles["constraint"]} ${isValid ? "" : styles["constraint--invalid"]}`}>
      <div className={styles["constraint__content"]}>
        {isValid ? (
          <CircleCheckBig size={14} strokeWidth={3} stroke="currentColor" />
        ) : (
          <Circle size={14} strokeWidth={3} stroke="currentColor" />
        )}
        <small>{text}</small>
      </div>
    </div>
  );
}
