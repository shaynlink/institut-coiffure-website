import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import styles from '@/styles/App.module.css';
import { motion } from 'framer-motion';
import { Lato } from '@next/font/google';
import { classNames } from '@/utils';
import { useEffect, useState, createRef, LegacyRef } from 'react';

// Components
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

export default function App({ Component, pageProps }: AppProps) {
  const welcomePopupRef: LegacyRef<HTMLDivElement> = createRef<HTMLDivElement>();
  const [isFirstTime, setFirstTime] = useState(false);

  const handleWelcomeButton = () => {
    window.localStorage.setItem('first_time', 'no');
    setFirstTime(false);
    if (welcomePopupRef.current) {
      welcomePopupRef.current.style.display = 'none';
    }
  }

  useEffect(() => {
    const firstTime = window.localStorage.getItem('first_time');

    if (!firstTime || firstTime != 'no') {
      if (welcomePopupRef.current) {
        welcomePopupRef.current.style.display = 'flex';
      }
      console.log('[🛠️] setting - [first_time: true]');
      setFirstTime(true);
      return;
    }
    console.log('[🛠️] setting - [first_time: false]');
  }, [isFirstTime]);

  return (
    <>
      <div
        ref={welcomePopupRef}
        className={styles.icWelcomeContainer}
        style={{ display: 'none' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isFirstTime ? 1 : 0, y: 0 }}
          className={classNames(styles.icWelcome, lato.className)}
        >
          <h1>Votre Institut Coiffure</h1>
          <h1>fait peau neuve</h1>

          <Button
            text={'Entrée'}
            icon={'arrow_forward'}
            motionButton={{
              initial: {opacity: 0, y: 10},
              animate: {opacity: 1, y: 0},
              transition: {ease: 'easeOut', delay: 1}
            }}
            buttonStyles={{
              marginTop: '3rem',
              backgroundColor: '#A5E1F8',
              color: '#000',
              fontSize: 'x-large',
              padding: '9px 20px'
            }}
            onClick={handleWelcomeButton}
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isFirstTime ? 0 : 1 }}  
      >
        <Navbar />
        <Component {...pageProps} />
      </motion.div>
    </>
  )
}
