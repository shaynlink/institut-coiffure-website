import { Html, Head, Main, NextScript } from 'next/document'
import { CSPGenerator } from '@/utils'

const generateCSP = CSPGenerator();

export default function Document() {
  const [, nonce] = generateCSP();

  return (
    <Html lang="en">
      <Head nonce={nonce}>
        <meta property='csp-nonce' content={nonce} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" />
      </Head>
      <body>
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  )
}
