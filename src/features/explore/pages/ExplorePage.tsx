import { useEffect, useMemo, useState } from "react";
import SwipeCard from "../components/SwipeCard/SwipeCard";
import { SlidersHorizontal } from "lucide-react";
import Modal from "@/core/components/Modal/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useLazyGetGamesQuery } from "@/core/store/api/gamesApi";
import { BounceLoader } from "react-spinners";
import Alert from "@/core/components/Alert/Alert";
import { FiltersFormData } from "../types";
import { Game, GetGamesArgs } from "@/core/store/api/gamesApi/types";
import useIsDesktop from "@/core/hooks/use-is-desktop";
import styles from "./ExplorePage.module.scss";
import ExploreFilters from "../components/ExploreFilters/ExploreFilters";

const initialFilters: GetGamesArgs = {
  page: 1,
  console: [],
  company: [],
  genres: [],
  years: [2000, 2024],
};

export default function ExplorePage() {
  const [runGetGames, { isLoading, isError, isUninitialized, isFetching }] = useLazyGetGamesQuery();
  const [cards, setCards] = useState<Game[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const isDesktop = useIsDesktop();

  // every time the filters change, fetch the new games
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const newGames = await runGetGames({ ...filters }).unwrap();
        setCards((prev) => (filters.page === 1 ? [...newGames] : [...prev, ...newGames]));
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // when the cards array has 5 elements, fetch next cards' slot
  useEffect(() => {
    if (cards.length === 5) {
      setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }, [cards]);

  const onFiltersChange = (filters: FiltersFormData) => {
    setFilters({ ...filters, page: 1 });
  };

  const handleRemoveCard = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const showLoading = useMemo(() => {
    return (
      isUninitialized || ((isFetching || isLoading) && (cards.length === 0 || filters.page === 1))
    );
  }, [cards.length, filters.page, isFetching, isLoading, isUninitialized]);

  const formFilters = useMemo(
    () => (
      <ExploreFilters
        onClose={closeModal}
        onChange={onFiltersChange}
        defaultValues={{ ...filters }}
      />
    ),
    [filters]
  );

  if (isError) {
    return (
      <Alert variant="destructive">
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>Something went wrong.</Alert.Description>
      </Alert>
    );
  }

  return (
    <>
      <div className={styles["explore-page"]}>
        {/* Sidebar */}
        <div className={styles["explore-page__sidebar"]}>{formFilters}</div>

        {/* Header */}
        <div className={styles["explore-page__header"]}>
          <h4>Explore</h4>
          <SlidersHorizontal
            onClick={() => setIsOpen(true)}
            strokeWidth={3}
            className={styles["explore-page__slider-icon"]}
          />
        </div>

        {showLoading ? (
          <div className={styles["explore-page__loading"]}>
            <BounceLoader color="#ffffff" speedMultiplier={1.5} />
          </div>
        ) : (
          <div className={styles["explore-page__cards-container"]}>
            {[...cards].reverse().map((game) => (
              <SwipeCard
                key={game.id}
                game={game}
                removeCard={() => handleRemoveCard(game.id)}
                isFront={game.id === cards[0].id}
              />
            ))}
            {cards.length === 0 && <p>No more results, try extending your filters.</p>}
          </div>
        )}
      </div>

      {/* modal with filters for mobile view */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <Modal onClose={closeModal}>
            <motion.div
              initial={{ y: "87dvh" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ y: "87dvh" }}
              className={styles.modal}
            >
              {formFilters}
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
