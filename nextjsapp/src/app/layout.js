
export const metadata = {
  title: 'Country app',
  description: 'Nextjs implementation for country path app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
