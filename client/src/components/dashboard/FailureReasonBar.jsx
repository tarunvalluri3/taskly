import { memo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const FailureReasonBar = ({ data }) => {
  if (!data.length) return null;

  const top = data[0];
  const insight = top ? `Top blocker: ${top.name}` : "";

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3">

      <div>
        <h3 className="text-sm font-semibold text-black">Missed Task Reasons</h3>
        <p className="text-xs text-gray-600">Why tasks were not completed</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-500">Bars show frequency of each reason</p>

      {insight && (
        <p className="text-xs font-medium text-black">Insight: {insight}</p>
      )}

    </div>
  );
};

export default memo(FailureReasonBar);
