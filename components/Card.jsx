import Image from "next/image"


const Card = ({ onClick, data }) => (
  <div onClick={() => onClick(data)} className="w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-md mb-8 cursor-pointer origin-center transition hover:scale-105">
    <div className="h-2/3 overflow-hidden">
      <div className="w-full max-w-[400px] aspect-square relative">
        <Image
          src={data.image}
          alt={`Picture of ${data.name}`}
          fill={true}
          className="object-cover"
        />
      </div>
    </div>
    <div className="h-1/3 p-4 flex flex-col justify-between">
      <h2 className="subtitle">{data.name}</h2>
      <p className="line-clamp-2 body">{data.description}</p>
      <p className="text-right text-primary-500">until {data.expired_date}</p>
    </div>
  </div>
)

export default Card