
import { findProduct } from '@/app/_lib/action'
import prisma from '@/app/_lib/db'
import AddToCartButton from '@/app/components/addToCartButton'
import Footer from '@/app/components/footer'
import Header from '@/app/components/header'
import ImageSlider from '@/app/components/imageSlider'
import MaxWidthWrapper from '@/app/components/maxWidthWrapper'
import ProductReel from '@/app/components/productReel'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
const BREADCRUMBS = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Products', href: '/products' },
]
async function getSectionWithFilteredProducts(sectionId: number, productId: number) {
    "use server"
    try {
        const sectionWithProducts = await prisma.section.findUnique({
            where: { id: sectionId },
            include: {
                products: {
                    where: {
                        active: true,
                        offer: false
                    },
                    include: {
                        images: true,
                    },
                },
            },
        });
        // Check if the section exists
        if (!sectionWithProducts) return notFound()
        const filteredProducts = sectionWithProducts.products.filter(product => product.id !== productId);
        const limitedProducts = filteredProducts.slice(0, 3);
        return {
            ...sectionWithProducts,
            products: limitedProducts,
        };

    } catch (error) {
        throw error;
    }
}
const ProductDetail = async ({ id }: { id: string }) => {
    const product = await findProduct(Number(id))
    if (!product) return notFound()
    const { name, description, price, images, section } = product;
    const urls = images.map(({ url }: any) => `https://fesjnciriccizjovoyim.supabase.co/storage/v1/object/public/images/${url}`);
    const otherProducts = await getSectionWithFilteredProducts(section?.id ?? 0, Number(id))
    return (
        <>
            <Header />
            <MaxWidthWrapper>
                <div>
                    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
                        <div className='lg:max-w-lg lg:self-end'>
                            <ol className='flex items-center space-x-2'>
                                {BREADCRUMBS.map((breadcrumb, i) => (
                                    <li key={breadcrumb.href}>
                                        <div className='flex items-center text-sm'>
                                            <Link
                                                href={breadcrumb.href}
                                                className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                                                {breadcrumb.name}
                                            </Link>
                                            {i !== BREADCRUMBS.length - 1 ? (
                                                <svg
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'
                                                    aria-hidden='true'
                                                    className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                                                    <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                                                </svg>
                                            ) : null}
                                        </div>
                                    </li>
                                ))}
                            </ol>

                            <div className='mt-4'>
                                <h1 className='text-3xl font-bold tracking-tight text-primary sm:text-4xl'>
                                    {name}
                                </h1>
                            </div>

                            <section className='mt-4'>
                                <div className='flex items-center'>
                                    <p className='font-medium text-muted-foreground'>
                                        {price}
                                    </p>

                                    <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                                        {section?.name}
                                    </div>
                                </div>

                                <div className='mt-4 space-y-6'>
                                    <p className='text-base text-muted-foreground'>
                                        {description}
                                    </p>
                                </div>

                                <div className='mt-6 flex items-center'>
                                    <Check
                                        aria-hidden='true'
                                        className='h-5 w-5 flex-shrink-0 text-green-500'
                                    />
                                    <p className='ml-2 text-sm text-muted-foreground'>
                                        Eligible for instant delivery
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* Product images */}
                        <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
                            <div className='aspect-square rounded-lg'>
                                <ImageSlider urls={urls} />
                            </div>
                        </div>

                        <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
                            <div className='mt-10'>
                                <AddToCartButton product={product} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    otherProducts &&
                    <ProductReel
                        href={`/section/${section?.id}`}
                        title={`Similar Archietecture`}
                        subtitle={`Browse similar high-quality Archietecture just like ${name}`}
                        products={otherProducts?.products}
                        sectionId={section?.id}
                    />
                }
            </MaxWidthWrapper>
            <Footer />
        </>
    )
}
export default ProductDetail