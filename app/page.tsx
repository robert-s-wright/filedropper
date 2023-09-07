import { useState } from "react";

import styles from "./page.module.css";

import DragDropBox from "./components/DragDropBox";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2>FEED ME A FILE</h2>
      </div>
      <DragDropBox />
    </main>
  );
}
