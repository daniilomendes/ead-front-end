import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import styles from "../../../../styles/profile.module.scss"
//@ts-ignore
import { Form, FormGroup, Label, Button, Input } from 'reactstrap'
import profileService from "@/services/profileService"
import ToastComponents from "@/components/common/toast"


const PasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [color, setColor] = useState("")
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        profileService.fetchCurrent().then((password) => {
            setCurrentPassword(password.currentPassword);
            setNewPassword(password.newPassword);
        });
    }, []);

    const handlePasswordUpadate = async function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (newPassword != confirmPassword) {
            setToastIsOpen(true);
            setErrorMessage("Senha e confirmação de senha diferentes!");
            setColor("bg-danger");
            setTimeout(() => setToastIsOpen(false), 1000 * 3);

            return;
        }

        if (currentPassword === newPassword) {
            setToastIsOpen(true);
            setErrorMessage("Não coloque a nova senha igual a senha antiga!");
            setColor("bg-danger");
            setTimeout(() => setToastIsOpen(false), 1000 * 3);

            return;
        }

        const res = await profileService.passwordUpdate({
            currentPassword,
            newPassword,
        });

        if (res === 204) {
            setToastIsOpen(true)
            setErrorMessage("Senha alterada com sucesso!")
            setColor("bg-success")
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)

            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }

        if (res === 400) {
            setToastIsOpen(true)
            setErrorMessage("Senha atual incorreta!")
            setColor("bg-danger")
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
        }
    }

    return (
        <>
            <Form onSubmit={handlePasswordUpadate} className={styles.form}>
                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label for="currentPassword" className={styles.label}>SENHA ATUAL</Label>
                        <Input name="currentPassword" type="password" id="currentPassword" placeholder="**********" required minLength={6} maxLength={12}
                            className={styles.input} value={currentPassword} onChange={(event: ChangeEvent<HTMLInputElement>) => { setCurrentPassword(event.currentTarget.value) }} />
                    </FormGroup>
                </div>
                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label for="newPassword" className={styles.label}>NOVA SENHA</Label>
                        <Input name="newPassword" type="password" id="newPassword" placeholder="**********" required minLength={6} maxLength={12}
                            className={styles.inputFlex} value={newPassword} onChange={(event: ChangeEvent<HTMLInputElement>) => { setNewPassword(event.currentTarget.value) }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmNewPassword" className={styles.label}>CONFIRMAR NOVA SENHA</Label>
                        <Input name="confirmNewPassword" type="password" id="confirmNewPassword" placeholder="**********" required minLength={6} maxLength={12}
                            className={styles.inputFlex} value={confirmPassword} onChange={(event: ChangeEvent<HTMLInputElement>) => { setConfirmPassword(event.currentTarget.value) }} />
                    </FormGroup>
                </div>
                <Button type="submit" outline className={styles.formBtn}>Salvar Alterações</Button>
            </Form>
            <ToastComponents color={color} isOpen={toastIsOpen} message={errorMessage} />
        </>
    )
}

export default PasswordForm