import { memo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const PriorityBar = ({ data }) => {
  const top = [...data].sort((a, b) => b.value - a.value)[0];
  const insight = top && top.value > 0 ? `${top.name} priority tasks dominate` : "";

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3">

      <div>
        <h3 className="text-sm font-semibold text-black">Priority Distribution</h3>
        <p className="text-xs text-gray-600">Breakdown of tasks by priority level</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-500">X = priority • Y = number of tasks</p>

      {insight && (
        <p className="text-xs font-medium text-black">Insight: {insight}</p>
      )}

    </div>
  );
};

export default memo(PriorityBar);
