import Link from 'next/link'
import PageHeader from './components/pageHeader'
import { buttonVariants } from '@/components/ui/button'
export default function NotFound() {
    return (
        <div>
            <PageHeader title='Oops! ' primaryText='404 - Page Not Found ' subTitle="Sorry, It looks like the page you're looking for does not exist." />
            <div className='flex items-center justify-center mb-4'>
                <Link
                    href='/'
                    className={buttonVariants()}>
                    Back to Home
                </Link>
            </div>
        </div>
    )
}