const ProfilePageSkeleton = () => {
  return (
    <div className="w-full grid gap-4 mt-4 lg:mt-14">
      <div className="bg-white card w-full h-[330px] flex items-center justify-center">
        <div className="dot-pulse" />
      </div>
      <div className="bg-white card w-full h-[280px] flex items-center justify-center">
        <div className="dot-pulse" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="grid gap-4">
          <div className="card flex items-center justify-center h-[188px]">
            <div className="dot-pulse" />
          </div>
          <div className="card flex items-center justify-center h-[106px]">
            <div className="dot-pulse" />
          </div>
        </div>
        <div className="card flex items-center justify-center h-[226px] lg:h-full">
          <div className="dot-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;
