import Image from "next/image";
import { getColor } from "./_lib/action";
export default async function Loading() {
    const image = await getColor();
    return (
        <div className="flex justify-center items-center h-screen">
            <Image
                src={`/${image?.name ?? "theme-light-blue"}.png`}
                alt="Loader"
                className="animate-spin"
                style={{ transform: 'rotate(45deg)' }}
                width={100}
                height={100}
            />
        </div>
    );
}