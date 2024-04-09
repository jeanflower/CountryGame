export const metadata = {
  title: 'Countries game',
  description: 'For authenticated users',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
