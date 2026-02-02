"use client";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, change, changeType = "neutral", icon }: StatsCardProps) {
  const changeColors = {
    positive: "text-green-600 bg-green-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {change && (
            <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${changeColors[changeType]}`}>
              {change}
            </span>
          )}
        </div>
        <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
          {icon}
        </div>
      </div>
    </div>
  );
}
