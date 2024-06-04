'use client'
import MaxWidthWrapper from '@/app/components/maxWidthWrapper'
import PageHeader from '@/app/components/pageHeader'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { cn } from '@/lib/utils'
import { Check, Loader2, MoveLeft, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
const Cart = () => {
    const { items, removeItem } = useCart()
    const [checkout, setCheckout] = useState(false)
    const cartTotal = items.reduce(
        (total, { product }) => total + product.price,
        0
    )
    const checkoutFunc = async () => {

    }
    return (
        <MaxWidthWrapper>
            <form action="https://www.payfast.co.za/eng/process" method="post">
                <input type="hidden" name="merchant_id" defaultValue={21795} />
                <input type="hidden" name="merchant_key" defaultValue="46f0cd694581a" />
                <input type="hidden" name="amount" defaultValue={10.00} />
                <input type="hidden" name="item_name" defaultValue="Test Product" />
                <Button type='submit'> Pay Now</Button>
                {/* <input type="submit" className='' /> */}
            </form>
            <PageHeader title={`${items.length === 0 ? "Your Cart is empty" : "Your Shopping Cart"}`} subTitle={`${items.length === 0 ? "Whoops! Nothing to show here yet. Start adding items to shop now!" : "View, edit, and finalize your selected items effortlessly in your shopping cart for a smooth and convenient shopping experience."}`} />
            {
                items.length > 0 ?
                    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
                        <div className='lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
                            <div
                                className={cn('lg:col-span-7', {
                                    'rounded-lg border-2 border-dashed border-zinc-200 p-12':
                                        items.length === 0,
                                })}>
                                <ul
                                    className={cn({
                                        'divide-y divide-gray-200 border-b border-t border-gray-200 h-[310px] overflow-y-auto':
                                            items.length > 0,
                                    })}>
                                    {
                                        items?.map(({ product: { id, name, section, price, images } }, index) => {
                                            return <li
                                                key={index}
                                                className='flex py-6 sm:py-10'>
                                                <div className='flex-shrink-0'>
                                                    <div className='relative h-24 w-24'>
                                                        <Image
                                                            fill
                                                            src={`https://fesjnciriccizjovoyim.supabase.co/storage/v1/object/public/images/${images[0]?.url}`}
                                                            alt='product image'
                                                            className='h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48'
                                                        />
                                                    </div>
                                                </div>

                                                <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                                                    <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                                                        <div>
                                                            <div className='flex justify-between'>
                                                                <h3 className='text-sm'>
                                                                    <Link
                                                                        href={`/product/13`}
                                                                        className='font-medium text-muted-foreground'>
                                                                        {name}
                                                                    </Link>
                                                                </h3>
                                                            </div>

                                                            <div className='mt-1 flex text-sm'>
                                                                <p className='text-muted-foreground'>
                                                                    Category: {section?.name}
                                                                </p>
                                                            </div>

                                                            <p className='mt-1 text-sm font-medium text-muted-foreground'>
                                                                {price}
                                                            </p>
                                                        </div>

                                                        <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                                                            <div className='absolute right-0 top-0'>
                                                                <Button
                                                                    aria-label='remove product'
                                                                    onClick={() => {
                                                                        removeItem(id)
                                                                    }}
                                                                    variant='ghost'>
                                                                    <X
                                                                        className='h-5 w-5'
                                                                        aria-hidden='true'
                                                                    />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className='mt-4 flex space-x-2 text-sm text-muted-foreground'>
                                                        <Check className='h-5 w-5 flex-shrink-0 text-green-500' />

                                                        <span>
                                                            Eligible for instant delivery
                                                        </span>
                                                    </p>
                                                </div>
                                            </li>
                                        })
                                    }

                                </ul>
                            </div>


                            <section className='mt-16 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 bg-gray-200 '>
                                <h2 className='text-lg font-medium text-primary'>
                                    Order summary
                                </h2>

                                <div className='mt-6 space-y-4'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm text-gray-500'>
                                            Subtotal
                                        </p>
                                        <p className='text-sm font-medium text-gray-500'>
                                            {cartTotal}
                                        </p>
                                    </div>

                                    <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                                        <div className='flex items-center text-sm text-gray-500'>
                                            <span>Delivery charges would be depend on area distance.</span>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                                        <div className='text-base font-medium text-gray-500'>
                                            Order Total
                                        </div>
                                        <div className='text-base font-medium text-gray-500'>
                                            {cartTotal}
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-6'>
                                    <Button
                                        disabled={items.length === 0}
                                        onClick={() => {
                                            // createCheckoutSession({ productIds })
                                        }
                                        }
                                        className='w-full'
                                        size='lg'>
                                        <Loader2 className='w-4 h-4 animate-spin mr-1.5' />
                                        Checkout
                                    </Button>
                                </div>
                            </section>
                        </div>
                    </div>
                    : <div className='flex justify-center items-center'>
                        <Link href={"/products"}>
                            <Button className='gap-2'>
                                <MoveLeft />
                                Back To Shopping
                            </Button>
                        </Link>
                    </div>}

        </MaxWidthWrapper>
    )
}
export default Cart
// <Loader2 className='h-4 w-4 animate-spin text-gray-500' />