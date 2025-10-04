import React from 'react';
import { stageConfig, stageOrder } from '../utils/stageConfig';

const PipelineView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stageOrder.map((stage, index) => {
        const stageInfo = stageConfig[stage];
        return (
          <div
            key={stage}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-lg ${stageInfo.bgColor}`}>
                <stageInfo.icon className={`w-6 h-6 ${stageInfo.textColor}`} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{stageInfo.label}</h3>
                <p className="text-sm text-gray-600">Stage {index + 1}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{stageInfo.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PipelineView;