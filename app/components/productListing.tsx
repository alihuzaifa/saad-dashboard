'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import ImageSlider from './imageSlider'
interface ProductListingProps {
    index: number;
    obj?: any;
    href?: string;
}
const ProductListing = ({
    index,
    obj,
    href = "/"
}: ProductListingProps) => {
    const urls = obj?.images.map(({ url }: any) => `https://fesjnciriccizjovoyim.supabase.co/storage/v1/object/public/images/${url}`);
    const [isVisible, setIsVisible] = useState<boolean>(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, index * 75)
        return () => clearTimeout(timer)
    }, [index])

    if (!isVisible) return <ProductPlaceholder />
    if (isVisible) {
        return (
            <Link
                className={cn(
                    'invisible h-full w-full cursor-pointer group/main',
                    {
                        'visible animate-in fade-in-5': isVisible,
                    }
                )}
                href={`/${href}`}
            >
                <div className='flex flex-col w-full'>
                    <ImageSlider urls={urls} />

                    <h3 className='mt-4 font-medium text-sm '>
                        {obj?.name}
                    </h3>
                    <p className='mt-1 font-medium text-sm text-muted-foreground'>
                        {obj?.price}
                    </p>
                </div>
            </Link>
        )
    }
}
export const ProductPlaceholder = () => {
    return (
        <div className='flex flex-col w-full'>
            <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
                <Skeleton className='h-full w-full' />
            </div>
            <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
            <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
            <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
        </div>
    )
}
export default ProductListing