import Image from "next/image"


const CardSkeleton = () => (
  <div className="w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-md mb-8 origin-center animate-pulse">
    <div className="h-2/3 overflow-hidden">
      <div className="w-full max-w-[400px] aspect-square relative bg-gray-300" />
    </div>
    <div className="h-1/3 p-4 flex flex-col justify-between items-end">
      <div className="h-6 w-full bg-gray-300 rounded-full" />
      <div className="h-4 w-full bg-gray-300 rounded-full" />
      <div className="h-4 w-full bg-gray-300 rounded-full" />
      <div className="h-4 w-1/2 bg-gray-300 rounded-full" />
    </div>
  </div>
)

export default CardSkeleton