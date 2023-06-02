import styles from '../styles/Prestations.module.css';
import { classNames } from '@/utils';
import { Lato } from '@next/font/google';
import useSWR from 'swr';
import axios, {
  type AxiosRequestConfig
} from 'axios';
import type {
  Category
} from '../../types/api';
import { timeConversion } from '../utils';
import Button from '@/components/Button';
import Schedule from '@/components/Schedule';
import Maps from '@/components/Maps';
import Sticky from 'react-stickynode';
import Head from 'next/head';

const lato = Lato({ subsets: ['latin'], weight: '400' });

function fetcher<T>(url: string, config: AxiosRequestConfig<T>) {
  return axios.get(url, config).then(({data}) => data);
}

export default function Prestations() {
  return (
    <>
      <Head>
        <title>L&apos;Institut Coiffure - prestations</title>
      </Head>
      <main className={classNames(styles.icContainer, lato.className)}>
        <section className={styles.icSection}>
          <h2>Toute nos prestations</h2>
          <CategoryList />
        </section>
      </main>
    </>
  )
}

function CategoryList() {

  const { data, error } = useSWR<Category[]>(
    process.env.NEXT_PUBLIC_API + '/services?key=prestations',
    (url) => fetcher<{}>(url, {})
  );

  if (error) {
    return (
      <>
        <h2>Nous n&apos;avons pas pu récuperer les préstations</h2>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>L&apos;Institut Coiffure</title>
        <meta name="description" content="Bienvenue à L&apos;Institut Coiffure, adresse beauté masculin-féminin chaudement recommandée par les habitants de Talence." />
        <meta name="keywords" content="Salon de Coiffure, Coiffure, Salon de Coiffure Talence, Coiffeur, Coupe" />
      </Head>
      <div className={styles.icServicesContainer}>
        <section className={styles.icCategories} id="bottomSection">
          {data?.map((category) => (
            <div key={category._id} className={styles.icCategory}>
              <h3>{category.name}</h3>
              {category.services.map((service, index) => (
                <div
                  key={service._id}
                  className={classNames(styles.icService, 'icBoxShadow')}
                  id={index === category.services.length - 1 ? 'bottomSection' : ''}
                >
                  <div className={styles.icPrimaryInfo}>
                    <p>{service.name}</p>
                    {'description' in service && (
                      <p className={styles.icDescription}>{service.description}</p>
                    )}
                  </div>
                  <div className={styles.icSecondaryInfo}>
                    <p>{timeConversion(service.duration)} &middot; {service.price} €</p>
                    <Button
                      text={'Choisir'}
                      buttonStyles={{
                        height: '2rem',
                        width: '5rem',
                        fontSize: '15px',
                        justifyContent: 'center'
                      }}
                      href={process.env.NEXT_PUBLIC_BOOKING || '/'}
                    >Choisir</Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        <section className={styles.icScheduleContainer}>
          <Sticky
            enabled={true}
            top={100}
            bottomBoundary={"#bottomSection"}
            activeClass='active sticky_overwrite_fix_active'
            innerClass={styles.icInnerClass}
          >
            <Schedule />
            <Maps forwardClassname={classNames(styles.icMaps, 'icBoxShadow')} zoom={12} pitch={60} />
          </Sticky>
        </section>
      </div>
    </>
  )
}
