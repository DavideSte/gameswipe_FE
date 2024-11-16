import { FieldError } from "react-hook-form";
import styles from "./InputWrapper.module.scss";

interface InputWrapperProps extends React.PropsWithChildren {
  label: string;
  name: string;
  error: FieldError | undefined;
}

export default function InputWrapper({ label, name, error, children }: InputWrapperProps) {
  return (
    <div className={styles["field"]}>
      <label htmlFor={name}>
        <small>{label}</small>
        {error && <p className={styles["field__error"]}>{error.message}</p>}
      </label>
      {children}
    </div>
  );
}
