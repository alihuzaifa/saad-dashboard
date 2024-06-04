import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import prisma from "../_lib/db";
const getFaq = async () => {
    const data = await prisma.faq.findMany();
    return data;
}
export async function CustomAccordion() {
    const faqs = await getFaq()
    return (
        <Accordion type="single" collapsible className="w-full">
            {
                faqs?.map(({ question, answer, id }, index: number) => {
                    return <AccordionItem value={`item-${index + 1}`} key={id}>
                        <AccordionTrigger>{question}</AccordionTrigger>
                        <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                })
            }
        </Accordion>
    )
}