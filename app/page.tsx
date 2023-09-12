import styles from "./page.module.css";

import DragDropBox from "./components/DragDropBox";

import { Alert } from "@mui/material";
import { SavedFiles } from "./components/SavedFiles";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2>FEED ME A FILE</h2>
      </div>
      <DragDropBox />
      <SavedFiles />
    </main>
  );
}
