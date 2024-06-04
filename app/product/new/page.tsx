"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { getSection, imageUpload, saveProduct } from "@/app/_lib/action"
import FileInput from "@/app/components/fileInput"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Heading from "@/app/components/heading"
import { Loader2 } from "lucide-react"
const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Please Provide Name",
    }),
    price: z.string().min(2, {
        message: "Please Provide Price",
    }),
    description: z
        .string()
        .min(10, {
            message: "Description must be at least 10 characters.",
        }),
    section: z
        .string({
            required_error: "Please provide category",
        }),
    offer: z
        .string({
            required_error: "Please provide offer",
        }),
    images: z.array(z.unknown()).optional(),
})
export default function NewProduct() {
    const [imagesError, setImageError] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [section, setSection] = useState<any[]>([])
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            offer: "",
            section: "",
            images: []
        },
    })
    async function onSubmit(data: any) {
        setLoading(true)
        if (data?.images?.length === 0) {
            setImageError(true)
            return
        }
        const allImages = []
        if (data.images) {
            for (let index = 0; index < data.images.length; index++) {
                const formData = new FormData();
                formData.append("image", data.images[index]);
                const uploadImage = await imageUpload(formData);
                allImages.push(uploadImage);
            }
        }
        const offer = data?.offer === "yes" ? true : false
        const postObj = { ...data, images: allImages, offer: offer, price: Number(data?.price), section: Number(data?.section) }
        await saveProduct(postObj)
        form.reset()
        setLoading(false)
    }
    const init = async () => {
        const data = await getSection();
        setSection(data)
    }
    useEffect(() => {
        init()
    }, []);
    return (
        <Form {...form}>
            <Heading heading='New Product' />
            <Card>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Product Data</CardTitle>
                        <CardDescription>
                            Please provide Product information. Please dont
                            forget to save
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Product Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="section"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Section</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a section" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Section</SelectLabel>
                                                {
                                                    section?.map(({ name, id }: any) => {
                                                        return <SelectItem key={id} value={`${id}`}>{name}</SelectItem>
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="offer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Is Offer</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Please provide offer" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Offer</SelectLabel>
                                                <SelectItem value={"yes"}>Yes</SelectItem>
                                                <SelectItem value={"no"}>No</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Product Price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Please provide a description"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FileInput
                            setValue={form.setValue}
                            watch={form.watch}
                            errors={form.formState.errors}
                            setImageError={setImageError}
                        />
                        {imagesError && <div className="text-red-600 mt-3">Please provide images</div>}
                    </CardContent>
                    <CardFooter className="flex justify-end items-center">
                        {loading ? (
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please Wait
                            </Button>
                        ) : (
                            <Button type="submit">
                                Save
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </Form>
    )
}