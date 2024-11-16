import { Friendship } from "@/core/store/api/gamesApi/types";
import { Clock8, UserPlus, UsersRound } from "lucide-react";
import FriendshipsAccordion from "./FriendshipAccordion";
import styles from "./FriendshipList.module.scss";

interface FriendshipsListProps {
  friendships: Friendship[];
}

export default function FriendshipsList({ friendships }: FriendshipsListProps) {
  const receivedRquests = [];
  const sentRequests = [];
  const friends = [];

  for (const friendship of friendships) {
    if (friendship.status === "pending") {
      if (friendship.received) {
        receivedRquests.push(friendship);
      } else {
        sentRequests.push(friendship);
      }
    } else if (friendship.status === "accepted") {
      friends.push(friendship);
    }
  }

  return (
    <div className={styles["friend-list"]} role="list">
      <FriendshipsAccordion
        title="New Requests"
        icon={<UserPlus size={17} strokeWidth={3} />}
        friendships={receivedRquests}
      />
      <FriendshipsAccordion
        title="Pending"
        icon={<Clock8 size={17} strokeWidth={3} />}
        friendships={sentRequests}
      />
      <FriendshipsAccordion
        title="Friends"
        icon={<UsersRound size={17} strokeWidth={3.3} />}
        friendships={friends}
        startOpen={true}
      />
    </div>
  );
}
