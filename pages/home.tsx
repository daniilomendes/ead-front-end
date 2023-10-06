import Footer from "@/components/common/footer"
import PageSpinner from "@/components/common/spinner"
import FavoriteCategory from "@/components/homeAuth/favoriteCategory"
import FeaturedCategory from "@/components/homeAuth/featuredCategory"
import FeaturedSection from "@/components/homeAuth/featuresSection"
import ListCategories from "@/components/homeAuth/listCategories"
import NewestCategory from "@/components/homeAuth/newestCategory"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const HomeAuth = () => {
    const router = useRouter()
    const [loading, setLoanding] = useState(true)

    useEffect(() => {
        if (!sessionStorage.getItem("onebitflix-token")) {
            router.push("/login")
        } else {
            setLoanding(false)
        }
    }, [])

    if (loading) {
        return <PageSpinner />
    }

    return (
        <>
            <Head>
                <title>Onebitflix - Home</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <FeaturedSection />
                <NewestCategory />
                <FavoriteCategory />
                <FeaturedCategory />
                <ListCategories />
                <Footer />
            </main>
        </>
    )
}

export default HomeAuth