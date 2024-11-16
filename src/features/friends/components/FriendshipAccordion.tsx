import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft } from "lucide-react";
import FriendsListItem from "./FriendshipListItem";
import { useState } from "react";
import { Friendship } from "@/core/store/api/gamesApi/types";
import styles from "./FriendshipAccordion.module.scss";

interface FriendshipsAccordionProps {
  title: string;
  icon: React.ReactNode;
  friendships: Friendship[];
  startOpen?: boolean;
}

export default function FriendshipsAccordion({
  title,
  icon,
  friendships,
  startOpen = false,
}: FriendshipsAccordionProps) {
  const [isOpen, setIsOpen] = useState(startOpen);

  const togglePendingAccordion = () => {
    setIsOpen(!isOpen);
  };

  const options = {
    hidden: { height: 0, opacity: 0, overflow: "hidden" },
    visible: {
      height: isOpen ? "auto" : 0,
      opacity: isOpen ? 1 : 0.6,
    },
  };

  return (
    <div className={styles["accordion"]} role="listitem">
      <div onClick={togglePendingAccordion} className={styles["accordion__header"]}>
        {icon}
        <h6>
          {title} ({friendships.length})
        </h6>
        <div className={styles["accordion__separator"]}></div>
        {isOpen ? <ChevronDown size={18} /> : <ChevronLeft size={18} />}
      </div>
      <motion.div
        initial={startOpen ? "visible" : "hidden"}
        animate={isOpen ? "visible" : "hidden"}
        exit="hidden"
        variants={options}
        transition={{ duration: 0.3 }}
        className={`${styles["accordion__content"]} ${
          (isOpen || startOpen) && friendships.length > 0
            ? styles["accordion__content--active"]
            : ""
        } `}
      >
        {friendships.map((friendship) => (
          <FriendsListItem key={friendship._id} friendship={friendship} />
        ))}
      </motion.div>
    </div>
  );
}
