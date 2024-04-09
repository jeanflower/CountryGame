export const metadata = {
  title: 'Countries game',
  description: 'For authenticated users',
}

export default function PlayGameLayout({ children }: { children: React.ReactNode }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
