import { PlusSquare } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyState = ({
  icon: Icon,
  title,
  subtitle,
  ctaLabel,
  ctaTo
}) => {
  return (
    <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm text-center flex flex-col items-center gap-4">

      {Icon && (
        <div className="p-3 bg-gray-100 rounded-full">
          <Icon size={28} className="text-gray-600" />
        </div>
      )}

      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-black">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-600">
            {subtitle}
          </p>
        )}
      </div>

      {ctaTo && (
        <Link
          to={ctaTo}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-black rounded-lg"
        >
          <PlusSquare size={14} />
          {ctaLabel}
        </Link>
      )}

    </div>
  );
};

export default EmptyState;
