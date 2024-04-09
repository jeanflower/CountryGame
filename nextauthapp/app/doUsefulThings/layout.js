export const metadata = {
  title: 'Useful page',
  description: 'For authenticated users',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
