'use client'
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import useRegisterModal from "../../hooks/useRegisterModal"
import Modal from "./Modal"
import Input from "../inputs/Input"
import Heading from "../Heading"
import toast from "react-hot-toast"
import Button from "../Button"


const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register', data)
        .then(() => {
            registerModal.onClose()//Jika request berhasil, maka akan menutup modal registrasi.
        })
        .catch(() => {
            toast.error('Something went wrong')//Jika request gagal, maka akan menampilkan pesan error menggunakan library react-hot-toast.
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
            title="Welcome to Airbnb"
            subtitle="Create an account!"
            />
            <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            <Input
            id="password"
            type="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
        </div>)

    
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => {}}
            />
            <Button
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => {}}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>
                    Already have an account?
                    </div>
                    <div 
                    onClick={registerModal.onClose}
                    className="text-neutral-800 cursor-pointer hover:underline ">
                    Log in
                    </div>
                </div>
            </div>
        </div>
    )
    
    return (
        <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />

    )
}

export default RegisterModal