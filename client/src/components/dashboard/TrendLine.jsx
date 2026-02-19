import { memo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const TrendLine = ({ data }) => {
  if (!data.length) return null;

  const last = data[data.length - 1];
  const insight =
    last.completed > last.missed
      ? "Recent completions exceed misses"
      : "Misses are catching up — review workload";

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3">

      <div>
        <h3 className="text-sm font-semibold text-black">7-Day Activity Trend</h3>
        <p className="text-xs text-gray-600">Daily created, completed, and missed tasks</p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="created" stroke="#111827" strokeWidth={2} />
            <Line type="monotone" dataKey="completed" stroke="#16a34a" strokeWidth={2} />
            <Line type="monotone" dataKey="missed" stroke="#ca8a04" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-500">X = day • Y = task count</p>

      <p className="text-xs font-medium text-black">Insight: {insight}</p>

    </div>
  );
};

export default memo(TrendLine);
