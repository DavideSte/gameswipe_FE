import { LoaderCircle } from "lucide-react";
import styles from "./Loader.module.scss";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export default function Loader({ message, ...rest }: LoaderProps) {
  return (
    <div className={styles["loader"]} {...rest}>
      <LoaderCircle strokeWidth={3} className={styles.loader__icon} />
      <span className={styles.loader__message}>{message || "Loading..."}</span>
    </div>
  );
}
