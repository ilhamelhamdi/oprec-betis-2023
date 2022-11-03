import Image from "next/image"
import { useState } from "react";
import { useSWRConfig } from "swr"
import { del } from "../../utils/fetcher"
import Toast from "../../utils/toast"
import LoadingIcon from "../../public/images/Icons/loading.svg";


const ProductDetail = ({ data, setToEdit, closeModal }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { mutate } = useSWRConfig()

    const handleEdit = (e) => {
        e.preventDefault()
        setToEdit()
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        if (isLoading) return

        try {
            setIsLoading(true)
            const response = await del(`/roti/${data.id}`)
            if (!response.ok) throw Exception()
            Toast.success('Post was successfully deleted')
        } catch (e) {
            Toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
            mutate('/roti')
            closeModal()
        }
    }

    return (
        <div className="flex flex-col">
            <h2 className="text-primary-700 text-center h2">Detail Roti</h2>
            <div className="flex flex-col md:flex-row mt-4 h-full">
                <div className="w-full md:w-1/2">
                    <div className="w-full max-w-[400px] aspect-square relative rounded-3xl overflow-hidden flex justify-center items-center">
                        <Image
                            src={data.image}
                            alt={`Image of ${data.name}`}
                            fill={true}
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2 md:ml-6 flex flex-col justify-between">
                    <div className="flex flex-col space-y-4">
                        <h3 className="h3 text-center font-bold">{data.name}</h3>
                        <p className="text-right text-primary-500">
                            until {data.expired_date}
                        </p>
                        <p className="body text-justify">{data.description}</p>
                    </div>
                    <div className="w-full flex gap-4 mt-8">
                        <button onClick={handleEdit} className="btn-primary w-full">EDIT</button>
                        <button onClick={handleDelete} className={`btn-secondary w-full ${isLoading && 'cursor-not-allowed'}`}>
                            {isLoading
                                ? <span>
                                    <LoadingIcon className="fill-primary-700 inline mr-4 animate-spin" />
                                    Loading...
                                </span>
                                : <span>DELETE</span>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail