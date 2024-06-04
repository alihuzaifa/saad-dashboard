import Link from 'next/link'
import MaxWidthWrapper from './maxWidthWrapper'
const Footer = () => {
    return (
        <footer className='flex-grow-0'>
            <MaxWidthWrapper>
                <div className='py-10 md:flex md:items-center md:justify-between'>
                    <div className='text-center md:text-left'>
                        <p className='text-sm text-muted-foreground'>
                            &copy; {new Date().getFullYear()} All Rights
                            Reserved
                        </p>
                    </div>
                    <div className='mt-4 flex items-center justify-center md:mt-0'>
                        <div className='flex space-x-8'>
                            <Link
                                href='/terms-and-condition'
                                className='text-sm text-muted-foreground hover:text-gray-600'>
                                Terms & Condition
                            </Link>
                            <Link
                                href='/privacy-policy'
                                className='text-sm text-muted-foreground hover:text-gray-600'>
                                Privacy Policy
                            </Link>
                            <Link
                                href='/no-refund-policy'
                                className='text-sm text-muted-foreground hover:text-gray-600'>
                                Refund Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    )
}
export default Footer