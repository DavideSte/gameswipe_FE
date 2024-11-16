import Modal from "@/core/components/Modal/Modal";
import { Game } from "@/core/store/api/gamesApi/types";
import SwipeCard from "@/features/explore/components/SwipeCard/SwipeCard";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./GameListItem.module.scss";

export default function GameListItem({ game, swipe }: { game: Game; swipe: boolean }) {
  const { name, artworks } = game;

  const [isOpen, setIsOpen] = useState(false);
  const imageHash = artworks[0].image_id;
  const url = `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageHash}.jpg`;

  // only first 20 char of name if exceeds
  const shortName = name.length > 20 ? name.slice(0, 17) + "..." : name;

  const openModal = () => {
    if (!swipe) return;
    setIsOpen(true);
  };

  return (
    <>
      <div onClick={openModal} className={styles["game"]} role="listitem">
        <div className={styles["game__image"]}>
          <LazyLoadImage src={url} alt={name} effect="blur" height="100%" width="100%" />
        </div>

        <div className={styles["game__info"]}>
          <h6 className={styles["game__title"]}>{shortName}</h6>
        </div>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className={styles["popup"]}>
            <SwipeCard game={game} removeCard={() => setIsOpen(false)} isFront={true} />
          </div>
        </Modal>
      )}
    </>
  );
}
