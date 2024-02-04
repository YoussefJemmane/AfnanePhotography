import type { Metadata } from 'next'
import Head from 'next/head'
import './globals.css'
import icon from '../../public/logo-noir.webp'
import React from 'react'
import Script from 'next/script'


export const metadata: Metadata = {
  title: "Afnane Photography",
  description: "Découvrez des séances photos uniques pour bébés, familles, grossesses et professionnels. Contactez-nous pour réserver votre expérience inoubliable.",
  keywords: " Afnane Photography, Afnane photography,afnane photography, afnanephotography, afnane.photography, @afnanephotography, @afnane.photography, afnane_photography, @afnane_photography, photographe professionnel, séance photo bébé, séance photo famille, séance photo grossesse, séance photo professionnel, Maroc,",
  creator: "Youssef Jemmane",



}
export default function RootLayout({

  children,
  
}: {

  children: React.ReactNode,


}) {
  return (
    <html lang="en">
      <Script
      id='google-analytics'
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id='google-analytics-2'>
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Head >
        <title>{metadata.title as React.ReactNode}</title>
        <meta name="description" content={metadata.description as string} />
        <meta name="keywords" content={metadata.keywords as string} />
        <meta name="author" content={metadata.creator as string} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={icon.src} />
      </Head>
      <body >{children}</body>

    </html>
  )
}
