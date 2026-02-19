import { AlertTriangle, RefreshCw } from "lucide-react";

const DashboardErrorState = ({ onRetry }) => {
  return (
    <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm text-center flex flex-col items-center gap-4">

      <div className="p-3 bg-gray-100 rounded-full">
        <AlertTriangle size={28} className="text-red-600" />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-black">
          Failed to load dashboard
        </h3>
        <p className="text-xs text-gray-600">
          We couldn’t fetch your analytics data
        </p>
      </div>

      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-black rounded-lg"
      >
        <RefreshCw size={14} />
        Retry
      </button>

    </div>
  );
};

export default DashboardErrorState;
