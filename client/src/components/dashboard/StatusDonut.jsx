import { memo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#111827", "#16a34a", "#ca8a04", "#dc2626"];

const StatusDonut = ({ data, onSliceClick }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">

      <h3 className="text-sm font-semibold text-black mb-3">
        Task Distribution
      </h3>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              onClick={(entry) => onSliceClick?.(entry)}
              className="cursor-pointer"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Mobile Legend — clickable */}
      <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
        {data.map((item, i) => (
          <button
            key={i}
            onClick={() => onSliceClick?.(item)}
            className="flex items-center gap-2 text-left"
          >
            <span className="w-3 h-3 rounded-sm" style={{ background: COLORS[i] }} />
            <span className="text-gray-700">
              {item.name} ({item.value})
            </span>
          </button>
        ))}
      </div>

    </div>
  );
};

export default memo(StatusDonut);
