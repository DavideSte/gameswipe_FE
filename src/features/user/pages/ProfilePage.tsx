import { useUserSelector } from "@/core/store/slice/user/userSelector";
import { NavLink } from "react-router-dom";
import UserInfo from "@/core/components/Userinfo/UserInfo";
import { User } from "@/core/types";
import { Button } from "@/core/components/Button/Button";
import styles from "./ProfilePage.module.scss";

export default function ProfilePage() {
  const user = useUserSelector();

  return (
    <div className={styles["profile-page"]}>
      <UserInfo user={user as User} />
      <NavLink to="/logout" className={styles["profile-page__logout"]}>
        <Button>Logout</Button>
      </NavLink>
    </div>
  );
}
