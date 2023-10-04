import Head from "next/head";
import styles from "../styles/profile.module.scss"
import UserForm from "@/components/profile/user";
import HeaderAuth from "@/components/common/headerAuth";
// @ts-ignore
import { Container, Row, Col, Button } from 'reactstrap'
import Footer from "@/components/common/footer";

const UserInfo = () => {
    return (
        <>
            <Head>
                <title>Onebitflix - Meus dados</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <div className={styles.header}>
                    <HeaderAuth />
                </div>
                <Container className="py-5">
                    <p className={styles.title}>Minha Conta</p>
                    <Row className="pt-3 pb-5">
                        <Col md={4} className={styles.btnColumn}>
                            <Button className={styles.renderForm}>DADOS PESSOAIS</Button>
                            <Button className={styles.renderForm}>SENHA</Button>
                        </Col>
                        <Col md>
                            <UserForm />
                        </Col>
                    </Row>
                </Container>
                <div className={styles.footer}>
                    <Footer />
                </div>
            </main>
        </>
    )
}

export default UserInfo