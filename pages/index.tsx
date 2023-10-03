import Head from "next/head";
import styles from "../styles/HomeNoAuth.module.scss"
import HeaderNotAuth from "@/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/components/homeNoAuth/presentationSection";
import CardsSection from "@/components/homeNoAuth/cardsSection";
import SlideSection from "@/components/homeNoAuth/slideSection";
import { GetStaticProps } from "next";
import courseService, { CourseType } from "@/services/courseService";
import { ReactNode } from "react";


interface IndexPageProps {
  children?: ReactNode
  course: CourseType[]
}


const HomeNotAuth = ({ course }: IndexPageProps) => {
  return (
    <>
      <Head>
        <title>Onebitflix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="Onebitflix" key="title" />
        <meta name="descriptions" content="tenha acesso aos melhores conteúdos de programação de uma forma simples e fácil." />
      </Head>
      <main>
        <div className={styles.sectionBackground}>
          <HeaderNotAuth />
          <PresentationSection />
        </div>
        <CardsSection />
        <SlideSection newestCourses={course} />
      </main>
    </>
  )
};


export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourses()
  return {
    props: {
      course: res.data
    },
    revalidate: 3600 * 24 
  }
}


export default HomeNotAuth;