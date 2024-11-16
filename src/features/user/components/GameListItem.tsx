import { Game } from "@/core/store/api/gamesApi/types";
import { Category } from "@/core/store/api/gamesApi/types/enums";
import { Calendar, Joystick, Star } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Label from "./Label";
import styles from "./GameListItem.module.scss";

interface GameListItemProps {
  game: Game;
}

export default function GameListItem({ game }: GameListItemProps) {
  const { name, artworks, total_rating, category, total_rating_count, first_release_date } = game;

  const imageHash = artworks[0].image_id;
  const url = `https://images.igdb.com/igdb/image/upload/t_720p/${imageHash}.jpg`;
  const rating_value = Math.round(total_rating * 10) / 10;
  const year = new Date(first_release_date * 1000).getFullYear();

  return (
    <div className={styles["game"]} role="listitem">
      {/* left icon image */}
      <div className={styles["game__image"]}>
        <LazyLoadImage src={url} alt={name} effect="blur" height="100%" width="100%" />
      </div>

      <div className={styles["game__details"]}>
        <h6>{name}</h6>
        <div className={styles["game__metadata"]}>
          <Label Icon={Joystick} text={Category[category]} />
          <Label Icon={Calendar} text={year.toString()} />
          <Label Icon={Star} text={`${rating_value}/100 (${total_rating_count})`} />
        </div>
      </div>
    </div>
  );
}
