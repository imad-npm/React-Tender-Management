import React from 'react';
import { Tender } from '../types/tender';
import { stageConfig, stageOrder } from '../utils/stageConfig';

interface PipelineViewProps {
  tenders: Tender[];
}

const PipelineView: React.FC<PipelineViewProps> = ({ tenders }) => {
  const tendersByStage = tenders.reduce((acc, tender) => {
    if (!acc[tender.stage]) {
      acc[tender.stage] = [];
    }
    acc[tender.stage].push(tender);
    return acc;
  }, {} as Record<Tender['stage'], Tender[]>);

  return (
    <div className="flex space-x-4 overflow-x-auto p-4">
      {stageOrder.map((stage) => {
        const stageInfo = stageConfig[stage];
        const tendersInStage = tendersByStage[stage] || [];

        return (
          <div key={stage} className="flex-shrink-0 w-80 bg-gray-100 rounded-lg">
            <div className={`flex items-center justify-between p-3 rounded-t-lg bg-white border-b-4 ${stageInfo.color}`}>
              <div className="flex items-center">
                <stageInfo.icon className={`w-5 h-5 mr-2 ${stageInfo.textColor}`} />
                <h2 className={`font-semibold ${stageInfo.textColor}`}>{stageInfo.label}</h2>
              </div>
              <span className="text-sm font-bold text-gray-500 bg-gray-200 rounded-full px-2 py-1">
                {tendersInStage.length}
              </span>
            </div>
            <div className="p-2 space-y-2">
              {tendersInStage.map((tender) => (
                <div key={tender.id} className="bg-white p-3 rounded-md shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-gray-800">{tender.tenderName}</h3>
                  <p className="text-sm text-gray-500">{tender.agencyName}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-bold ${tender.closingDays <= 7 ? 'text-red-600' : 'text-orange-500'}`}>
                      {tender.closingDays} days left
                    </span>
                    <img
                      src={tender.responsibleMember.avatar}
                      alt={tender.responsibleMember.name}
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PipelineView;
