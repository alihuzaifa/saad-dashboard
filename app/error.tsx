'use client'
import { Button } from "@/components/ui/button"
import PageHeader from "./components/pageHeader"
export default function GlobalError({
  reset,
  error
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <PageHeader title='Something went wrong!' subTitle={`${error.message}`} />
        <div className='flex justify-center items-center'>
          <Button onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </body>
    </html>
  )
}