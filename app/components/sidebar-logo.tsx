import { getColor } from "@/app/_lib/action";
import Image from "next/image"
import { useEffect, useState } from "react";
export const SideBarLogo = () => {
    const [logo, setLogo] = useState('theme-light-blue')
    const init = async () => {
        const color = await getColor();
        setLogo(color?.name ?? "")
    }
    useEffect(() => {
        init()
    }, [])
    return <Image width={35} alt="" className="w-12 mx-3.5 min-h-fit"
        height={35} src={`/${logo}.png`} />
}