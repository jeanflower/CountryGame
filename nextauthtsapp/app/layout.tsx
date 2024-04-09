import React, { ReactNode } from "react";

export const metadata = {
  title: 'Home page',
  description: 'Enables signin',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
