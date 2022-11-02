import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";
import { post } from "../api/fetcher"
import imagePlaceholder from '../public/images/placeholder.png'

const ProductDetail = ({ data, setToEdit }) => {
    const handleEdit = (e) => {
        e.preventDefault()
        setToEdit()
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
                        <button className="btn-secondary w-full">DELETE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProductEdit = ({ data }) => {
    const initialValue = {
        name: "",
        description: "",
        expired_date: "",
        image: imagePlaceholder
    }
    const [value, setValue] = useState(data ? data : initialValue);
    const [rawImage, setRawImage] = useState();

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
        data = {
            ...value,
            image: rawImage,
        }

        console.log(data);
        const formData = new FormData()
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value)
        }

        // for (const [key, value] of formData) {
        //     console.log(key);
        //     console.log(value);
        // }
        try {
            const response = await post('/roti/', formData)
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    const handleImageChange = (e) => {
        setRawImage(e.target.files[0])
        console.log(e.target.files);
        handleChange({
            target: {
                name: "image",
                value: URL.createObjectURL(e.target.files[0])
            }
        })
    }

    return (
        <div className="flex flex-col">
            <h2 className="text-primary-700 text-center h2">Edit Roti</h2>
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
                                className="text-input"
                                required
                            />
                        </label>
                        <label>
                            <span className="label-form">Expiring Date</span>
                            <input
                                type="date"
                                name="expired_date"
                                value={value.expired_date}
                                onChange={handleChange}
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
                                className="text-input"
                                required
                            />
                        </label>
                    </div>
                    <div className="w-full flex gap-4 mt-8">
                        <button type="submit" className="btn-primary w-full">
                            SUBMIT
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

const ProductModal = ({ closeModal, data }) => {
    const [isEditing, setIsEditing] = useState(data ? false : true);
    return (
        <Modal closeModal={closeModal}>
            {isEditing
                ? <ProductEdit data={data} />
                : <ProductDetail data={data} setToEdit={() => setIsEditing(true)} />
            }
        </Modal>
    );
};

export default ProductModal;
