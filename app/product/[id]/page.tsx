import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"
import { findProduct, getSection } from "@/app/_lib/action"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Heading from "@/app/components/heading"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import SubmitButton from "@/app/components/submitButtons"
import prisma from "@/app/_lib/db"
import { redirect } from "next/navigation"
import { Section } from "@/types"
export default async function UpdateProduct({ params: { id } }: any) {
    async function onSubmit(formData: FormData) {
        "use server";
        const name = formData.get("name") as string;
        const price = formData.get("price") as string;
        const section = formData.get("section") as string;
        const description = formData.get("description") as string;
        const data: any = {
            name, price: Number(price), section_id: Number(section), description
        }
        await prisma.product.update({ where: { id: Number(id) }, data });
        redirect("/dashboard/product")
    }
    const data: any = await findProduct(+id);
    const section: Section[] = await getSection();
    return (
        <div>
            <Heading heading='Update Product' />
            <Card>
                <form action={onSubmit}>
                    <CardHeader>
                        <CardTitle>Product Data</CardTitle>
                        <CardDescription>
                            Please update Product information. Please dont
                            forget to save
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="space-y-2">
                                <Label>Product Name</Label>
                                <Input
                                    name="name"
                                    type="text"
                                    id="name"
                                    placeholder="Product Name"
                                    defaultValue={data?.name ?? undefined}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Section</Label>
                                <Select name="section" defaultValue={`${data?.section_id}`}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Section</SelectLabel>
                                            {
                                                section?.map(({ name, id }) => {
                                                    return <SelectItem key={id} value={`${id}`}>{name}</SelectItem>
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Product Price</Label>
                                <Input
                                    name="price"
                                    type="number"
                                    id="price"
                                    placeholder="Product Price"
                                    defaultValue={data?.price ?? undefined}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>Product Description</Label>
                                <Textarea
                                    placeholder="Please provide a description"
                                    className="resize-none"
                                    name="description"
                                    id="description"
                                    defaultValue={data?.description ?? undefined}
                                />
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end items-center">
                        <SubmitButton name="Update" />
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}