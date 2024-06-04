import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
type prop = {
    title: string,
    primaryText?: string,
    subTitle: string,
    isHeaderButton?: boolean
}
export default function PageHeader({ title, primaryText, subTitle, isHeaderButton = false }: prop) {
    return (
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
                {title || ""}
                {
                    primaryText &&
                    <span className='text-primary'>
                        {primaryText}
                    </span>
                }
                .
            </h1>
            {
                subTitle &&
                <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
                    {subTitle}
                </p>
            }
            {
                isHeaderButton &&
                <div className='flex flex-col sm:flex-row gap-4 mt-6'>
                    <Link
                        href='/products'
                        className={buttonVariants()}>
                        Browse Trending
                    </Link>
                    <Button variant='ghost'>
                        Our quality promise &rarr;
                    </Button>
                </div>
            }
        </div >
    )
}