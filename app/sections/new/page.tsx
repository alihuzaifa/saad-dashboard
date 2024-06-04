import { saveSectionData } from "@/app/_lib/action";
import Heading from "@/app/components/heading";
import SubmitButton from "@/app/components/submitButtons";
import { Input } from "@/components/ui/input"
export default function NewSection() {
    async function createSection(formData: FormData) {
        "use server"
        const name = formData.get("section-name") as string;
        await saveSectionData(name)
    }
    return (
        <>
            <Heading heading='New Section' />
            <form action={createSection} className="space-y-8">
                <div className="flex items-center">
                    <Input type="name" id="name" name="section-name" required placeholder="Section Name" />
                </div>
                <div className="flex justify-end items-center">
                    <SubmitButton name="Add Section" />
                </div>
            </form>
        </>
    )
}