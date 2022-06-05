import styles from "./RoundedImage.module.css";

export const RoundedImage = ({ src, alt, width }: any) => {
  return (
    <img
      className={`${styles.rounded_image} ${styles[width]}`}
      src={src}
      alt={alt}
    />
  );
};
