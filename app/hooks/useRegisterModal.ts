import {create} from "zustand"
//Zustand adalah sebuah library manajemen state yang ringan dan fleksibel untuk aplikasi React.
//  Fungsi utama Zustand adalah untuk membantu Anda mengelola state aplikasi dengan lebih mudah dan efektif.

interface RegisterModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useRegisterModal