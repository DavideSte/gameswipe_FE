import { Game } from "@/core/store/api/gamesApi/types";
import GameListItem from "./GameListItem";
import { useState } from "react";
import Modal from "@/core/components/Modal/Modal";
import SwipeCard from "@/features/explore/components/SwipeCard/SwipeCard";
import { RectangleVertical } from "lucide-react";
import styles from "./CardsContainer.module.scss";

interface CardsContainerProps {
  games: Game[];
  title: string;
  icon?: string;
  swipe?: boolean;
}

export default function CardsContainer({ games, title, icon, swipe = false }: CardsContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [excludedGames, setexcludedGames] = useState<number[]>([]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  if (games.length === 0) return null;

  return (
    <div className={styles["cards"]}>
      <div className={styles["cards__header"]}>
        {icon}
        <h5>{title}</h5>
        {swipe && (
          <div onClick={toggleModal} className={styles["cards__swipe-btn"]}>
            <RectangleVertical className={styles["cards__icon1"]} fill="white" />
            <RectangleVertical className={styles["cards__icon2"]} />
          </div>
        )}
      </div>
      <div className={styles["cards__deck"]} role="list">
        {games.map((game) => (
          <GameListItem key={game.id} game={game} swipe={swipe} />
        ))}
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className={styles["popup"]}>
            {[...games]
              .filter((game) => !excludedGames.includes(game.id))
              .reverse()
              .map((game) => (
                <SwipeCard
                  key={game.id}
                  game={game}
                  removeCard={() => setexcludedGames([...excludedGames, game.id])}
                  isFront={true}
                />
              ))}
            {games.length === 0 && (
              <p className={styles["popup__noresults"]}>
                No more results, try extending your filters
              </p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
