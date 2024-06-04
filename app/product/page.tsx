import { getAllProductsWithImages } from "@/app/_lib/action"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import Heading from "../components/heading"
const Products = async () => {
    const data: any = await getAllProductsWithImages()
    return (
        <div>
            <Heading heading='All Products' />
            <div className="py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}
export default Products