"use client"
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, Loader2 } from 'lucide-react';
import React from 'react'
import { useFormStatus } from "react-dom";

const SubmitButton = ({ name }: { name: string }) => {
    const { pending } = useFormStatus()
    return (
        <div>
            {pending ? (
                <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                </Button>
            ) : (
                <Button type="submit">
                    {name}
                </Button>
            )}
        </div>
    )
}
const ColumnSubmit = ({ name }: { name: string }) => {
    const { pending } = useFormStatus()
    return (
        <div>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                </>
            ) : (
                <>{name}</>
            )}
        </div>
    )
}
export { ColumnSubmit }

export default SubmitButton