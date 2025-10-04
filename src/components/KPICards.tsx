import React from 'react';
import { TrendingUp, FileText, Trophy, DollarSign, Target, Clock } from 'lucide-react';
import { useTenderStore } from '../store/tenderStore';

const KPICards: React.FC = () => {
  const { kpiData } = useTenderStore();
  const data = kpiData; // for consistency with the old code

  const kpiCards = [
    {
      title: 'Total Tenders',
      value: data.totalTenders,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Active Tenders',
      value: data.activeTenders,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+8%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Won Tenders',
      value: data.wonTenders,
      icon: Trophy,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+15%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Total Value',
      value: `${(data.totalValue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+22%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Win Rate',
      value: `${data.winRate}%`,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+3.2%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Avg. Closing Days',
      value: data.avgClosingDays,
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      change: '-2 days',
      changeColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
      {kpiCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <span className={`text-sm font-medium ${card.changeColor} flex items-center gap-1`}>
                <TrendingUp className="w-3 h-3" />
                {card.change}
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
              <p className="text-sm text-gray-600 font-medium">{card.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;
