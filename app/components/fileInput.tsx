import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
const FileInput = ({ setValue, errors, watch, setImageError }: any) => {
    const name = "images";
    const label = "Images";
    const onDrop = useCallback(
        (droppedFiles: File[]) => {
            const validFiles = droppedFiles.filter((file: File) => file.type.startsWith("image/"));
            if (validFiles.length === 0) {
                setImageError(true);
                return;
            }
            setValue(name, validFiles, { shouldValidate: true });
            setImageError(false);
        },
        [setValue, name, setImageError]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
        <>
            <label htmlFor={name} className="block text-sm font-bold capitalize my-3">
                {label}
            </label>
            <div {...getRootProps()} className="mb-8">
                <input
                    multiple
                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                    id={name}
                    {...getInputProps()}
                />
                {errors.images && <div className="text-red-600 mt-3">{errors.images}</div>}
                <div className={`
          w-full border border-dashed border-gray-900 p-2 ${isDragActive ? "bg-gray-400" : "bg-gray-200"}
        `}>
                    {isDragActive ? (
                        <p className="my-2 text-center text-black">Drop the files here ...</p>
                    ) : (
                        <p className="my-2 text-center text-black">
                            Drag & drop some files here, or click to select files
                        </p>
                    )}
                    {!!watch(name)?.length && (
                        <div className="mt-2 grid grid-cols-1 gap-1">
                            {watch(name)?.map((file: any) => (
                                <div key={file.name} style={{ position: 'relative', height: '200px', width: '100%', marginBottom: '5px' }}>
                                    <Image src={URL.createObjectURL(file)} fill alt={file.name} priority />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default FileInput;