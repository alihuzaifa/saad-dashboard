"use client"
import { ArrowRightIcon, Loader2, MailIcon, MessageSquare, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createUserQuestion } from "../_lib/action";
const Form = () => {
    const [loader, setLoader] = useState(false)
    const FormSchema = z.object({
        name: z.string().min(2, {
            message: "Please provide a valid name.",
        }),
        email: z.string().email({
            message: "Please provide a valid email address.",
        }),
        message: z.string().min(10, {
            message: "Please provide a message with at least 10 characters.",
        }),
    });
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: { name: "", email: "", message: "" },
        resolver: zodResolver(FormSchema),
    });
    const onSubmit = async (data: any) => {
        setLoader(true)
        await createUserQuestion(data)
        reset()
        alert("Feedback saved successfully")
        setLoader(false)
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            <div className="relative flex items-center">
                <Input required type="name" id="name" placeholder="Name" {...register('name')} />
                <User className="absolute right-6" />
            </div>
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            <div className="relative flex items-center">
                <Input type="email" required id="email" placeholder="Email" {...register('email')} />
                <MailIcon className="absolute right-6" />
            </div>
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            <div className="relative flex items-center">
                <Textarea placeholder="Type your message" required {...register('message')} />
                <MessageSquare className="absolute top-4 right-6" />
            </div>
            {errors.message && <p className="text-red-500">{errors.message.message}</p>}
            {loader ? (
                <Button className="flex items-center gap-x-1 max-w-[166px]" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                </Button>
            ) : (
                <Button className="flex items-center gap-x-1 max-w-[166px]" type='submit'>
                    Lets Talk
                    <ArrowRightIcon size={20} />
                </Button>
            )}
        </form>
    );
};
export default Form;