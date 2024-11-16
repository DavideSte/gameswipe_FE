import { useState } from "react";
import { User } from "../../types";
import { faker } from "@faker-js/faker";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./UserInfo.module.scss";

interface UserInfoProps {
  user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
  const { username, email, avatar } = user;
  const imgUser = avatar ?? faker.image.avatar();
  const [imageError, setimageError] = useState(false);

  return (
    <div className={styles["user"]}>
      <div className={styles["user__image"]}>
        {imageError ? (
          <div className={styles["user__image-error"]}>
            <h3>{username?.charAt(0).toLocaleUpperCase()}</h3>
          </div>
        ) : (
          <LazyLoadImage
            src={imgUser}
            alt={username}
            onError={() => setimageError(true)}
            effect="blur"
            height="100%"
            width="100%"
          />
        )}
      </div>
      <div className={styles["user__details"]}>
        <h5>{username ? "@" + username : "Missing Username"}</h5>
        <p className={styles["user__email"]}>{email || "Missing Email"}</p>
      </div>
    </div>
  );
}
