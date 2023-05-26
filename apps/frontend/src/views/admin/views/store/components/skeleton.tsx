const AdminStoreSkeleton = () => {
  return (
    <div className="grid gap-4 mt-4 lg:mt-14">
      <div className="w-full h-[550px] lg:h-[370px] card flex items-center justify-center">
        <div className="dot-pulse" />
      </div>
      <div className="grid xl:grid-cols-[2fr_1fr] gap-4">
        <div className="w-full h-[660px] card flex items-center justify-center lg:h-[370px]">
          <div className="dot-pulse" />
        </div>
        <div className="w-full h-[234px] card flex items-center justify-center">
          <div className="dot-pulse" />
        </div>
      </div>
    </div>
  );
};

export default AdminStoreSkeleton;
