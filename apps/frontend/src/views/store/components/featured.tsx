import PorductCardFeatured from "./product/featured";

const FeaturedSection = () => {
  return (
    <div className=" bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto p-6 pt-0">
        <h2 className="text-xl font-medium">Destacados</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PorductCardFeatured />
          <PorductCardFeatured />
          <PorductCardFeatured />
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
