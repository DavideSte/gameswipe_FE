import { X } from "lucide-react";
import styles from "./SelectedLabel.module.scss";

export default function SelectedLabel({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className={styles["label"]}>
      <p>{label}</p>
      <X
        stroke="red"
        size={15}
        strokeWidth={3}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      />
    </div>
  );
}
