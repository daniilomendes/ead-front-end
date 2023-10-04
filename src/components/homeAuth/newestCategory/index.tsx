//@ts-ignore
import { Form, FormGroup, Label, Container, Button, Input } from 'reactstrap'

import useSWR from "swr"
import courseService, { CourseType } from "@/services/courseService"
import HeaderAuth from "@/components/common/headerAuth"
import Link from 'next/link'
import SlideComponent from '@/components/common/slideComponent'
import styles from "../../../../styles/slideCategory.module.scss" 

const NewestCategory = () => {

    const {data, error} = useSWR("/newest", courseService.getNewestCourses)

    if(error) return error
    if(!data) return (<><p>Loading...</p></>)

    return (
        <>
            <p className={styles.titleCategory}>LANÇAMENTOS</p>
            <SlideComponent course={data.data}/>
        </>
    )
}

export default NewestCategory