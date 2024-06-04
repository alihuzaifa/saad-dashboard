"use client"
import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
export function CustomNavigationMenu() {
    const pathname = usePathname()
    const linkClass = navigationMenuTriggerStyle()
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={`${linkClass} ${pathname === "/" && "bg-accent/50"}`}>
                        Home
                    </NavigationMenuLink>
                </Link>
                <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={`${linkClass} ${pathname === "/about" && "bg-accent/50"}`}>
                        About
                    </NavigationMenuLink>
                </Link>

                <Link href={{
                    pathname: "/products",
                    query: { page: 1 },
                }} legacyBehavior passHref>
                    <NavigationMenuLink className={`${linkClass} ${pathname === "/products" && "bg-accent/50"}`}>
                        Products
                    </NavigationMenuLink>
                </Link>
                <Link href="/faq" legacyBehavior passHref>
                    <NavigationMenuLink className={`${linkClass} ${pathname === "/faq" && "bg-accent/50"}`}>
                        FAQ
                    </NavigationMenuLink>
                </Link>
                <NavigationMenuItem>
                    <Link href="/contact" legacyBehavior passHref>
                        <NavigationMenuLink className={`${linkClass} ${pathname === "/contact" && "bg-accent/50"}`}>
                            Contact
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"