import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./Header.module.css";
import { JSX } from "react";

export function Header(): JSX.Element {
  return (
    <header className={styles.wrapper}>
      <ConnectButton />
    </header>
  );
}
