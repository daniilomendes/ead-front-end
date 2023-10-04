import styles from "../../../../styles/profile.module.scss"
//@ts-ignore
import { Form, FormGroup, Label, Button, Input } from 'reactstrap'


const UserForm = () => {
    return (
        <>
            <Form className={styles.form}>
                <div className={styles.formName}>
                    <p className={styles.nameAbreviation}>NT</p>
                    <p className={styles.userName}>NAME TEST</p>
                </div>
                <div className={styles.memberTime}>
                    <img className={styles.memberTimeImg} src="/profile/iconUserAccount.svg" alt="iconProfile" />
                    <p className={styles.memberText}>Membro desde <br /> 20 de Abril de 2020</p>
                </div>
                <hr />
                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label for="firstName" className={styles.label}>NOME</Label>
                        <Input id="firstName" name="firstName" type="text" placeholder="Qual é o seu nome?" required maxLength={20} className={styles.inputFlex} value={"Name"}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName" className={styles.label}>SOBRENOME</Label>
                        <Input id="lastName" name="lastName" type="text" placeholder="Qual é o seu sobrenome?" required maxLength={20} className={styles.inputFlex} value={"Test"}/>
                    </FormGroup>
                </div>
                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label for="phone" className={styles.label}>WHATSAPP / TELEGRAM</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="(xx) 9xxxx-xxxx" data-mask="[-]+55 (00) 00000-0000" required className={styles.input} value={"+55 (00) 00000-0000"}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email" className={styles.label}>E-MAIL</Label>
                        <Input id="email" name="email" type="email" placeholder="Digite seu e-mail" required className={styles.input} />
                    </FormGroup>
                    <Button type="submit" outline className={styles.formBtn}>Salvar Alterações</Button>
                </div>
            </Form>
        </>
    )
}

export default UserForm