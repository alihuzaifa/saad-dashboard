"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { addOrRemoveOffer, deleteProduct } from "@/app/_lib/action";
import { Product, Section } from "@/types";
export const columns: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("price")}</div>
        ),
    },
    {
        accessorKey: "section",
        header: "Section",
        cell: ({ row }) => {
            const sectionName: Section = row.getValue("section")
            return <div className="capitalize">{sectionName?.name}</div>
        }
    },
    {
        accessorKey: "offer",
        header: "Offer",
        cell: ({ row }) => {
            const offer = row.getValue("offer")
            return offer ? "Yes" : "No"
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row: { original: { id, offer, images } } }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={`/dashboard/product/${id}`}>
                            <DropdownMenuItem onClick={() => {
                            }}>Edit</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={async () => {
                            const changeOffer = !offer
                            await addOrRemoveOffer(id, changeOffer)
                        }}>
                            {offer ? "Cancel Offer" : "Add Offer"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                            await deleteProduct(id, images)
                        }}>
                            Delete
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem onClick={async () => {

                        }}>
                            View
                        </DropdownMenuItem> */}
                        <Link href={`/dashboard/product/${id}`}>
                            <DropdownMenuItem onClick={() => {
                            }}>View</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
    },
]