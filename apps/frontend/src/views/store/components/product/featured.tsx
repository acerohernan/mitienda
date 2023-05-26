import Image from "next/image";

interface Props {}

const PorductCardFeatured: React.FC<Props> = ({}) => {
  return (
    <div className="relative border rounded-xl h-[300px]">
      <Image
        className="w-full h-full object-cover rounded-xl"
        alt="product"
        src="/placeholder-image.jpg"
        width={800}
        height={800}
      />

      <div className="top-0 absolute bg-purple-600 text-white px-4 rounded-xl m-2 font-light text-sm">
        <span>Informatica</span>
      </div>

      <div className="absolute bottom-3 rounded-lg bg-white/70 border-b-4 border-purple-600 right-0 left-0 mx-4 p-2">
        <span className="text-black">Start Wars - Cortina luces LED</span>
        <span className="text-black font-medium text-lg block">S/ 80.00</span>
      </div>
    </div>
  );
};

export default PorductCardFeatured;
