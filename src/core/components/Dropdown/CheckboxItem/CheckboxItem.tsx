import { Circle, CircleCheck, Square, SquareCheck } from "lucide-react";
import { Option } from "../types";
import styles from "./CheckboxItem.module.scss";

interface CheckboxItemProps {
  option: Option;
  isSelected: boolean;
  onClick: (value: string) => void;
  multiple: boolean;
}

const CheckboxItem = ({ option, isSelected, onClick, multiple }: CheckboxItemProps) => {
  const { value, label } = option;

  const handleClick = () => {
    onClick(value);
  };

  return (
    <div onClick={handleClick} className={styles["checkbox"]}>
      {multiple ? (
        isSelected ? (
          <SquareCheck size={15} strokeWidth={2} />
        ) : (
          <Square size={15} strokeWidth={2} />
        )
      ) : isSelected ? (
        <CircleCheck size={15} strokeWidth={2} />
      ) : (
        <Circle size={15} strokeWidth={2} />
      )}
      <p className={styles["checkbox__text"]}>{label}</p>
    </div>
  );
};

export default CheckboxItem;
