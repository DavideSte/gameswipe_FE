import { Gamepad2, Library, CircleUserRound, Globe, UsersRound } from "lucide-react";
import { IoGameController } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

const items = [
  { icon: <Globe />, label: "Explore", to: "/" },
  { icon: <Gamepad2 />, label: "Collection", to: "/collection" },
  { icon: <Library />, label: "Wishlist", to: "/wishlist" },
  { icon: <UsersRound />, label: "Friends", to: "/friends" },
  { icon: <CircleUserRound />, label: "Profile", to: "/profile" },
];

export default function Navbar() {
  return (
    <>
      {/* Mobile Navbar */}
      <nav className={`${styles["navbar"]} ${styles["navbar--mobile"]}`}>
        {items.map(({ icon, to, label }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive, isPending }) =>
              `${styles["navbar__link"]} ${
                isPending ? "" : isActive ? styles["navbar__link--active"] : ""
              }`
            }
          >
            {icon}
          </NavLink>
        ))}
      </nav>

      {/* Desktop Navbar */}
      <nav className={`${styles["navbar"]} ${styles["navbar--desktop"]}`}>
        {/* logo */}
        <NavLink to="/" className={styles["navbar__logo"]}>
          <IoGameController className={styles["navbar__logo-icon"]} />
          <h1 className={styles["navbar__logo-text"]}>GameSwipe</h1>
        </NavLink>

        {/* links */}
        <div className={styles["navbar__nav-links"]}>
          {items.slice(0, 4).map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive, isPending }) =>
                `${styles["navbar__link"]} ${
                  isPending ? "" : isActive ? styles["navbar__link--active"] : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* user profile */}
        <NavLink to="/profile" className={styles["navbar__profile"]}>
          <CircleUserRound size={30} strokeWidth={1.5} />
        </NavLink>
      </nav>
    </>
  );
}
