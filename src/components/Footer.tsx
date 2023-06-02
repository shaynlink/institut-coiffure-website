import { Fragment } from 'react';
import styles from '@/styles/components/Footer.module.css';
import { Lato } from '@next/font/google';
import { classNames } from '@/utils';
import { Category, Service } from 'types/api';
import Link from 'next/link';
import { useRouter } from 'next/router';

const lato = Lato({ subsets: ['latin'], weight: ['400'] });

function Fallback() {
  return <h1>Loading ...</h1>
}

function Services({ services, services_count }: { services: Service[], services_count: number }) {
  const router = useRouter();

  return (
    <>
      {services.map((service, i) => (
        <Fragment key={i}>
          <p
            className={styles.icLink}
            onClick={() => router.push('/prestations')}
            style={{ cursor: 'pointer' }}
          >
            {service.name}
          </p>
          {
            (i == (services.length - 1)) &&
            (services_count > 3) &&
            (
              <p
                className={styles.icSeeMore}
                onClick={() => router.push('/prestations')}
                style={{ cursor: 'pointer' }}
              >voir plus</p>
            )
          }
        </Fragment>
      ))}
    </>
  )
}

function Category({ category }: { category: Category }) {
  return (
    <div className={styles.icCategory}>
      <Link style={{fontSize: '24px'}} href="/prestations">{category.name}</Link>
      <Services services={category.services} services_count={category.services_count} />
    </div>
  )
}

function ListServices({ categories }: { categories:
  Category[] | undefined }) {

  if (!categories) {
    return <Fallback />
  }

  return (
    <>
      {categories.map((category) => (
        <Category
          key={category._id}
          category={category}
        />
      ))}
    </>
  )
}

export default function Footer({
  fetchData,
}: {
  fetchData: Category[] | undefined
}) {
  return (
    <>
      <footer className={classNames(styles.icFooter, lato.className)}>
        <div className={styles.icListing}>
          <div className={styles.icCategory}>
            <Link
              style={{
                fontSize: '25px'
              }}
              href={'/'}
            >L&apos;Institut Coiffure</Link>
            <p className={styles.icLink}><Link href="https://booksy.com/fr-fr/21426_l-institut-coiffure_salon-de-coiffure_80493_talence">booksy</Link></p>
            <p className={styles.icLink}><Link href="/prestations">prestations</Link></p>
            <p className={styles.icLink}><Link href="/pictures">photos</Link></p>
            <p className={styles.icLink}><Link href="/products">produits</Link></p>
          </div>
          <ListServices categories={fetchData} />
        </div>
        <div className={styles.footerBottom}>
          <p>All Right Reserved © L&apos;Institut Coiffure</p>
          <ul>
            <li><Link href="/legals/tos">Conditions d&apos;Utilisateur</Link></li>
          </ul>
        </div>
      </footer>
    </>
  )
}
