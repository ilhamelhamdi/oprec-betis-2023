import { useState } from "react";
import Modal from "../Modal";
import ProductDetail from "./ProductDetail";
import ProductEdit from "./ProductEdit";


const ProductModal = ({ closeModal, data }) => {
    const [isEditing, setIsEditing] = useState(data ? false : true);
    return (
        <Modal closeModal={closeModal}>
            {isEditing
                ? <ProductEdit
                    data={data}
                    closeModal={closeModal}
                />
                : <ProductDetail
                    data={data}
                    setToEdit={() => setIsEditing(true)}
                    closeModal={closeModal}
                />
            }
        </Modal>
    );
};

export default ProductModal;
