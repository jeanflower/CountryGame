import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";
import styles from "./page.module.css";

import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Country game",
  description: "Navigating the globe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
          className="globe"
        >
          <div
            className={styles.flexsection}
          >
            <div
              className={styles.flexdiv}
            >
              {children}
            </div>
          </div>
          <div
            className={styles.flexfooter}
          >
            <Footer/>
          </div>
        </div>
      </body>
    </html>
  );
}
