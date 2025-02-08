'use client'

import Image from "next/image"


const Avatar = () => {
    return (
        <Image
        className="rounded-full"
        height="30"
        width="30"
        alt="avatar"
        src='https://avatar.iran.liara.run/public'
        />
    )
}

export default Avatar