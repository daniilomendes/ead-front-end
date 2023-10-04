import HeaderGeneric from '@/components/common/headerGeneric'
import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'
//@ts-ignore
import { Form, FormGroup, Label, Container, Button, Input } from 'reactstrap'
import Footer from '@/components/common/footer'
import { FormEvent, useState } from 'react'
import authService from '@/services/authService'
import { useRouter } from 'next/router'
import ToastComponents from '@/components/common/toast'

const Register = () => {

    const router = useRouter()
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [toastMessage, setToastMessge] = useState("")

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const firstName = formData.get("firstName")!.toString()
        const lastName = formData.get("lastName")!.toString()
        const phone = formData.get("phone")!.toString()
        const birth = formData.get("birth")!.toString()
        const email = formData.get("email")!.toString()
        const password = formData.get("password")!.toString()
        const confirmPassord = formData.get("confirmPassword")!.toString()
        const params = { firstName, lastName, phone, birth, email, password }

        if (password !== confirmPassord) {
            setToastIsOpen(true)
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
            setToastMessge("Senha e confirmação diferentes!")

            return
        }

        const { data, status } = await authService.register(params)

        if (status === 201) {
            router.push('/login?registred=true')
        } else {
            setToastIsOpen(true)
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
            setToastMessge(data.message)
        }

    }

    return (
        <>
            <Head>
                <title>Onebitflix - Registro</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
                <script src="https://jsuites.net/v4/jsuites.js"></script>
            </Head>
            <main className={styles.main}>
                <HeaderGeneric logoUrl='/' btnUrl='/login' btnContent='Quero fazer login' />
                <Container className="py-5">
                    <p className={styles.formTitle}><strong>Bem-vindo(a) ao OneBitFlix!</strong></p>
                    <Form className={styles.form} onSubmit={handleRegister}>
                        <p className='text-center'><strong>Faça sua conta!</strong></p>
                        <FormGroup>
                            <Label for="firstName" className={styles.label}>NOME</Label>
                            <Input id="firstName" name="firstName" type="text" placeholder="Qual é o seu nome?" required maxLength={20} className={styles.inputName} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName" className={styles.label}>SOBRENOME</Label>
                            <Input id="lastName" name="lastName" type="text" placeholder="Qual é o seu sobrenome?" required maxLength={20} className={styles.inputName} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone" className={styles.label}>WHATSAPP / TELEGRAM</Label>
                            <Input id="phone" name="phone" type="tel" placeholder="(xx) 9xxxx-xxxx" data-mask="[-]+55 (00) 00000-0000" required className={styles.input} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" className={styles.label}>E-MAIL</Label>
                            <Input id="email" name="email" type="email" placeholder="Digite seu e-mail" required className={styles.input} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="birth" className={styles.label}>DATA DE NASCIMENTO</Label>
                            <Input id="birth" name="birth" type="date" required min="1930-01-01" max="2012-12-31" className={styles.input} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" className={styles.label}>SENHA</Label>
                            <Input id="password" name="password" type="password" placeholder="Digite a sua senha (Min: 6 | Max: 20)" required minLength={6} maxLength={22} className={styles.input} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword" className={styles.label}>CONFIRME SUA SENHA</Label>
                            <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirme a sua senha" required minLength={6} maxLength={22} className={styles.input} />
                        </FormGroup>
                        <Button type="submit" outline className={styles.formBtn}>CADASTRAR</Button>
                    </Form>
                </Container>
                <Footer />
                <ToastComponents color='bg-danger' isOpen={toastIsOpen} message={toastMessage}/>
            </main>
        </>
    )
}

export default Register