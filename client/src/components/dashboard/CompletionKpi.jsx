import { memo } from "react";
const CompletionKpi = ({ rate, completed, missed }) => {
  const color = rate >= 75 ? "bg-green-600" : rate >= 40 ? "bg-yellow-500" : "bg-red-600";

  const insight =
    rate >= 75 ? "Strong completion performance" :
    rate >= 40 ? "Moderate completion performance" :
    "Completion performance needs attention";

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3">

      <div>
        <h3 className="text-sm font-semibold text-black">Completion Performance</h3>
        <p className="text-xs text-gray-600">Finished vs missed task ratio</p>
      </div>

      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold text-black">{rate}%</span>
        <span className="text-xs text-gray-600 mb-1">completion rate</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${rate}%` }} />
      </div>

      <div className="flex justify-between text-xs text-gray-600">
        <span>Completed: {completed}</span>
        <span>Missed: {missed}</span>
      </div>

      <p className="text-xs font-medium text-black">Insight: {insight}</p>

    </div>
  );
};

export default memo(CompletionKpi);
