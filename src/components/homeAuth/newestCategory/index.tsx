import useSWR from "swr"
import courseService from "@/services/courseService"
import SlideComponent from '@/components/common/slideComponent'
import styles from "../../../../styles/slideCategory.module.scss" 
import PageSpinner from "@/components/common/spinner"

const NewestCategory = () => {

    const {data, error} = useSWR("/newest", courseService.getNewestCourses)

    if(error) return error
    if(!data) return <PageSpinner />

    return (
        <>
            <p className={styles.titleCategory}>LANÇAMENTOS</p>
            <SlideComponent course={data.data}/>
        </>
    )
}

export default NewestCategory