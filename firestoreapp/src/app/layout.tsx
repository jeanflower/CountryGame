import type { Metadata } from "next";
import "./globals.css";
import LayoutWithAuth from "./components/LayoutWithAuth";

export const metadata: Metadata = {
  title: "Firebase auth and FireStore",
  description: "Firebase auth and FireStore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <LayoutWithAuth>
            {children}
          </LayoutWithAuth>
        </main>
      </body>
    </html>
  );
}
