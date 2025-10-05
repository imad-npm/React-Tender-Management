import React from 'react';
import { stageConfig, stageOrder } from '../utils/stageConfig';
import { TenderStage } from '../types/tender';
import { Trophy, XCircle } from 'lucide-react';

const PipelineView: React.FC = () => {
  const pipelineStageOrder = stageOrder.filter(
    stage => stage !== 'canceled' && stage !== 'won' && stage !== 'lost'
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {pipelineStageOrder.map((stage, index) => {
        const stageInfo = stageConfig[stage as TenderStage];
        return (
          <div
            key={stage}
            className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${stageInfo.color} hover:shadow-md transition-shadow duration-200`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className={`px-3 py-1 rounded-full ${stageInfo.bgColor}`}>
                <p className={`text-3xl font-bold ${stageInfo.textColor}`}>{index + 1}</p>
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

      {/* Won / Lost Card */}
      <div
        className={`bg-white rounded-xl p-6 shadow-sm border-l-4 border-gray-300 hover:shadow-md transition-shadow duration-200`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="px-3 py-1 rounded-full bg-gray-100">
            <p className="text-3xl font-bold text-gray-600">{pipelineStageOrder.length + 1}</p>
          </div>
          <div className="flex gap-2">
            <Trophy className="w-6 h-6 text-green-600" />
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <h3 className="text-xl mb-2 font-semibold text-gray-900">Won / Lost</h3>
        <p className="text-sm text-gray-500">Tenders that have been won or lost.</p>
      </div>
    </div>
  );
};

export default PipelineView;
