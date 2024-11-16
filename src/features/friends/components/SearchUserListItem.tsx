import { Check, Clock, LoaderCircle, Plus } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCreateFriendMutation } from "../store/api/gamesApi";
import { User } from "@/core/types";
import { Friendship } from "@/core/store/api/gamesApi/types";
import styles from "./SearchUserListItem.module.scss";
import { faker } from "@faker-js/faker";
import { useMemo } from "react";

interface SearchUserListItemProps {
  user: User;
  status: Friendship["status"];
}

export default function SearchUserListItem({ user, status }: SearchUserListItemProps) {
  const { username, email, avatar, _id } = user;
  const [addFriendMutation, { isLoading, isSuccess }] = useCreateFriendMutation();
  const imgUser = useMemo(() => avatar ?? faker.image.avatar(), [avatar]);

  const addFriend = () => {
    addFriendMutation({ friendId: _id });
  };

  let action;
  if (status === "pending") {
    action = <Clock size={18} />;
  } else if (status === "accepted") {
    action = <Check size={18} />;
  } else {
    action = (
      <button disabled={isLoading || isSuccess} onClick={addFriend}>
        {isLoading ? <LoaderCircle className={styles["loading"]} /> : <Plus size={20} />}
      </button>
    );
  }

  return (
    <div className={styles["user"]} role="listitem">
      <div className={styles["user__image"]}>
        <LazyLoadImage src={imgUser} alt={username} effect="blur" height="100%" width="100%" />
      </div>

      <div className={styles["user__details"]}>
        <p className={styles["user__username"]}>@{username}</p>
        <p className={styles["user__email"]}>{email}</p>
      </div>
      <div className={styles["user__actions"]}>{action}</div>
    </div>
  );
}
