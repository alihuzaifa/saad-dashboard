import { Input } from "@/components/ui/input";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Heading from "@/app/components/heading";
import prisma from "@/app/_lib/db";
import SubmitButton from "@/app/components/submitButtons";
async function getData({ id }: { id: number }) {
    noStore();
    const data = await prisma.section.findUnique({
        where: {
            id: +id,
        }
    });
    if (!data) return redirect("/dashboard/sections");
    return data;
}
const UpdateSection = async ({ params: { id } }: {
    params: { id: number };
}) => {
    async function postData(formData: FormData) {
        "use server";
        const name = formData.get("name") as string;
        if (name) {
            await prisma.section.update({
                where: { id: +id },
                data: { name }
            })
            revalidatePath("/dashboard/sections");
            return redirect("/dashboard/sections");
        }
    }
    const data = await getData({ id: id });
    return (
        <div>
            <Heading heading="New Section" />
            <form method="post" action={postData}>
                <div className="flex items-center">
                    <Input defaultValue={data?.name} type="text" id="name" name="name" placeholder="Section Name" required />
                </div>
                <div className="flex justify-end mt-3">
                    <SubmitButton name="Update" />
                </div>
            </form >
        </div >
    );
};
export default UpdateSection;