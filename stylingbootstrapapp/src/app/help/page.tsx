'use client'
import styles from "./page.module.css";
import Header from "@/components/Header";
import { PageNames } from "@/interfaces/PageNames";

export default function Help() {
  return (
    <main className={styles.main}>
      <Header 
        loading={false} 
        page={PageNames.Help}      
      />

      Content for the help page
    </main>
  );
}
