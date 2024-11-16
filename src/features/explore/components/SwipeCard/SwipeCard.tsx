import {
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  useAnimation,
  motion,
} from "framer-motion";
import { useState } from "react";
import { Game } from "@/core/store/api/gamesApi/types";
import { Category } from "@/core/store/api/gamesApi/types/enums";
import { useSwipeMutation } from "../../store/api/gamesApi";
import styles from "./SwipeCard.module.scss";
import CardImage from "./CardImage/CardImage";
import CardHeader from "./CardHeader/CardHeader";
import CardInfo from "./CardInfo/CardInfo";
import CardActions from "./CardActions/CardActions";

interface CardProps {
  game: Game;
  removeCard: () => void;
  isFront: boolean;
}

export default function SwipeCard({ game, removeCard, isFront }: CardProps) {
  const {
    name,
    artworks,
    total_rating,
    category,
    franchise,
    genres,
    keywords,
    first_release_date,
  } = game;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-15, 15]);
  const opacity = useTransform(x, [-150, 0, 150], [0.95, 1, 0.95]);
  const [isRight, setIsRight] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const controls = useAnimation();

  const [swipeCard] = useSwipeMutation();

  useMotionValueEvent(x, "change", (latest) => {
    if (latest > 10) {
      setIsRight(true);
      setIsLeft(false);
    } else if (latest < -10) {
      setIsLeft(true);
      setIsRight(false);
    } else {
      setIsLeft(false);
      setIsRight(false);
    }
  });

  const handleDragEnd = () => {
    if (x.get() > 100) {
      swipeCard({ status: "played", gameId: game.id });
    } else if (x.get() < -100) {
      swipeCard({ status: "non-played", gameId: game.id });
    } else {
      return;
    }
    removeCard();
  };

  // Function to simulate swipe action
  const simulateSwipe = (direction: "left" | "right") => {
    const targetX = direction === "right" ? 150 : -150;
    const targetRotate = direction === "right" ? 15 : -15;
    controls
      .start({
        x: targetX,
        rotate: targetRotate,
        transition: { duration: 0.3 },
      })
      .then(() => {
        removeCard();
        swipeCard({ status: direction === "right" ? "played" : "non-played", gameId: game.id });
      });
  };

  const simulateSwipeUp = () => {
    controls
      .start({
        x: 0,
        y: -800,
        rotate: 0,
        transition: { duration: 0.5 },
      })
      .then(() => {
        removeCard();
        swipeCard({ status: "liked", gameId: game.id });
      });
  };

  if (!artworks[0]) {
    console.log("No image found for", name);
    return null;
  }

  const imageHash = artworks[0].image_id;
  const url = `https://images.igdb.com/igdb/image/upload/t_720p/${imageHash}.jpg`;
  const rating_value = Math.round(total_rating * 10) / 10;
  const year = new Date(first_release_date * 1000).getFullYear();

  return (
    <motion.div
      drag="x"
      onDragEnd={handleDragEnd}
      animate={controls}
      dragConstraints={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      style={{ gridRow: 1, gridColumn: 1, x, rotate, opacity }}
      className={styles["card"]}
    >
      <CardImage url={url} name={name} />
      {!isFront && <div className={styles["card__next"]} />}
      <CardHeader name={name} rating_value={rating_value} franchise={franchise} year={year} />
      <CardInfo category={Category[category]} genres={genres} keywords={keywords} />
      <CardActions
        isLeft={isLeft}
        isRight={isRight}
        simulateSwipe={simulateSwipe}
        simulateSwipeUp={simulateSwipeUp}
      />
    </motion.div>
  );
}
