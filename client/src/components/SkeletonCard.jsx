const SkeletonCard = () => {
  return (
    <div className="p-4 space-y-3 bg-white border border-gray-200 rounded-xl shadow-sm animate-pulse">

      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="w-40 h-4 bg-gray-200 rounded" />
      </div>

      <div className="w-full h-3 bg-gray-200 rounded" />
      <div className="w-3/4 h-3 bg-gray-200 rounded" />

      <div className="space-y-2 pt-2">
        <div className="w-28 h-3 bg-gray-200 rounded" />
        <div className="w-24 h-3 bg-gray-200 rounded" />
      </div>

      <div className="flex gap-2 pt-3">
        <div className="w-20 h-7 bg-gray-200 rounded-md" />
        <div className="w-20 h-7 bg-gray-200 rounded-md" />
        <div className="w-16 h-7 bg-gray-200 rounded-md" />
      </div>

    </div>
  );
};

export default SkeletonCard;
