import { User } from "@/core/types";
import SearchUserListItem from "./SearchUserListItem";
import { Friendship } from "@/core/store/api/gamesApi/types";
import styles from "./SearchUserList.module.scss";

interface SearchUserListProps {
  users: User[];
  friendshipStatusDict: Record<string, Friendship["status"]>;
}

export default function SearchUserList({ users, friendshipStatusDict }: SearchUserListProps) {
  return (
    <div className={styles["user-list"]} role="list">
      {users.length === 0 ? (
        <p className={styles["user-list__noresults"]}>No users found.</p>
      ) : (
        users.map((user) => {
          return (
            <SearchUserListItem
              key={user._id}
              user={user}
              status={friendshipStatusDict[user._id] || undefined}
            />
          );
        })
      )}
    </div>
  );
}
