"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { useDebouncedCallback } from "use-debounce";
export default function SearchBar() {
    const searchParams = useSearchParams();
    const [sort, setSort] = useState<string>("price-asc")
    const { replace } = useRouter();
    const pathname = usePathname();
    const handleSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParams);
        if (e.target.value) {
            e.target.value.length > 1 && params.set("q", e.target.value);
            params.set("sort", sort);
        } else {
            params.delete("q");
        }
        replace(`${pathname}?${params}`);
    }, 300);
    return (
        <>
            <div className='flex items-baseline justify-between pb-6 me-1' >
                <div>
                </div>
                <div className='flex items-center'>
                    <div className="space-y-2">
                        <Label>Sort</Label>
                        <Select name="sort" defaultValue={sort} onValueChange={(e) => {
                            setSort(e)
                        }}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Please Sort" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectGroup>
                                    <SelectLabel>Sort</SelectLabel>
                                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="flex justify-between gap-5 items-center">
                <Input placeholder="Search Here!" type="search" className="w-full px-4 focus:outline-none text-md rounded-lg outline-none py-8" onChange={handleSearch} />
            </div>
        </>
    )
}