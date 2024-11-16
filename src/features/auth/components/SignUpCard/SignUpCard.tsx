import styles from "./SignUpCard.module.scss";
import Logo from "@/core/components/Logo/Logo";

export default function SignUpCard({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Login/Register Container */}
      <div className={styles["background"]}>
        <div className={styles["card"]}>
          <Logo />
          <div className={styles["card__content"]}>{children}</div>
        </div>
      </div>

      {/* Background Image */}
      <div className={styles["bg-image"]}>
        <div className={styles["bg-image__filter"]} />
        <img
          src="https://images.unsplash.com/photo-1635187834534-d1fa994fcabb?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </>
  );
}
