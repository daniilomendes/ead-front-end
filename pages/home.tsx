import Footer from "@/components/common/footer"
import FavoriteCategory from "@/components/homeAuth/favoriteCategory"
import FeaturedCategory from "@/components/homeAuth/featuredCategory"
import FeaturedSection from "@/components/homeAuth/featuresSection"
import ListCategories from "@/components/homeAuth/listCategories"
import NewestCategory from "@/components/homeAuth/newestCategory"
import Head from "next/head"

const HomeAuth = () => {
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