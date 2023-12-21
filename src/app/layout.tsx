import type { Metadata } from 'next'

import './globals.css'



export const metadata: Metadata = {
  title: 'Photographe professionnel au Maroc | Afnane Photography',
  description: 'Découvrez des séances photos uniques pour bébés, familles, grossesses et professionnels. Contactez-nous pour réserver votre expérience inoubliable.',
  keywords: 'photographe professionnel, séance photo bébé, séance photo famille, séance photo grossesse, séance photo professionnel, Maroc',
  creator: 'Youssef Jemmane',
  
  

}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
