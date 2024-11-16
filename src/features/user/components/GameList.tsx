import { Game } from "@/core/store/api/gamesApi/types";
import GameListItem from "./GameListItem";
import styles from "./GameList.module.scss";

interface GameListProps {
  games: Game[];
}

export default function GameList({ games }: GameListProps) {
  return (
    <div className={styles["game-list"]} role="list">
      {games.map((game) => (
        <GameListItem key={game.id} game={game} />
      ))}
      {games.length === 0 && <p className={styles["game-list__none"]}>No games found</p>}
    </div>
  );
}
