import { getUserQuestion } from "@/app/_lib/action";
import { columns } from "./columns"
import { DataTable } from "./data-table";
import Heading from "../components/heading";
const UserQuestion = async () => {
    const data = await getUserQuestion()
    return (
        <div>
            <Heading heading='User Questions' />
            <div className="py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}
export default UserQuestion