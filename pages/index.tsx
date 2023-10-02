import Head from "next/head";
import styles from "../styles/homeNoAuth.module.scss"
import HeaderNotAuth from "@/components/homeNoAuth/headerNoAuth";


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
        <HeaderNotAuth />
      </main>
    </>
  )
};

export default HomeNotAuth;