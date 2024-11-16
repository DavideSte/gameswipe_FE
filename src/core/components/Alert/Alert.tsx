import React from "react";
import { Ban, CircleAlert, CircleCheck } from "lucide-react";
import styles from "./Alert.module.scss";

interface AlertProps {
  className?: string;
  variant: "destructive" | "success" | "warning";
  children: React.ReactNode;
}

export default function Alert({ className, variant = "success", children }: AlertProps) {
  const alertClass = `${styles.alert} ${styles[`alert--${variant}`]} ${className || ""}`;

  return (
    <div role="alert" className={alertClass}>
      <div className={styles.alert__icon}>
        {variant === "success" && <CircleCheck size={18} strokeWidth={2.25} />}
        {variant === "warning" && <CircleAlert size={18} strokeWidth={2.25} />}
        {variant === "destructive" && <Ban size={18} strokeWidth={2.25} />}
      </div>

      <div className={styles.alert__content}>{children}</div>
    </div>
  );
}

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <p className={styles.title}>{children}</p>;
};

interface DescriptionProps {
  children: React.ReactNode;
}

const Description = ({ children }: DescriptionProps) => {
  return <p className={styles.description}>{children}</p>;
};

Alert.Title = Title;
Alert.Description = Description;
