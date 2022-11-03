import { useState } from "react";
import Image from "next/image";
import { useSWRConfig } from "swr";

import { patch, post } from "../../utils/fetcher"
import imagePlaceholder from '../../public/images/placeholder.png'
import toast from "../../utils/toast"
import LoadingIcon from "../../public/images/Icons/loading.svg"

const ProductEdit = ({ data, closeModal }) => {
    const initialValue = {
        name: "",
        description: "",
        expired_date: "",
        image: imagePlaceholder
    }

    const [value, setValue] = useState(data ? data : initialValue);
    const [rawImage, setRawImage] = useState();
    const [isEditing, setIsEditing] = useState(data ? true : false)
    const [isLoading, setIsLoading] = useState(false)
    const { mutate } = useSWRConfig()

    const handleChange = (e) => {
        const { name, value } = e.target
        setValue(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLoading) return

        const requestData = {
            ...value,
            image: rawImage,
        }

        // Assign data to form data
        const formData = new FormData()
        for (const [key, value] of Object.entries(requestData)) {
            if (value === undefined) continue
            formData.append(key, value)
        }

        try {
            setIsLoading(true)
            const response = isEditing ? await patch(`/roti/${data.id}`, formData) : await post('/roti/', formData)
            if (!response.ok) throw Exception()
            toast.success(`Post was successfully ${isEditing ? 'updated' : 'created'}`)
        } catch (e) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
            mutate('/roti')
            closeModal()
        }
    }

    const handleImageChange = (e) => {
        setRawImage(e.target.files[0])
        let imageUrl
        try {
            imageUrl = URL.createObjectURL(e.target.files[0])
        } catch {
            imageUrl = imagePlaceholder
        } finally {
            handleChange({
                target: {
                    name: "image",
                    value: imageUrl
                }
            })
        }
    }

    return (
        <div className="flex flex-col">
            <h2 className="text-primary-700 text-center h2">{isEditing ? 'Edit' : 'Add'} Bread</h2>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row mt-4 h-full">
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <span className="label-form block w-full">Picture</span>
                    <div className="w-full max-w-[400px] aspect-square relative rounded-3xl overflow-hidden flex justify-center items-center">
                        <Image
                            src={value.image}
                            fill={true}
                            alt={`Image of ${value.name}`}
                            className="object-cover mx-auto"
                        />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        encType="multipart/form-data"
                        onChange={handleImageChange}
                        className="file-input"
                        required={isEditing ? false : true}
                    />
                </div>
                <div className="w-full md:w-1/2 md:ml-6 flex flex-col justify-between">
                    <div className="flex flex-col space-y-4">
                        <label>
                            <span className="label-form">Name</span>
                            <input
                                type="text"
                                name="name"
                                value={value.name}
                                onChange={handleChange}
                                maxLength={64}
                                autoComplete="false"
                                className="text-input"
                                required
                            />
                            <span className="small-text inline-block w-full text-right text-neutral-500">
                                {value.name.length}/64
                            </span>
                        </label>
                        <label>
                            <span className="label-form">Expiring Date</span>
                            <input
                                type="date"
                                name="expired_date"
                                value={value.expired_date}
                                onChange={handleChange}
                                autoComplete="false"
                                className="text-input"
                                required
                            />
                        </label>
                        <label>
                            <span className="label-form">Description</span>
                            <textarea
                                name="description"
                                value={value.description}
                                onChange={handleChange}
                                rows={5}
                                autoComplete="false"
                                className="text-input"
                                required
                            />
                        </label>
                    </div>
                    <div className="w-full flex gap-4 mt-8">
                        <button type="submit" className={`btn-primary w-full ${isLoading && 'cursor-not-allowed'}`}>
                            {isLoading
                                ? <span>
                                    <LoadingIcon className="fill-white inline mr-4 animate-spin" />
                                    Loading...
                                </span>
                                : <span>SUBMIT</span>
                            }

                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};


export default ProductEdit