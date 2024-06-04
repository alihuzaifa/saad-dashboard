import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { getColor } from "@/app/_lib/action";
import SubmitButton from "../components/submitButtons";
import prisma from "../_lib/db";
export default async function SettingPage() {
    async function postData(formData: FormData) {
        "use server";
        const colorScheme = formData.get("color") as string;
        await prisma.settings.update({
            where: {
                id: 1,
            },
            data: {
                name: colorScheme,
            },
        });
        revalidatePath("/", "layout");
    }
    const color = await getColor();
    return (
        <div className="grid items-start gap-8">
            <div className="flex items-center justify-between px-2">
                <div className="grid gap-1">
                    <h1 className="text-3xl md:text-4xl">Settings</h1>
                    <p className="text-lg text-muted-foreground">Your Profile settings</p>
                </div>
            </div>

            <Card>
                <form action={postData}>
                    <CardHeader>
                        <CardTitle>General Data</CardTitle>
                        <CardDescription>
                            Please provide general information about yourself. Please dont
                            forget to save
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="space-y-1">
                                <Label>Color Scheme</Label>
                                <Select name="color" defaultValue={color?.name}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Color</SelectLabel>
                                            <SelectItem value="theme-green">Green</SelectItem>
                                            <SelectItem value="theme-light-blue">Light Blue</SelectItem>
                                            <SelectItem value="theme-violet">Violet</SelectItem>
                                            <SelectItem value="theme-yellow">Yellow</SelectItem>
                                            <SelectItem value="theme-orange">Orange</SelectItem>
                                            <SelectItem value="theme-red">Red</SelectItem>
                                            <SelectItem value="theme-rose">Rose</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end">
                        <SubmitButton name="Save" />
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}