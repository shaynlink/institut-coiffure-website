import styles from '@/styles/Pictures.module.css'
import { Lato } from '@next/font/google';
import { classNames } from '@/utils';
import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios';
import useSWR from 'swr';
import { Image as ImageAPI, Images } from '@/../types/api';
import Image from 'next/image';
import Head from 'next/head';

const lato = Lato({ subsets: ['latin'], weight: ['400'] });

function fetcher<T>(url: string, config: AxiosRequestConfig<T>) {
  return axios.get(url, {validateStatus: () => true, ...config}).then((data) => data);
}

export default function Pictures() {
  const { data, error } = useSWR<AxiosResponse<Images>>(
    process.env.NEXT_PUBLIC_API + '/legacy/proxy/booksy/images',
    (url) => fetcher<{ params: { limitServices: number } }>(url, {})
  );

  const result = data?.data as { images: ImageAPI[] };

  return (
    <>
      <Head>
        <title>L&apos;Institut Coiffure - prestations</title>
      </Head>
      <main>
        <section className={classNames(styles.icContainer, lato.className)}>
          <h2>Nos photos</h2>
          {error || data?.status !== 200 ? (
            <p>Nous n&apos;avons pas pu récuperer les images.</p>
          ) : (
            <div className={styles.icPicturesContainer}>
              {result && result.images.map((image: ImageAPI) => (
                <div key={image.image_id} className={styles.icPictureContainer}>
                  <Image
                    src={image.image}
                    alt={image.description}
                    width={image.width}
                    height={image.height}
                    className={classNames(styles.icPicture, 'icBoxShadow')}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

