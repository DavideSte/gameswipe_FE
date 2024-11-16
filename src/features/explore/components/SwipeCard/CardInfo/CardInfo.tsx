import { Property } from "@/core/store/api/gamesApi/types";
import styles from "./CardInfo.module.scss";
import GameInfo from "./GameInfo";
import { Joystick, BookImage, Tag } from "lucide-react";

interface CardInfoProps {
  keywords: Property[] | undefined;
  genres: Property[];
  category: string;
}

export default function CardInfo({ keywords, genres, category }: CardInfoProps) {
  return (
    <div className={styles["info"]}>
      <GameInfo Icon={Joystick} text="Category">
        <p>{category}</p>
      </GameInfo>
      <GameInfo Icon={BookImage} text="Genres">
        <p> {genres.map((g) => g.name).join(", ")}</p>
      </GameInfo>
      <GameInfo Icon={Tag} text="Keywords">
        <div className={styles["info__tags"]}>
          {keywords?.map((k, idx) => {
            if (idx > 8) return null;
            return (
              <div className={styles["tag"]} key={k.id}>
                #{k.name}
              </div>
            );
          })}
        </div>
      </GameInfo>
    </div>
  );
}
