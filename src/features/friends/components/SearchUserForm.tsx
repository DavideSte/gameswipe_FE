import { Search, UserRoundPlus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useLazyGetUsersQuery } from "../store/api/gamesApi";
import Loader from "@/core/components/Loader/Loader";
import SearchUserList from "./SearchUserList";
import { Friendship } from "@/core/store/api/gamesApi/types";
import { useFriendsSelector } from "../store/slice/friends/friendsSelector";
import styles from "./SearchUserForm.module.scss";

export default function SearchUserForm() {
  const [input, setInput] = useState("");
  const [runSearch, { data, isFetching, isUninitialized, isSuccess }] = useLazyGetUsersQuery();
  const { friendships } = useFriendsSelector();

  const friendshipStatusDict = useMemo(() => {
    return friendships.reduce((acc, friendship) => {
      acc[friendship.friend._id] = friendship.status;
      return acc;
    }, {} as Record<string, Friendship["status"]>);
  }, [friendships]);

  const clearSearch = () => {
    setInput("");
  };

  const searchUsers = () => {
    if (!input) return;
    runSearch({ q: input });
  };

  let content;
  if (isUninitialized) {
    content = <p className={styles["friends-popup__noresults"]}>Search for a user.</p>;
  } else if (isFetching) {
    content = <Loader message="Fetching users..." />;
  } else if (isSuccess) {
    const users = data && data.length > 0 ? data : [];
    content = <SearchUserList users={users} friendshipStatusDict={friendshipStatusDict} />;
  }

  return (
    <div className={styles["friends-popup"]}>
      {/* Title */}
      <div className={styles["friends-popup__header"]}>
        <UserRoundPlus strokeWidth={3} size={20} />
        <h5>Add a new friend </h5>
      </div>

      {/* Search Input */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          searchUsers();
        }}
        className={styles["friends-form"]}
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Search by email, user ..."
          className={styles["friends-form__input"]}
        />
        <div className={styles["friends-form__actions"]}>
          {input && <X size={19} onClick={clearSearch} />}
          <div className={styles["friends-form__separator"]}></div>
          <Search fill="white" size={19} />
        </div>
      </form>

      <hr />
      {/* Results */}
      {content}
    </div>
  );
}
