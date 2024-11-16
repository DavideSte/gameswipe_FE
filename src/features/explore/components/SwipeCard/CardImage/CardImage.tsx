import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./CardImage.module.scss";

export default function CardImage({ url, name }: { url: string; name: string }) {
  return (
    <div className={styles["img-container"]}>
      <LazyLoadImage src={url} alt={name} effect="blur" width="100%" />
    </div>
  );
}
