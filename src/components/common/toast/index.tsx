// @ts-ignore
import {Toast, ToastBody} from "reactstrap"


interface props {
    isOpen: boolean
    message: string
    color: string
}


const ToastComponents = ({isOpen, message, color}: props) => {
    return (
        <>
            <Toast className={`${color} text-white fixed-top ms-auto mt-3`} isOpen={isOpen}>
                <ToastBody className="text-center">{message}</ToastBody>
            </Toast>
        </>
    )
}

export default ToastComponents