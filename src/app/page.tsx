import Header from "@/components/Header";
import styles from "./page.module.css";
import ThemeProvider from "@/contexts/ThemContext";

export default function Home() {
  return (
    <ThemeProvider>
      <Header />
      <main className={`default-wrapper-width ${styles.main}`}></main>
      <footer className={styles.footer}></footer>
    </ThemeProvider>
  );
}
