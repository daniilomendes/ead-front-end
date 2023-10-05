import styles from "../styles/search.module.scss"
import Head from "next/head"
import HeaderAuth from "@/components/common/headerAuth"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import courseService, { CourseType } from "@/services/courseService"
//@ts-ignore
import { Form, FormGroup, Label, Container, Button, Input } from 'reactstrap'
import SearchCard from "@/components/searchCard"
import Footer from "@/components/common/footer"

const Search = () => {

    const router = useRouter()
    const searchName: any = router.query.name
    const [searchResult, setSearchResult] = useState<CourseType[]>([])

    const seachCourses = async function () {
        const res = await courseService.getSearch(searchName)
        setSearchResult(res.data.courses)

    }

    useEffect(() => {
        seachCourses()
    }, [searchName])

    return (
        <>
            <Head>
                <title>Onebitflix - {searchName}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main className={styles.main}>
                <div className={styles.headerFooterBg}>
                    <HeaderAuth />
                </div>
                {searchResult.length >= 1 ? (
                    <div className={styles.searchResult}>
                        <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
                        {searchResult?.map((course) => (
                            <SearchCard key={course.id} course={course} />
                        ))}
                    </Container>
                    </div>
                ) :
                    <p className={styles.noSearchResult}>Nenhum resultado encontrado :/</p>
                }
                <div className={styles.headerFooterBg}>
                    <Footer />
                </div>
            </main>
        </>
    )
}

export default Search