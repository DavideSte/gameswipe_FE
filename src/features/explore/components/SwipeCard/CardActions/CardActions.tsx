import { IoGameController } from "react-icons/io5";
import styles from "./CardActions.module.scss";
import { Heart, X } from "lucide-react";

interface CardActionsProps {
  isLeft: boolean;
  isRight: boolean;
  simulateSwipe: (direction: "left" | "right") => void;
  simulateSwipeUp: () => void;
}

export default function CardActions({
  isLeft,
  isRight,
  simulateSwipe,
  simulateSwipeUp,
}: CardActionsProps) {
  return (
    <div className={styles["actions"]}>
      <div
        onClick={() => simulateSwipe("left")}
        className={`${styles["icon"]} ${styles["icon__discard"]} ${
          isLeft ? styles["icon__discard--active"] : ""
        } `}
      >
        <X fill="currentColor" strokeWidth={3} />
      </div>
      <div
        onClick={() => simulateSwipeUp()}
        className={`${styles["icon"]} ${styles["icon__heart"]} `}
      >
        <Heart fill="currentColor" />
      </div>
      <div
        onClick={() => simulateSwipe("right")}
        className={`${styles["icon"]} ${styles["icon__pad"]} ${
          isRight ? styles["icon__pad--active"] : ""
        } `}
      >
        <IoGameController />
      </div>
    </div>
  );
}
