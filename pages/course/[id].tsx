//@ts-ignore
import { Container, Button } from 'reactstrap'
import styles from "../../styles/coursePage.module.scss"
import Head from "next/head"
import HeaderAuth from "@/components/common/headerAuth"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import courseService, { CourseType } from "@/services/courseService"
import PageSpinner from '@/components/common/spinner'
import EpisodeList from '@/components/episodeList'
import Footer from '@/components/common/footer'

const CoursePage = () => {
    const [course, setCourse] = useState<CourseType>()
    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const router = useRouter()
    const [loading, setLoanding] = useState(true)
    const { id } = router.query

    useEffect(() => {
        if (!sessionStorage.getItem("onebitflix-token")) {
            router.push("/login")
        } else {
            setLoanding(false)
        }
    }, [])

    const getCourse = async () => {
        if (typeof id !== "string") return
        const res = await courseService.getEpisodes(id)

        if (res.status === 200) {
            setCourse(res.data)
            setLiked(res.data.liked)
            setFavorited(res.data.favorited)
        }
    }

    useEffect(() => {
        getCourse()
    }, [id])

    const handleLikeCourse = async () => {
        if (typeof id !== "string") return

        if (liked === true) {
            await courseService.removeLike(id)
            setLiked(false)
        } else {
            await courseService.like(id)
            setLiked(true)
        }
    }

    const handleFavCourse = async () => {
        if (typeof id !== "string") return

        if (favorited === true) {
            await courseService.removeFav(id)
            setFavorited(false)
        } else {
            await courseService.addToFav(id)
            setFavorited(true)
        }
    }

    if (course === undefined) return <PageSpinner />

    if (loading) {
        return <PageSpinner />
    }

    return (
        <>
            <Head>
                <title>Onebitflix - {course?.name}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <div style={{
                    backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "550px"
                }}>
                    <HeaderAuth />
                </div>
                <Container className={styles.courseInfo}>
                    <p className={styles.courseTitle}>{course?.name}</p>
                    <p className={styles.courseDescription}>{course?.synopsis}</p>
                    <Button outline className={styles.courseBtn} disabled={course?.episodes?.length === 0 ? true : false}>
                        ASSITIR AGORA
                        <img src="/buttonPlay.svg" alt="buttonImg" className={styles.buttonImg} />
                    </Button>
                    <div className={styles.interactions}>
                        {liked === false ? (
                            <img src="/course/iconLike.svg" alt="likeImage" className={styles.interactionsImage} onClick={handleLikeCourse} />
                        ) : (
                            <img src="/course/iconLiked.svg" alt="likeImage" className={styles.interactionsImage} onClick={handleLikeCourse} />
                        )}
                        {favorited === false ? (
                            <img src="/course/iconAddFav.svg" alt="favImage" className={styles.interactionsImage} onClick={handleFavCourse} />
                        ) : (
                            <img src="/course/iconFavorited.svg" alt="favImage" className={styles.interactionsImage} onClick={handleFavCourse} />
                        )}

                    </div>
                </Container>
                <Container className={styles.episodeInfo}>
                    <p className={styles.episodeDivision}>EPISÓDIOS</p>
                    <p className={styles.episodeLenght}>
                        {course?.episodes?.length} episódios
                    </p>
                    {course?.episodes?.length === 0 ? (
                        <p>
                            <strong>Não temos episódios ainda, volte outra hora! &#x1F606;&#x1F918;</strong>
                        </p>
                    ) : (
                        course?.episodes?.map((episode) => (
                            <EpisodeList key={episode.id} episode={episode} course={course} />
                        ))
                    )}
                </Container>
                <Footer />
            </main>
        </>
    )
}

export default CoursePage   