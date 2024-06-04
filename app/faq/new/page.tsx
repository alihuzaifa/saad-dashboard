import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import prisma from '@/app/_lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Heading from '@/app/components/heading'
import SubmitButton from '@/app/components/submitButtons'
export default function NewFaq() {
    async function createFaq(formData: FormData) {
        "use server"
        var question = formData.get("question-name") as string;
        var answer = formData.get("answer") as string;
        await prisma.faq.create({ data: { question, answer } })
        revalidatePath("/dashboard/faq")
        redirect('/dashboard/faq')
    }
    return (
        <>
            <Heading heading='New FAQ' />
            <form action={createFaq} className="space-y-8">
                <div className="flex items-center">
                    <Input type="text" id="question-name" name="question-name" required placeholder="Enter Question" />
                </div>
                <div className="flex items-center">
                    <Textarea placeholder="Type your answer" id="answer" name="answer" required />
                </div>
                <div className="flex justify-end items-center">
                    <SubmitButton name="Add Faq" />
                </div>
            </form>
        </>
    )
}