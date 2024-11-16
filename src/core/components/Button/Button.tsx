import { LoaderCircle } from "lucide-react";
import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "medium", loading = false, disabled = false, ...props }, ref) => {
    const cn = [
      styles.button,
      styles[variant],
      styles[size],
      loading ? styles.loading : "",
      disabled ? styles.disabled : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button className={cn} ref={ref} {...props} disabled={disabled || loading}>
        <div className={!loading ? "" : styles.hidden}>{props.children}</div>
        {loading && <LoaderCircle className={styles.loader} />}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
