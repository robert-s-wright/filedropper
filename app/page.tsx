import styles from "./page.module.css";

import DragDropBox from "./components/DragDropBox";
import Buttons from "./components/Buttons";
import { saveFiles } from "./requests";

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
