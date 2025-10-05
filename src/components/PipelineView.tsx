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
            className={`bg-white rounded-xl  p-6 shadow-sm  border-l-4 ${stageInfo.color} hover:shadow-md transition-shadow duration-200`}
          >
            <div className="flex items-center mb-4">
              <div className={`px-3 py-1 rounded-full ${stageInfo.bgColor}`}>
                 <p className={`text-2xl font-bold ${stageInfo.textColor}`}> {index + 1}</p>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{stageInfo.label}</h3>
                  <stageInfo.icon className={`w-6 h-6 ${stageInfo.textColor}`} />
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