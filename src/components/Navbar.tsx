import styles from '@/styles/components/Navbar.module.css';
import { classNames } from '@/utils';
import { Lato } from '@next/font/google';
import Link from 'next/link';
import Button from '@/components/Button';
import { useState, Fragment } from 'react';
import { Category } from 'types/api';
import { useRouter } from 'next/router';

const lato = Lato({ subsets: ['latin'], weight: ['400'] });
const DISABLE_LOGIN = true;

function PrestationsList({ categories, onSelected }: { categories: Category[] | undefined, onSelected: () => void }) {
  const router = useRouter();

  const handleClickLink = () => {
    router.push('/prestations');
    onSelected();
  }

  return (
    <>
      {categories?.map((category) => (
        <div
          key={category._id}
          style={{
            fontSize: '15px',
            width: '11rem',
          }}
          onClick={handleClickLink}
        >
          <p  style={{
            marginBottom: '1.5rem',
            fontSize: '20px',
            textTransform: 'capitalize',
            cursor: 'pointer'
          }}>{category.name}</p>
          {category.services.map(({ name, _id }, i) => (
            <Fragment key={_id}>
              <p className={styles.icService} style={{ cursor: 'pointer'}}>{name}</p>
              {
                (i == (category.services.length - 1)) &&
                (category.services_count > 3) &&
                (<p style={{ marginBottom: '0.8rem', textDecoration: 'underline', cursor: 'pointer' }}>voir plus</p>)
              }
            </Fragment>
          ))}
        </div>
      ))}
    </>
  )
}

export default function Navbar({
  fetchData,
  fetchError
}: {
  fetchData: Category[] | undefined;
  fetchError: any;
}) {
  const [showPrestations, setShowPrestations] = useState(false);

  const handleMouseEnter = () => {
    setShowPrestations(true);
  }

  const handleMouseLeave = () => {
    setShowPrestations(false);
  }

  const handleClick = () => {
    setShowPrestations(false);
  }

  const handleSelected = () => {
    setShowPrestations(false);
  }

  return (
    <nav
      className={classNames(styles.icNavbar, lato.className)}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.icTopNavbar}>
        <div className={styles.icNavbarBranding}>
          <Link href='/'><p>L&apos;Institut Coiffure</p></Link>
        </div>
        <ul className={styles.icNavbarLinks}>
          <Link
            href='/prestations'
            onClick={handleClick}
          >
            <li
              style={{ cursor: 'pointer' }}
              onMouseEnter={handleMouseEnter}
            >Prestations</li>
          </Link>
          <Link
            href='/pictures'
            onMouseEnter={handleMouseLeave}
            onMouseLeave={handleMouseLeave}
          >
            <li>Photos</li>
          </Link>
          <Link
            href={process.env.NEXT_PUBLIC_BOOKING || '/'}
            onMouseEnter={handleMouseLeave}
            onMouseLeave={handleMouseLeave}
          ><li>Réserver</li></Link>
        </ul>
        {!DISABLE_LOGIN && <div className={styles.icNavbarButtons}>
          <Button text={'Connexion'} icon={'account_circle'} />
        </div>
        }
      </div>
      {showPrestations && (
        <>
          <div className={styles.prestationsCategory}>
              <hr style={{ margin: '1rem 0' }}/>
            <div className={styles.prestationsList}>
              {fetchError && <p>Une erreur est survenue</p>}

              {!fetchError && <PrestationsList
                categories={fetchData}
                onSelected={handleSelected}
              />}
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
