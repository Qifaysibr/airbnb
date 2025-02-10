'use client'

import {Toaster} from 'react-hot-toast'

const ToasterProvider = () => { 
    return (
        <Toaster/>
    )
}

export default ToasterProvider

//Jika kita langsung menggunakan Toaster tanpa membuat komponen ToasterProvider,
//      maka kita harus menulis kode yang sama berulang-ulang di berbagai tempat dalam aplikasi,
//           yang dapat membuat kode menjadi lebih kompleks dan sulit dipahami.