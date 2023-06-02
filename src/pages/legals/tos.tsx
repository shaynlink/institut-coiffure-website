import styles from '@/styles/legals/tos.module.css';
import Link from 'next/link';
import { Lato } from '@next/font/google';

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });


export default function Tos() {
  return (
    <main>
      <section className={styles.icContainer}>
        <object className={styles.icPdfContainer} data="/CGU.pdf" type="application/pdf" width="100%" height="1020px">
          <p className={lato.className} style={{textAlign: 'center', padding: '4rem'}}>Unable to display PDF file. <Link href="/CGU.pdf" style={{color: 'blue'}}>Download</Link> instead.</p>
        </object>
      </section>
    </main>
  )
}
