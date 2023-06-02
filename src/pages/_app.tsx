import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import styles from '@/styles/App.module.css';
import { motion } from 'framer-motion';
import { Lato } from '@next/font/google';
import { classNames } from '@/utils';
import { useEffect, useState, createRef, LegacyRef, useReducer } from 'react';
import axios, {
  type AxiosRequestConfig
} from 'axios';
import useSWR from 'swr';
import type {
  Category,
} from '../../types/api';
import type { NotifSettingInterface } from 'types';
import { ThemeContext, ThemeDispatchContext, Theme } from '@/lib/ThemeContext';

// Components
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Head from 'next/head';

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

interface NotifElement extends HTMLDivElement {
  _timeout: NodeJS.Timeout
}

function fetcher<T>(url: string, config: AxiosRequestConfig<T>) {
  return axios.get(url, config).then(({data}) => data);
}

function themeReducer(state: Theme, action: Theme): Theme {
  return action;
}

export default function App({ Component, pageProps }: AppProps) {
  const welcomePopupRef: LegacyRef<HTMLDivElement> = createRef<HTMLDivElement>();
  const notifierRef: LegacyRef<HTMLDivElement> = createRef<HTMLDivElement>();
  const [isFirstTime, setFirstTime] = useState(false);
  const [theme, dispatch] = useReducer<(state: Theme, action: Theme) => Theme>(themeReducer, 'light');

  const { data, error } = useSWR<Category[]>(
    process.env.NEXT_PUBLIC_API + '/services?key=app',
    (url) => fetcher<{ params: { limitServices: number } }>(url, {
      params: {
        limitServices: 3,
      }
    })
  );

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstTime]);

  useEffect(() => {
    if (!window.notifInc) {
      window.notifInc = 0;
    }

    if (!window.createNotif) {
      window.createNotif = function(msg: string, color: [string, string], time: number, setting?: NotifSettingInterface) {
        window.notifInc++;
        const notif = document.createElement('div') as NotifElement;

        const content = document.createElement('div');
        if (setting?.contentStyle) {
          for (const [key, value] of Object.entries(setting.contentStyle)) {
            content.style[key as any] = value;
          }
        }
        content.innerHTML = msg;

        const loader = document.createElement('div');
        loader.className = styles.icNotifLoader;

        const loadBar = document.createElement('div');
        loadBar.className = styles.icNotifLoadBar;

        loader.appendChild(loadBar);

        notif.appendChild(content);
        notif.appendChild(loader);

        notif.id = `notif-${window.notifInc}`;
        const endTime = Date.now() + time;
        const duration = endTime - Date.now();

        function getElapsedPercentage() {
          const elapsed = Math.max(0, duration - (endTime - Date.now())); // Temps écoulé en ms
          return (elapsed / duration) * 100; // Pourcentage de temps écoulé
        }

        const interval = setInterval(() => {
          loadBar.style.width = `${getElapsedPercentage()}%`, 0
        });

        notif._timeout = setTimeout(() => {
          setTimeout(() => {
            clearInterval(interval);
            notif.remove();
          }, 1000);
          notif.style.animation = '.2s ease-in slideout';
          notif.style.opacity = '0';
        }, time);
        notif.style.color = color.shift() as string;
        notif.style.backgroundColor = color.shift() as string;

        if (setting?.style) {
          for (const [key, value] of Object.entries(setting.style)) {
            notif.style[key as any] = value;
          }
        }

        if (notifierRef.current) {
          notifierRef.current.appendChild(notif);
        }
      }

      window.createNotif(
        '<span class="material-symbols-outlined" style="margin-right: 1rem">warning</span> Le site est actuellement en bêta, si vous rencontrée des difficultés merci de me contacter',
        ['black', '#EAEA0A'],
        5000,
        {
          contentStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }
      )
    }
  }, []);

  return (
    <>
      <Head>
        <title>L&apos;Institut Coiffure</title>
      </Head>
      <ThemeContext.Provider value={theme}>
        <ThemeDispatchContext.Provider value={dispatch}>
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
            <Navbar fetchData={data} fetchError={error} />
            <Component {...pageProps} />
            <Footer fetchData={data} />
          </motion.div>
          <div
            ref={notifierRef}
            className={classNames(styles.icNotifier, lato.className)}
          />
        </ThemeDispatchContext.Provider>
      </ThemeContext.Provider>
    </>
  )
}
