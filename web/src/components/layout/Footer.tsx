import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span className="bold">Riboura Cars</span> &copy; 2022
      </p>
    </footer>
  );
}
