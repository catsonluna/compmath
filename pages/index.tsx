
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Header from './components/header';
import { generateEquation } from '@/websocket-server/gen';
// the style
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';
import { isLoggedIn } from './components/profile';
// font
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // Add your image URL here
  const imgUrl = "https://www.freeiconspng.com/thumbs/calculator-icon/calculator-icon-17.png";
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Compmath</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.fixed}`}>
        <Header />
        <main className={`${styles.main} ${inter.className}`}>
          <div>
            <h1>CompMath</h1>
          </div>
          <div className={`${styles.holding}`}>
            <div className={`${styles.text}`}>{/*teksta div*/}
              <h1 className={`${styles.h1}`}>Are you a math psycho?</h1>
              <h1 className={`${styles.h1}`}>Try out our game and see!</h1>
              <h3 className={`${styles.h3}`}>Game for real nerds and for those who hate nerds!</h3>
              <a className={`${styles.res}`} onClick={() => {
                if(isLoggedIn()){
                  router.push("/game")
                }else{
                  router.push("/login")
                }
              }}>Join</a>
            </div>
            <div className={`${styles.img}`}>{/*img div*/}
              {/* Add the Image component here */}
              <Image src={imgUrl} alt="Your description" layout="fill" objectFit="contain" />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
