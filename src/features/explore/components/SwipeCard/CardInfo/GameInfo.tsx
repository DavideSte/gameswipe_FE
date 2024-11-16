import { LucideProps } from "lucide-react";
import styles from "./GameInfo.module.scss";

export default function GameInfo({
  text,
  Icon,
  children,
}: {
  text: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  children: React.ReactNode;
}) {
  return (
    <div className={styles["info"]}>
      <div className={styles["info__label"]}>
        <Icon strokeWidth={3} size={16} />
        <p>{text}</p>
      </div>
      <div className={styles["info__content"]}>{children}</div>
    </div>
  );
}
