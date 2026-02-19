import { memo } from "react";
const KpiCard = ({ label, value }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <p className="text-xs font-medium tracking-wide text-gray-600 uppercase">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-black">
        {value}
      </p>
    </div>
  );
};

export default memo(KpiCard);
