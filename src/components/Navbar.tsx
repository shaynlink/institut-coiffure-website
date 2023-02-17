import styles from '@/styles/components/Navbar.module.css';
import { classNames } from '@/utils';
import { Lato } from '@next/font/google';
import Link from 'next/link';
import Button from '@/components/Button';

const lato = Lato({ subsets: ['latin'], weight: ['400'] });

export default function Navbar() {
    return (
        <nav className={classNames(styles.icNavbar, lato.className)}>
            <div className={styles.icNavbarBranding}>
                <Link href='/'><p>L&apos;Institut Coiffure</p></Link>
            </div>
            <ul className={styles.icNavbarLinks}>
                <Link href='/women'><li>Femme</li></Link>
                <Link href='/man'><li>Homme</li></Link>
                <Link href='/children'><li>Enfant</li></Link>
                <Link href='/aesthetic'><li>Esthétique</li></Link>
            </ul>
            <div className={styles.icNavbarButtons}>
                <Button text={'Connexion'} icon={'account_circle'} />
            </div>
        </nav>
    )
}