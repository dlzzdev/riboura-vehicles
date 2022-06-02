import { PropsWithChildren } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  children: any;
}

export const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
}) => {
  return <main className={styles.container}>{children}</main>;
};
