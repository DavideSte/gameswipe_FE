import { LucideProps } from "lucide-react";
import styles from "./Label.module.scss";

const Label = ({
  text,
  Icon,
}: {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
}) => (
  <div className={styles["label-container"]}>
    <Icon strokeWidth={3} size={14} />
    <p>{text}</p>
  </div>
);

export default Label;
