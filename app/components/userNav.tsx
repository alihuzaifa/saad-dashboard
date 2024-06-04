
import { DoorClosed, } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export async function UserNav({
    name,
    email,
    image,
    web = false,
}: {
    name: string;
    email: string;
    image: string;
    web?: boolean;
}) {
    const { getUser } = getKindeServerSession();
    // const user: any = await getUser();
    // if (!user) {
    //     return redirect("/");
    // }
    // const userRole = await findUserRole(user?.id)
    const firstWord = name.charAt(0).toUpperCase()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 rounded-full">
                        <AvatarImage src={image} alt="" />
                        <AvatarFallback>{firstWord || ""}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>

                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* {userRole === "ADMIN" && !web ?
                    <Link href={'/dashboard'}>
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">Go To Dashboard</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </Link> : <Link href={'/'}>
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">Go To Web</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </Link>
                } */}
                <DropdownMenuItem
                    className="w-full flex justify-between items-center"
                    asChild
                >
                    <LogoutLink>
                        Logout{" "}
                        <span>
                            <DoorClosed className="w-4 h-4" />
                        </span>
                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}