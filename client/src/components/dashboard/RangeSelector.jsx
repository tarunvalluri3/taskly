import { CalendarDays } from "lucide-react";

const options = [
  { label: "7D", value: 7 },
  { label: "14D", value: 14 },
  { label: "30D", value: 30 },
];

const RangeSelector = ({ value, onChange }) => {
  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">

      <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
        <CalendarDays size={14} />
        Range
      </div>

      <div className="flex gap-2">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 text-xs rounded-md border transition ${
              value === opt.value
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

    </div>
  );
};

export default RangeSelector;
