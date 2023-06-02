import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Bienvenue à L&apos;Institut Coiffure, adresse beauté masculin-féminin chaudement recommandée par les habitants de Talence." />
        <meta name="keywords" content="Salon de Coiffure, Coiffure, Salon de Coiffure Talence, Coiffeur, Coupe" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
