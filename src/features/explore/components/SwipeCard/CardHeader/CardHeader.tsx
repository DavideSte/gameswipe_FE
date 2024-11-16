import { Star } from "lucide-react";
import styles from "./CardHeader.module.scss";
import { Property } from "@/core/store/api/gamesApi/types";

interface CardHeaderProps {
  name: string;
  year: number;
  franchise: Property | undefined;
  rating_value: number;
}

export default function CardHeader({ name, year, franchise, rating_value }: CardHeaderProps) {
  return (
    <div className={styles["header"]}>
      <h4>{name}</h4>
      <p>
        {franchise?.name ? franchise.name + ", " : ""} {year}
      </p>
      <div className={styles["header__rating"]}>
        {rating_value}/100 <Star size={18} fill="white" />
      </div>
    </div>
  );
}
