const StatSkeleton = () => (
  <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm animate-pulse space-y-3">
    <div className="w-24 h-3 bg-gray-200 rounded" />
    <div className="w-12 h-6 bg-gray-200 rounded" />
  </div>
);

const ChartSkeleton = () => (
  <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm animate-pulse space-y-4">
    <div className="w-40 h-4 bg-gray-200 rounded" />
    <div className="w-full h-40 bg-gray-200 rounded-lg" />
  </div>
);

const InsightSkeleton = () => (
  <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm animate-pulse space-y-2">
    <div className="w-48 h-4 bg-gray-200 rounded" />
    <div className="w-full h-3 bg-gray-200 rounded" />
    <div className="w-5/6 h-3 bg-gray-200 rounded" />
  </div>
);

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>

      {/* Charts */}
      <ChartSkeleton />
      <ChartSkeleton />

      {/* Insights */}
      <InsightSkeleton />

    </div>
  );
};

export default DashboardSkeleton;
