"use server";
import { getSection } from "@/app/_lib/action";
import { columns } from "./columns"
import { DataTable } from "./data-table";
import Heading from "../components/heading";
const Section = async () => {
    const data = await getSection()
    return (
        <div>
            <Heading heading='All Sections' />
            <div className="py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}
export default Section