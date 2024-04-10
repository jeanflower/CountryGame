'use client'
import styles from "./page.module.css";
import Header from "@/components/Header";
import { PageNames } from "@/interfaces/PageNames";

export default function Play() {
  return (
    <main className={styles.main}>
      <Header 
        loading={false} 
        page={PageNames.Games}      
      />

      Content for the play page

    </main>
  );
}
