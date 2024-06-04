'use client'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { useEffect, useState } from 'react'
const AddToCartButton = ({
    product,
}: {
    product: any
}) => {
    const { addItem, items } = useCart()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)
        return () => clearTimeout(timeout)
    }, [isSuccess])
    const checkProductInCart = items?.some(({ product: { id } }: any) => id === product?.id)
    return (
        <Button
            onClick={() => {
                addItem(product)
                setIsSuccess(true)
            }}
            size='lg'
            disabled={checkProductInCart}
            className='w-full'>
            {checkProductInCart ? "Added!" : isSuccess ? 'Added!' : 'Add to cart'}
        </Button>
    )
}
export default AddToCartButton;