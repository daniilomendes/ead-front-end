import styles from "../../../../styles/profile.module.scss"
//@ts-ignore
import { Form, FormGroup, Label, Button, Input } from 'reactstrap'

const PasswordForm = () => {
    return (
        <>
            <Form className={styles.form}>
                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label for="currentPasword" className={styles.label}>SENHA ATUAL</Label>
                        <Input name="currentPasword" type="password" id="currentPasword" placeholder="**********" required minLength={6} maxLength={12} className={styles.input}/>
                    </FormGroup>
                </div>
                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label for="newPassword" className={styles.label}>NOVA SENHA</Label>
                        <Input name="newPassword" type="password" id="newPassword" placeholder="**********" required minLength={6} maxLength={12} className={styles.inputFlex}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword" className={styles.label}>CONFIRMAR NOVA SENHA</Label>
                        <Input name="confirmPassword" type="password" id="confirmPassword" placeholder="**********" required minLength={6} maxLength={12} className={styles.inputFlex}/>
                    </FormGroup>
                </div>
                <Button outline className={styles.formBtn}>Salvar Alterações</Button>
            </Form>
        </>
    )
}

export default PasswordForm