import styles from "./styles.module.scss"
// @ts-ignore
import { Container } from "reactstrap"

const Footer = () => {
    return (
        <>  
            <Container className={styles.footer}>
                <img src="/logoOnebitcode.svg" alt="logoFooter" className={styles.footerLogo}/>
                <a href="http://onebitcode.com" target={'_blank'} className={styles.footerLink}>ONEBITCODE.COM</a>
            </Container>
        </>
    )
}

export default Footer