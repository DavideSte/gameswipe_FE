import { Friendship } from "@/core/store/api/gamesApi/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAcceptFriendRequestMutation } from "../store/api/gamesApi";
import { ExternalLink } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/core/components/Button/Button";
import styles from "./FriendshipListItem.module.scss";
import { faker } from "@faker-js/faker";
import { useMemo } from "react";

interface FriendshipListItemProps {
  friendship: Friendship;
}

export default function FriendshipListItem({ friendship }: FriendshipListItemProps) {
  const { _id, friend, status, received } = friendship;
  const { username, email, avatar } = friend;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const imgUser = useMemo(() => avatar ?? faker.image.avatar(), []);

  const [acceptRequest, { isLoading, isSuccess }] = useAcceptFriendRequestMutation();

  const handleAcceptRequest = () => {
    acceptRequest({ friendshipId: _id });
  };

  return (
    <div className={styles["friend"]}>
      <div className={styles["friend__image"]}>
        <LazyLoadImage src={imgUser} alt={username} effect="blur" height="100%" width="100%" />
      </div>

      <div className={styles["friend__details"]}>
        <div className={styles["friend__info"]}>
          <p className={styles["friend__username"]}>@{username}</p>
          <p className={styles["friend__email"]}>{email}</p>
        </div>
        {received && status === "pending" && (
          <div className={styles["friend__action"]}>
            <Button disabled={isLoading || isSuccess} onClick={handleAcceptRequest} size="small">
              {isLoading ? "Loading..." : isSuccess ? "Accepted" : "Accept"}
            </Button>
          </div>
        )}

        {status === "accepted" && (
          <NavLink to={friend._id + "/compare"} className={styles["friend__link"]}>
            <ExternalLink size={20} />
          </NavLink>
        )}
      </div>
    </div>
  );
}
