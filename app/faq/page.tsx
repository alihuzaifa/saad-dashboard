import React from 'react'
import prisma from '@/app/_lib/db'
import Heading from '../components/heading';
import FaqList from '../components/faqList';
const getFaq = async () => {
    const data = await prisma.faq.findMany();
    return data;
}
export default async function Faq() {
    const faqs = await getFaq();
    return (
        <>
            <Heading heading='All FAQ' />
            <FaqList data={faqs} />
        </>
    )
}