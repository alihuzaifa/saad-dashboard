"use client"
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ThemeToggler from "./themeToggler";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getColor } from "../_lib/action";
const MobileNav = () => {
    const pathname = usePathname()
    const [logo, setLogo] = useState('theme-light-blue')
    const init = async () => {
        const color = await getColor();
        setLogo(color?.name ?? "")
    }
    useEffect(() => {
        init()
    }, [])
    return (
        <Sheet>
            <SheetTrigger asChild>
                <AlignJustify className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent side={"left"}>
                <div className="flex flex-col justify-between h-full py-8">
                    <div className="flex flex-col items-center gap-y-8">
                        <Link href={"/"}>
                            <Image src={`/${logo}.png`} priority alt="logo" width={54} height={54} />
                        </Link>
                        <div className="flex flex-col gap-y-6 justify-center items-center">
                            <Link href="/" legacyBehavior passHref className={`${pathname === "/" && "bg-accent/50"}`}>
                                Home
                            </Link>
                            <Link href="/about" legacyBehavior passHref className={`${pathname === "/about" && "bg-accent/50"}`}>
                                About
                            </Link>
                            <Link href={{
                                pathname: "/products",
                                query: { page: 1 },
                            }} legacyBehavior passHref className={`${pathname === "/products" && "bg-accent/50"}`}>
                                Products
                            </Link>
                            <Link href="/faq" legacyBehavior passHref className={`${pathname === "/faq" && "bg-accent/50"}`}>
                                FAQ
                            </Link>
                            
                            <Link href="/contact" legacyBehavior passHref className={`${pathname === "/contact" && "bg-accent/50"}`}>
                                Contact
                            </Link>
                        </div>
                        <div className="lg:hidden block">
                            <ThemeToggler />
                        </div>
                        <Button className="lg:hidden block">
                            <LoginLink>Sign in</LoginLink>
                        </Button>
                        <Button className="lg:hidden block">
                            <RegisterLink>Sign up</RegisterLink>
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
export default MobileNav;