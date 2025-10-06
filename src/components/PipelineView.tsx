import React from 'react';
import { stageConfig, stageOrder } from '../utils/stageConfig';
import { TenderStage } from '../types/tender';
import { Trophy, XCircle } from 'lucide-react';
import { useGetTendersQuery } from '../services/tenderApi';

const PipelineView: React.FC = () => {
  const { data: tenders = [], isLoading } = useGetTendersQuery();

  const pipelineStageOrder = stageOrder.filter(
    stage => stage !== 'canceled' && stage !== 'won' && stage !== 'lost'
  );

  const stageCounts = tenders.reduce((acc, tender) => {
    if (!tender.isArchived) { // Only count non-archived tenders
      acc[tender.stage] = (acc[tender.stage] || 0) + 1;
    }
    return acc;
  }, {} as Record<TenderStage, number>);

  const wonCount = tenders.filter(t => t.stage === 'won' && !t.isArchived).length;
  const lostCount = tenders.filter(t => t.stage === 'lost' && !t.isArchived).length;
  const canceledCount = tenders.filter(t => t.stage === 'canceled' && !t.isArchived).length;

  if (isLoading) {
    return <div>Loading pipeline...</div>;
  }

  return (
    <div className="flex overflow-x-auto space-x-6 pb-4">
      {pipelineStageOrder.map((stage, index) => {
        const stageInfo = stageConfig[stage as TenderStage];
        const count = stageCounts[stage as TenderStage] || 0;
        return (
          <div
            key={stage}
            className={`flex-none w-48 bg-white rounded-xl p-6 shadow-sm border-l-4 ${stageInfo.color} hover:shadow-md transition-shadow duration-200`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className={`px-3 py-1 rounded-full ${stageInfo.bgColor}`}>
                <p className={`text-3xl font-bold ${stageInfo.textColor}`}>{count}</p>
              </div>
              <stageInfo.icon className={`w-6 h-6 ${stageInfo.textColor}`} />
            </div>
            <div>
              <h3 className="text-xl mb-2 font-semibold text-gray-900">{stageInfo.label}</h3>
            </div>
            <p className="text-sm text-gray-500">{stageInfo.description}</p>
          </div>
        );
      })}

      {/* Won / Lost / Canceled Card */}
      <div
        className={`flex-none w-48 bg-white rounded-xl p-6 shadow-sm border-l-4 border-gray-300 hover:shadow-md transition-shadow duration-200`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="px-3 py-1 rounded-full bg-gray-100">
            <p className="text-3xl font-bold text-gray-600">{wonCount + lostCount + canceledCount}</p>
          </div>
          <div className="flex gap-2">
            <Trophy className="w-6 h-6 text-green-600" />
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <h3 className="text-xl mb-2 font-semibold text-gray-900">Won/Lost</h3>
        <p className="text-sm text-gray-500">
          Won: {wonCount}, Lost: {lostCount}
        </p>
      </div>
    </div>
  );
};

export default PipelineView;
