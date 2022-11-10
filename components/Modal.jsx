const Modal = ({ closeModal, children }) => {
    return (
        <div onClick={closeModal} className="bg-black bg-opacity-30 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center">
            <section onClick={e => e.stopPropagation()} className="bg-white container lg:max-w-screen-lg h-fit max-h-[calc(100vh-100px)] shadow-md p-6 sm:p-8 rounded-3xl m-8 overflow-auto no-scrollbar">
                {children}
            </section>
        </div>
    )
}

export default Modal