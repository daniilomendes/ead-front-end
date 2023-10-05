import styles from "../../../../styles/profile.module.scss"
//@ts-ignore
import { Form, FormGroup, Label, Button, Input } from 'reactstrap'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import profileService from "@/services/profileService"
import ToastComponents from '@/components/common/toast'
import { useRouter } from "next/router"


const UserForm = () => {
    const router = useRouter()
    const [color, setColor] = useState("")
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [initialEmail, setInitialEmail] = useState("")
    const [created_at, setCreatedAt] = useState("")
    const date = new Date(created_at)
    const month = date.toLocaleDateString("default", {month: "long"})

    useEffect(() => {
        profileService.fetchCurrent().then((user) => {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setPhone(user.phone);
            setEmail(user.email);
            setInitialEmail(user.email);
            setCreatedAt(user.createdAt);
        });
    }, []);

    const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const res = await profileService.userUpdate({
            firstName,
            lastName,
            phone,
            email,
            created_at,
        });

        if (res === 200) {
            setToastIsOpen(true);
            setErrorMessage("Informações alteradas com sucesso!");
            setColor("bg-success");
            setTimeout(() => setToastIsOpen(false), 1000 * 3);
            if(email !== initialEmail){
                sessionStorage.clear()
                router.push("/")
            }
        } else {
            setToastIsOpen(true);
            setErrorMessage("Você não pode mudar para esse email!");
            setColor("bg-danger");
            setTimeout(() => setToastIsOpen(false), 1000 * 3);
        }
    };

    return (
        <>
            <Form onSubmit={handleUserUpdate} className={styles.form}>
                <div className={styles.formName}>
                    <p className={styles.nameAbreviation}>
                        {firstName.slice(0, 1)}
                        {lastName.slice(0, 1)}
                    </p>
                    <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
                </div>
                <div className={styles.memberTime}>
                    <img className={styles.memberTimeImg} src="/profile/iconUserAccount.svg" alt="iconProfile" />
                    <p className={styles.memberText}>Membro desde <br /> {`${date.getDate()} de ${month} de ${date.getFullYear()}`}</p>
                </div>
                <hr />
                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label for="firstName" className={styles.label}>NOME</Label>
                        <Input id="firstName" name="firstName" type="text" placeholder="Qual é o seu nome?" required maxLength={20}
                            className={styles.inputFlex} value={firstName} onChange={(event: ChangeEvent<HTMLInputElement>) => { setFirstName(event.target.value) }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName" className={styles.label}>SOBRENOME</Label>
                        <Input id="lastName" name="lastName" type="text" placeholder="Qual é o seu sobrenome?" required maxLength={20}
                            className={styles.inputFlex} value={lastName} onChange={(event: ChangeEvent<HTMLInputElement>) => { setLastName(event.target.value) }} />
                    </FormGroup>
                </div>
                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label for="phone" className={styles.label}>WHATSAPP / TELEGRAM</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="(xx) 9xxxx-xxxx" data-mask="[-]+55 (00) 00000-0000" required
                            className={styles.input} value={phone} onChange={(event: ChangeEvent<HTMLInputElement>) => { setPhone(event.target.value) }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email" className={styles.label}>E-MAIL</Label>
                        <Input id="email" name="email" type="email" placeholder="Digite seu e-mail" required className={styles.input} value={email}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value) }} />
                    </FormGroup>
                    <Button type="submit" outline className={styles.formBtn}>Salvar Alterações</Button>
                </div>
            </Form>
            <ToastComponents color={color} isOpen={toastIsOpen} message={errorMessage} />
        </>
    )
}

export default UserForm