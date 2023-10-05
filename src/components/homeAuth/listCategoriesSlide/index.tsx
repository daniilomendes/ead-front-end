import useSWR from "swr"
import SlideComponent from '@/components/common/slideComponent'
import styles from "../../../../styles/slideCategory.module.scss" 
import categoriesService from "@/services/categoriesService"
import PageSpinner from "@/components/common/spinner"

interface props {
    categoryId: number
    categoryName: string
}

const ListCategoriesSlide = ({categoryId, categoryName}: props) => {
    const {data, error} = useSWR(`/categoriesCourses/${categoryId}`, () => categoriesService.getCourses(categoryId))

    if(error) return error
    if(!data) return <PageSpinner />
    return(
        <>
            <p className={styles.titleCategory}>{categoryName}</p>
            <SlideComponent course={data.data.courses}/>
        </>
    )
}

export default ListCategoriesSlide