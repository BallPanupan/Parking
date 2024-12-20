import Menu from "../../../components/Menu/Menu";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Admin Page</h1>
        container
        <Menu/>
      </main>
      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );
}
