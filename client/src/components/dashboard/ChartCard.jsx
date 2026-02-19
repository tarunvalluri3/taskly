import { memo } from "react";
const ChartCard = ({ icon: Icon, title, subtitle, children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-3">

      <header className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-700" />}
          <h3 className="text-sm font-semibold text-black">
            {title}
          </h3>
        </div>

        {subtitle && (
          <p className="text-xs text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        )}
      </header>

      <div className="pt-2">
        {children}
      </div>

    </div>
  );
};

export default memo(ChartCard);
