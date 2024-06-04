"use client"
import { deleteFaq } from '@/app/_lib/action'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Delete } from 'lucide-react'
import React from 'react'
type Faq = { id: number, question: string, answer: string }
export default function FaqList({ data }: { data: Faq[] }) {
    return (
        <Accordion type="single" collapsible className="w-full">
            {
                data?.map(({ question, answer, id }, index: number) => {
                    return <AccordionItem value={`item-${index + 1}`} key={id}>
                        <AccordionTrigger>{question}</AccordionTrigger>
                        <AccordionContent className='flex justify-end items-center my-1'>
                            <Delete className='cursor-pointer' size={30} onClick={async () => {
                                await deleteFaq(id)
                            }} />
                        </AccordionContent>
                        <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                })
            }

        </Accordion>
    )
}
