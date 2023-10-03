import Head from "next/head";
import styles from "../styles/HomeNoAuth.module.scss"
import HeaderNotAuth from "@/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/components/presentationSection";


const HomeNotAuth = () => {
  return (
    <>
      <Head>
        <title>Onebitflix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="Onebitflix" key="title"/>
        <meta name="descriptions" content="tenha acesso aos melhores conteúdos de programação de uma forma simples e fácil."/>
      </Head>
      <main>
        <div className={styles.sectionBackground}>
          <HeaderNotAuth />
          <PresentationSection />
        </div>
      </main>
    </>
  )
};

export default HomeNotAuth;