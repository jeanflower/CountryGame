'use client'
import styles from "./page.module.css";
import Header from "@/components/Header";
import { PageNames } from "@/interfaces/PageNames";

export default function Settings() {
  return (
    <main className={styles.main}>
      <Header 
        loading={false} 
        page={PageNames.Settings}      
      />

    Conent for the settings page

    </main>
  );
}
