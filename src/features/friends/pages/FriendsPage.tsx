import FriendshipsList from "../components/FriendshipList";
import Modal from "@/core/components/Modal/Modal";
import { useState } from "react";
import SearchFriendForm from "../components/SearchUserForm";
import { useGetFriendshipsQuery } from "../store/api/gamesApi";
import Loader from "@/core/components/Loader/Loader";
import { Button } from "@/core/components/Button/Button";
import styles from "./FriendsPage.module.scss";

export default function FriendsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isFetching } = useGetFriendshipsQuery();
  const friendships = data && data.length > 0 ? data : [];

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles["friends-page"]}>
      <div className={styles["friends-page__header"]}>
        <h4>Friends</h4>
        <Button onClick={toggleModal} size="small">
          + add friends
        </Button>
      </div>
      {isFetching ? <Loader /> : <FriendshipsList friendships={friendships} />}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <SearchFriendForm />
        </Modal>
      )}
    </div>
  );
}
