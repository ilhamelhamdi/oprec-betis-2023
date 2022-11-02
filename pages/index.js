import { useEffect, useState } from "react"
import useSWR from "swr"
import { get } from "../api/fetcher"
import Card from "../components/Card"
import ProductModal from "../components/ProductModal"


export default function Home() {
  const { data, error } = useSWR('/roti', get)
  const [displayModal, setDisplayModal] = useState(false)
  const [modalData, setModalData] = useState()

  const onClickCard = (data) => {
    setDisplayModal(true)
    setModalData(data)
  }

  const closeModal = () => {
    setDisplayModal(false)
    setModalData()
  }

  useEffect(() => {
    console.log(data);
  }, [data, error])

  return (
    <>
      <nav className="fixed top-0 w-full bg-white z-10 shadow-sm flex justify-center py-[15px] px-[35px] align-middle space-x-4">
        <div className="w-[30px] h-[30px] rounded-full gradient" />
        <h1 className="font-bold text-2xl">Hamdi&apos;s Bakery</h1>
      </nav>
      <section className="container mx-auto mt-20 lg:max-w-screen-lg">
        <h1 className="h1 text-center">
          All <span className="gradient text-transparent bg-clip-text">Breads</span>
        </h1>
        <div className="body flex justify-between">
          <span className="body">Total items: {data ? data.data.length : 0}</span>
          <span onClick={() => setDisplayModal(true)} className="link cursor-pointer text-primary-500">+ ADD NEW BREAD</span>
        </div>
        <div>
        </div>
        <div className="flex justify-center mt-4 flex-wrap gap-4">
          {data && data.data.map((item, index) => (
            <Card key={index} data={item} onClick={onClickCard} />
          ))}
        </div>
      </section>
      {displayModal && <ProductModal closeModal={closeModal} data={modalData} />}
    </>
  )
}
